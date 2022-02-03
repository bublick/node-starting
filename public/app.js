document.addEventListener('click', async e => {
    if (e.target.dataset.type === 'remove'){
        const id = e.target.dataset.id
        removeTask(id).then(
            e.target.closest('li').remove()
        )
    }

    if (e.target.dataset.type === 'edit'){
        const id = e.target.dataset.id
        const oldTitle = e.target.closest('li').dataset.title
        const newTitle = prompt('Enter new title', oldTitle)

        if (newTitle){
            await editTask(id, newTitle)
            e.target.closest('li').querySelector('span').innerText = newTitle
            e.target.closest('li').dataset.title = newTitle
        }
    }
})

async function removeTask(id){
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function editTask(id, newTitle){
    await fetch(`/${id}-${newTitle}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}