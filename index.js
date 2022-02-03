const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNote, getNotes, removeNote, editNote} = require('./notes.controller')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Task app',
        notes: await getNotes(),
        created: false,
        edited: false
    })
} )

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Task app',
        notes: await getNotes(),
        created: true,
        edited: false
    })
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Task app',
        notes: await getNotes(),
        created: false,
        edited: false
    })
})

app.put('/:id-:newTitle', async (req, res) => {
    await editNote(req.params.id, req.params.newTitle)
    res.render('index', {
        title: 'Task app',
        notes: await getNotes(),
        created: false,
        edited: true
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})