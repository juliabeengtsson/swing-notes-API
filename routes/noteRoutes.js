const express = require('express')
const router = express.Router()
const Note = require('../Models/noteModel');

router.get('/', async (req, res) => {
    try {
        const getNotes = await Note.getNotes(req.body)
        console.log(getNotes)
        res.status(200).json(getNotes)
    } catch(error) {
        res.status(500).json({message: 'Failed to get all notes'})
    }
})

router.post('/', async (req, res) => {
    try {
        const note = await Note.createNote(req.body) 
        res.status(201).json(note)
    } catch(error) {
        res.status(500).json({message: 'Failed to create note'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updateNote = await Note.updateNote(req.params.id, req.body);
        if(updateNote) {
            res.status(200).json(updateNote)
        } else {
            res.status(404).send({message: 'failed!'})
        }
    } catch(error) {
        res.status(500).json({message: 'Failed to update note'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deleteNote = await Note.deleteNote(req.params.id)
        if (deleteNote > 0) {
            res.status(200).json({ message: 'Note deleted successfully'})
        } else {
            res.status(404).json({ message: 'Note not found'})
        }

    } catch(error) {
        res.status(500).json({message: 'couldnt delete note'})
    }
})

module.exports = router