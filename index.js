const yargs = require('yargs')
const pkg = require('./package.json')
const {addNote, removeNote, printNotes} = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
      title: {
          type: 'string',
          describe: 'Note title',
          demandOption: true
      }
    },
    handler({ title }){
        addNote(title)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by ID',
    builder: {
        id: {
            type: "number",
            describe: 'Note ID',
            demandOption: true
        }
    },
    handler({ id }){
        removeNote(id)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler(){
        printNotes()
    }
})

yargs.parse()