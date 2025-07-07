import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless"
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
    const sql = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
    return {
        adapter: NeonAdapter(sql),
        providers: [
            // Only include providers that have their environment variables configured
            ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
                Google({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    authorization: {
                        params: {
                            prompt: "consent",
                            access_type: "offline",
                            response_type: "code"
                        }
                    }
                })
            ] : []),
            ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
                GitHub({
                    clientId: process.env.GITHUB_ID,
                    clientSecret: process.env.GITHUB_SECRET,
                })
            ] : []),
            Credentials({
                name: "credentials",
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) return null;
                    if (!sql) return null;
                    try {
                        // For demo: just check if user exists by email (no password check)
                        const result = await sql.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
                        const user = result.rows[0];
                        if (user) {
                            return {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role || 'student',
                                image: user.image
                            };
                        }
                        return null;
                    } catch (e) {
                        console.error('Credentials authorize error:', e);
                        return null;
                    }
                }
            }),
        ],
        session: { strategy: "jwt" },
        secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
        debug: true, // Enable debug mode to see what's happening
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) {
                console.log('=== SIGNIN CALLBACK ===');
                console.log('User:', user);
                console.log('Account:', account);
                console.log('Profile:', profile);
                console.log('Email:', email);
                console.log('Credentials:', credentials);

                // Specific debugging for Google OAuth
                if (account?.provider === 'google') {
                    console.log('=== GOOGLE OAUTH DEBUG ===');
                    console.log('Account provider:', account.provider);
                    console.log('Account type:', account.type);
                    console.log('Account access_token exists:', !!account.access_token);
                    console.log('Account refresh_token exists:', !!account.refresh_token);
                    console.log('Profile email:', profile?.email);
                    console.log('Profile name:', profile?.name);
                }

                // Test database connection and schema
                if (typeof sql === 'function') {
                    try {
                        const result = await sql`SELECT 1 as test`;
                        console.log('Database connection test:', result);

                        // Check if auth tables exist
                        const tables = await sql`
                            SELECT table_name 
                            FROM information_schema.tables 
                            WHERE table_schema = 'public' 
                            AND table_name IN ('users', 'accounts', 'sessions', 'verification_tokens')
                        `;
                        console.log('Auth tables found:', tables.map(t => t.table_name));

                        if (tables.length === 0) {
                            console.log('No auth tables found - you may need to run the database migration');
                        }
                    } catch (error) {
                        console.error('Database connection/schema check failed:', error);
                    }
                } else {
                    console.warn('Neon SQL client is not initialized. Skipping DB check.');
                }

                return true;
            },
            async redirect({ url, baseUrl }) {
                console.log('=== REDIRECT CALLBACK ===');
                console.log('URL:', url);
                console.log('Base URL:', baseUrl);
                // Allows relative callback URLs
                if (url.startsWith("/")) return `${baseUrl}${url}`;
                // Allows callback URLs on the same origin
                else if (new URL(url).origin === baseUrl) return url;
                return baseUrl;
            },
            async session({ session, token }) {
                console.log('=== SESSION CALLBACK ===');
                console.log('Session:', session);
                console.log('Token:', token);
                if (token.sub) {
                    session.user.id = token.sub;
                }
                if (token.role) {
                    session.user.role = token.role;
                }
                return session;
            },
            async jwt({ token, user, trigger, session }) {
                console.log('=== JWT CALLBACK ===');
                console.log('Trigger:', trigger);
                console.log('User:', user);
                console.log('Token:', token);
                console.log('Session:', session);
                if (user) {
                    token.sub = user.id;
                    if (sql) {
                        try {
                            const dbUser = await sql.query('SELECT role FROM users WHERE id = $1', [user.id]);
                            if (dbUser.rows && dbUser.rows[0]) {
                                token.role = dbUser.rows[0].role || 'student';
                            }
                        } catch (error) {
                            console.error('Database error in JWT callback:', error);
                            token.role = user.role || 'student';
                        }
                    } else {
                        token.role = user.role || 'student';
                    }
                }

                // Handle role updates
                if (trigger === "update" && session?.role) {
                    token.role = session.role;
                }

                return token;
            },
        },
        pages: {
            signIn: '/auth/signin',
            error: '/auth/error',
        },
    }
})