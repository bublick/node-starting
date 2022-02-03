const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const {bgGreen} = require("chalk");

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title){
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}

async function removeNote(id){
    const notes = await getNotes()
    const filteredNotes = notes.filter( (note) => parseInt(note.id) !== parseInt(id))
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
}

async function editNote(id, title){
    const notes = await getNotes()
    const updatedNotes = notes.map( (note) => (note.id === id ? {...note, title} : note))
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}

async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
    const notes = await getNotes()

    console.log(chalk.bgGreen('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

module.exports = {
    addNote, getNotes, removeNote, editNote
}