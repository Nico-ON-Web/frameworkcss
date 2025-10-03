const burger =document.querySelector("#burger")
const burgerIcon = document.querySelector(".burger i")
const nav = document.querySelector("header>nav")
burger.addEventListener("change",()=>{
    if(burger.checked){
        openNav()
    }else{
        closeNav()
    }
})

// <i class="ph ph-x"></i>
// <i class="ph ph-list"></i>

function openNav(){
    nav.classList.remove("closed-nav")
    burgerIcon.classList.remove("ph-list")
    burgerIcon.classList.add("ph-x")
}

function closeNav(){
    nav.classList.add("closed-nav")
    burgerIcon.classList.remove("ph-x")
    burgerIcon.classList.add("ph-list")
}

window.addEventListener("resize",()=>{
    nav.style.transition ='none'
    if(nav.classList.contains("closed-nav") == false){ 
        closeNav() 
    }
    const resetTimer = setTimeout(()=>{
        nav.style=""  
       clearTimeout(resetTimer) 
    },300)
    
})