const deleteBtn = document.querySelectorAll('.fa-trash')
const markDone = document.querySelectorAll('.not')
const markUndone = document.querySelectorAll('.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTarea)
})

async function deleteTarea(){
    const tareaId = this.parentNode.dataset.id
    try{
        const response = await fetch('listatareas/deleteTarea', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'tareaIdFromJSFile': tareaId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

Array.from(markDone).forEach((el)=>{
    el.addEventListener('click', doneTarea)
})

async function doneTarea(){
    const tareaId = this.parentNode.dataset.id
    try{
        const response = await fetch('listatareas/markDoneTarea', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'tareaIdFromJSFile': tareaId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

Array.from(markUndone).forEach((el)=>{
    el.addEventListener('click', undoneTarea)
})

async function undoneTarea(){
    const tareaId = this.parentNode.dataset.id
    try{
        const response = await fetch('listatareas/markUndoneTarea', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'tareaIdFromJSFile': tareaId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}