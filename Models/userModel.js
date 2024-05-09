const db = require('../database/database');
const bcrypt = require('bcrypt');

class User {

    static async createUser(username, password) {

        if (!username || !password) {
            throw new Error('Username and password required')
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters')
        }
        if (!username.trim() || username.indexOf(' ') >= 0) {
            throw new Error('Username cannot contain spaces')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            type: 'user',
            username: username,
            password: hashedPassword
        }

        return new Promise((resolve, reject) => {
            db.insert(user, (err, newDoc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(newDoc)
                }
            })
        })
    }

    static async findUserByUsername(username) {

        return new Promise((resolve, reject) => {

            db.findOne({ type: 'user', username: username }, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
}

module.exports = User;