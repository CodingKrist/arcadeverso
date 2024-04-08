document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página específica antes de ejecutar el código
  if (window.location.pathname === '/feed' || '/profile') {
      // Ejecutar el código solo si estamos en la página /feed
      var postDescriptions = document.querySelectorAll('.post-description');

      postDescriptions.forEach(function(description) {
          var maxLength = 100; // Número máximo de caracteres
          var text = description.textContent;
  
          // Truncar el texto si es mayor que la longitud máxima
          if (text.length > maxLength) {
              var truncatedText = text.substring(0, maxLength) + ' ...';
              description.textContent = truncatedText;
          }
      });
  }
});


// const deleteBtn = document.querySelectorAll('.fa-trash')
// const markDone = document.querySelectorAll('.not')
// const markUndone = document.querySelectorAll('.completed')

// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteTarea)
// })

// async function deleteTarea(){
//     const tareaId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('listatareas/deleteTarea', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'tareaIdFromJSFile': tareaId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// Array.from(markDone).forEach((el)=>{
//     el.addEventListener('click', doneTarea)
// })

// async function doneTarea(){
//     const tareaId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('listatareas/markDoneTarea', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'tareaIdFromJSFile': tareaId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// Array.from(markUndone).forEach((el)=>{
//     el.addEventListener('click', undoneTarea)
// })

// async function undoneTarea(){
//     const tareaId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('listatareas/markUndoneTarea', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'tareaIdFromJSFile': tareaId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }