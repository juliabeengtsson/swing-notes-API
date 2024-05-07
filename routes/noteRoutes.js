const express = require('express')
const router = express.Router()
const Note = require('../Models/noteModel');

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



module.exports = router