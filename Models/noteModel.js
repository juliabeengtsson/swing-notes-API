const db = require('../database/database');

class Note {

    static getNotes() {
        return new Promise((resolve, reject) => {
            db.find({ type: 'note' }, (err, docs) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    }

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

    static deleteNote(id) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, {multi: false}, (err, numRemoved) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(numRemoved);
                }
            })
        })
    }

}

module.exports = Note