export default function handler(req, res) {
    res.status(405).json({
        error: '405: Forbidden Spell',
        message: 'The magic you tried to cast (HTTP method) is not allowed in this realm. Please consult the ancient scrolls (API docs) for the correct incantation.'
    });
} 