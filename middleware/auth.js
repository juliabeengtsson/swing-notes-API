const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(403).json({ error: 'A token is required for authentication' })
    }

    const token = authHeader.split(' ')[2]
    console.log('Authorization Header:', authHeader);
    console.log('Extracted Token:', token)

    try {
        const decoded = jwt.verify(token, 'secret_key')
        req.user = decoded
    } catch (err) {
        console.log('JWT Verification Error:', err)
        return res.status(401).json({ error: 'Invalid Token', details: err.message })
    }

    return next()
}

module.exports = verifyToken
