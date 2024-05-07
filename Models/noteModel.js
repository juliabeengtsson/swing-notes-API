const db = require('../database/database');

class Note {

    static createNote(noteData) {
        return new Promise((resolve, reject) => {
            const note = {
                type: 'note',
                title: noteData.title,
                text: noteData.text,
                createdAt: new Date(),
                modifiedAt: new Date()
            }
            db.insert(note, (err, newDoc) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(newDoc)
                }
            })
        })
    }

    static updateNote(id, noteData) {
        return new Promise((resolve, reject) => {
            const updates = {
                title: noteData.title,
                text: noteData.text,
                modifiedAt: new Date() 
            }
            db.update({ _id: id }, { $set: updates }, {}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ _id: id, ...updates })
                }
            })
        })
    }

}

module.exports = Note