document.querySelector('#menu').addEventListener('click', ()=>{
    document.querySelector('nav ul').classList.toggle('show')
})

// For more then one 
document.querySelectorAll('.list_item_acc').forEach((s, i) =>{
      s.addEventListener('click', ()=>{
        document.querySelectorAll('.faq-logo-plus')[i].classList.toggle('show')
  })
    
// Jugar Code 
    
document.querySelectorAll('.list_item_acc').forEach((s, i) =>{
    s.addEventListener('click', ()=>{
      s.querySelector('.faq-logo-plus').classList.toggle('show')
})
  })
