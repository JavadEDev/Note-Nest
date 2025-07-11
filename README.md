# NoteNest

NoteNest is a fast, minimalist note-taking app designed for students and teachers. It features a clean UI, role-based access, and real-time note management. Built with Next.js, Neon/Postgres, and NextAuth for authentication, it supports Google and GitHub sign-in.

---

## Features

- **User Authentication**: Sign in with Google, GitHub using NextAuth.
- **Role-based Access**: Users can be students or teachers. Teachers have access to special admin features.
- **Send & Receive Notes**: Users can write notes to others, view notes sent to them, and see their own sent notes.
- **Teacher Feed**: Teachers can view, edit, and delete all notes in the system.
- **Profile Management**: Users can update their role and see statistics about their note activity.
- **Dark Mode**: Toggle between light and dark themes.
- **Animated UI**: Smooth transitions and feedback using Framer Motion and GSAP.
- **Toast Notifications**: Real-time feedback for actions (success, error, etc.).

---

## Project Structure & Sections

### 1. **Authentication**

- **`src/auth.js`**: Configures NextAuth with NeonAdapter, providers, and custom callbacks for session and JWT. Handles user roles and database checks.
- **`src/app/api/auth/[...nextauth]/route.js`**: API route for NextAuth, with debug logging for requests.
- **`src/app/auth/signin/page.js`**: Custom sign-in page with provider buttons and error handling.
- **`src/app/auth/error/page.js`**: Custom error page for authentication issues.

### 2. **API Endpoints**

- **`src/app/api/`**: Contains server actions for:
  - `fetchNotes.js`: Fetches notes for the current user.
  - `postNote.js`: Allows users to send notes.
  - `deleteNote.js`, `editNote.js`: Teacher-only endpoints for managing notes.
  - `teacherFetchNotes.js`: Fetches all notes for teachers.
  - `getUsers.js`, `getWhoAmI.js`: Fetches user data.
  - `updateUsername.js`, `updateUserRole.js`: Update user profile info.
  - `405.js`: Returns a 405 error for unsupported methods.

### 3. **Pages**

- **`src/app/page.js`**: Home page with navigation links.
- **`src/app/my/page.js`**: "My Notes" page showing notes sent and received by the user.
- **`src/app/write/page.js`**: Write a new note to another user.
- **`src/app/teacher/page.js`**: Teacher's admin feed for all notes (edit/delete enabled).
- **`src/app/profile/page.js`**: User profile page with stats and role update form.
- **`src/app/unauthorized/page.js` & `unauthorized.js`**: Shown when a user tries to access restricted areas.
- **`src/app/not-found.js`**: Custom 404 page with fantasy theme.

### 4. **Components**

- **`AnimatedContainer.js`**: Page transition animations.
- **`AnimatedNotesPage.js`**: Renders notes in a grid with animations.
- **`AuthButton.js`**: Shows sign-in/sign-out/profile dropdown in the navbar.
- **`AuthProvider.js`**: Wraps the app with NextAuth's SessionProvider.
- **`DarkModeToggle.js`**: Button to toggle dark mode.
- **`FantasyMotionCard.js`**: Animated card for fantasy-themed pages.
- **`GSAPStaggerFadeIn.js`**: GSAP-based staggered fade-in for lists.
- **`LoadingMyNotesSkeleton.js`**: Skeleton loader for notes page.
- **`MainPageList.js`**: Animated list of main navigation links.
- **`TeacherClientPage.js`**: Teacher's admin interface for notes.
- **`ToastProvider.js`**: Toast notification system using react-toastify.
- **`WriteNoteForm.js`**: Form to send a note to another user.
- **`whoAmIClientPage.js`**: Form to update username (demo/testing).
- **Profile Components**:
  - **`ProfileForm.js`**: Update user role.
  - **`UserStats.js`**: Show user note statistics.

### 5. **Styling**

- **`globals.css`**: Main CSS file, includes custom properties, dark mode, and responsive styles. Uses Tailwind for utility classes.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Neon/Postgres database (or compatible Postgres)
- Environment variables for NextAuth and database connection

### Installation

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd note-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with:

   - `DATABASE_URL` (Neon/Postgres connection string)
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (optional, for Google OAuth)
   - `GITHUB_ID` and `GITHUB_SECRET` (optional, for GitHub OAuth)
   - `NEXTAUTH_SECRET` (for session encryption)

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

- **Sign In**: Use Google, GitHub, or credentials.
- **Write Notes**: Go to "Write a Notes" to send a note to another user.
- **View Notes**: "My Notes" shows notes sent and received.
- **Teacher Feed**: If your role is teacher, access the "Secret Teacher Feed" for admin controls.
- **Profile**: Update your role and view stats.
- **Dark Mode**: Toggle with the sun/moon button in the navbar.

---

## Tech Stack

- **Next.js** (App Router)
- **NextAuth.js** (Authentication)
- **Neon/Postgres** (Database)
- **Framer Motion & GSAP** (Animations)
- **React Toastify** (Notifications)
- **Tailwind CSS** (Styling)

---

## License

MIT

---

## Credits

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Neon](https://neon.tech/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contact

For questions or support, open an issue or contact the maintainer.
