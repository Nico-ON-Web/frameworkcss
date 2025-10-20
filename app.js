

const burger = document.querySelector("#burger")
const burgerIcon = document.querySelector(".burger i")
const nav = document.querySelector("header>nav")
burger.addEventListener("change", () => {
    if (burger?.checked) {
        openNav()
    } else {
        closeNav()
    }
})

// <i class="ph ph-x"></i>
// <i class="ph ph-list"></i>

function openNav() {
    if(nav){
      nav.classList.remove("closed-nav")
    burgerIcon?.classList.remove("ph-list")
    burgerIcon?.classList.add("ph-x")
}  
    }
    

function closeNav() {
    nav?.classList.add("closed-nav")
    burgerIcon?.classList.remove("ph-x")
    burgerIcon?.classList.add("ph-list")
}

window.addEventListener("resize", () => {
    if(nav){
           nav.style.transition = 'none'
    if (nav.classList.contains("closed-nav") == false) {
        closeNav()
    }
    const resetTimer = setTimeout(() => {
        nav.style = ""
        clearTimeout(resetTimer)
    }, 600)
    }
 

})

// accordions
let currentAcc = null;
const accordions = document.querySelectorAll(".accordion")
if(accordions){
    accordions.forEach(acc => {
    const acctitle = acc.querySelector(".accordion-title")


    acctitle.addEventListener("click", () => {
        if (currentAcc == acc) {
            closeAcc(currentAcc)
            currentAcc = null
            return
        }
        closeAcc(currentAcc)
        if (acc.classList.contains("accordion-open") == false) {
            currentAcc = acc
            openAcc(acc)
        }
    })


})
}


function closeAcc(acc) {
    if (acc != null) {
        acc.classList.remove('accordion-open')

        const acccontent = acc.querySelector(".accordion-content")
        acccontent.style.height = 0 + "px"
    }

}

function openAcc(acc) {
    if (acc != null) {
        acc.classList.add('accordion-open')
        const acccontent = acc.querySelector(".accordion-content")
        const accdiv = acccontent.children[0]
        acccontent.style.height = accdiv.clientHeight + "px"
    }

}

/*

function initSliders() {

    function nextOp(slides, current) {

        slides[current].classList.remove("slide-visible")
        if (current == slides.length - 1) {
            current = 0
        } else {
            current++
        }

        slides[current].classList.add("slide-visible")
        return current
    }

    function prevOp(slides, current) {

        slides[current].classList.remove("slide-visible")
        if (current == 0) {
            current = slides.length - 1
        } else {
            current--
        }

        slides[current].classList.add("slide-visible")
        return current
    }

   

    function nextTr(slidesContainer, current, total) {
        current++;
     
        slidesContainer.style.transform = `translateX(-${current * 100}%)`;



        // Si on vient d'atteindre le clone (donc après la vraie dernière)
        if (current === total - 1) {
            // désactiver la transition pour le repositionnement
            setTimeout(() => {

                slidesContainer.style.transition = "none";
                current = 0;
                slidesContainer.style.transform = `translateX(-${current * 100}%)`;
                // OPTIONNEL : forcer le reflow ici aussi pour être sûr
                slidesContainer.offsetWidth;
                // Réactiver la transition
                slidesContainer.style.transition = "transform 0.6s ease-in-out";
                
                
            }, 600)
            return 0
        }



        return current;
    }

    function prevTr(slidesContainer, current, total) {
        current--;
      
        slidesContainer.style.transform = `translateX(-${current * 100}%)`;

        console.log("current dans prevTr:", current);

        // Si on va avant la première slide
        if (current <= -1) {

            slidesContainer.style.transition = "none";
            current = total - 1; // Retour à la dernière slide
            slidesContainer.style.transform = `translateX(-${current * 100}%)`;
            setTimeout(() => {
                slidesContainer.style.transition = "transform 0.6s ease-in-out";
                current = total - 2
                slidesContainer.style.transform = `translateX(-${current * 100}%)`;
            }, 20);
            return total - 2
        }

        return current;
    }


    const sliders = document.querySelectorAll(".slider")
    sliders.forEach(slider => {
        const slidesContainer = slider.querySelector(".slides");
        const sliderType = slidesContainer.getAttribute("data-type")
        let slides = slider.querySelector(".slides").children
        const nextBtn = slider.querySelector(".slider-right")
        const prevBtn = slider.querySelector(".slider-left")

        let current = 0
        let isAnimating = false;

        // si le slider est de type translation : on duplique la premiere diapo a la fin pour gere le defilement infini
        if (sliderType == "translation") {
             
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
            slidesContainer.prepend(lastClone);
            slidesContainer.appendChild(firstClone);
            // 🧩 Position initiale (sans transition)
            slidesContainer.style.transition = "none";
            slidesContainer.style.transform = `translateX(-100%)`;
            slidesContainer.getBoundingClientRect(); // force reflow

             // 🧭 Fonction pour déplacer
            function goToSlide(index) {
                if (isAnimating) return;
                isAnimating = true;

                slidesContainer.style.transition = "transform 0.6s ease-in-out";
                slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
                current = index;
            }
            // 🔄 Après transition, gérer les clones
            slidesContainer.addEventListener("transitionend", () => {
                isAnimating = false;

                if (current === -1) {
                slidesContainer.style.transition = "none";
                slidesContainer.style.transform = `translateX(-${slides.length * 100}%)`;
                current = slides.length - 1;
                } else if (current === slides.length) {
                slidesContainer.style.transition = "none";
                slidesContainer.style.transform = `translateX(-100%)`;
                current = 0;
                }
                slidesContainer.getBoundingClientRect(); // stabilise
            });
        }

        // au click
        nextBtn.addEventListener("click", () => {

            if (sliderType === "opacity") {
                current = nextOp(slides, current)
            } else if(sliderType=== "translation") {

              
                goToSlide(current + 1)
            }
        })

        prevBtn.addEventListener('click', () => {
            if (sliderType === "opacity") {
                current = prevOp(slides, current)

            } else if(sliderType=== "translation") {

              
                goToSlide(current - 1)
            }
        })



        // swipe / drag
        
        function handleSwipe(element, callback) {
            
            let startX = 0;
            element.addEventListener('touchstart', e => startX = e.touches[0].clientX);
            element.addEventListener('mousedown', e => startX = e.clientX);

            element.addEventListener('touchend', e => {
                const endX = e.changedTouches[0].clientX;
                checkSwipe(startX, endX);
            });

            element.addEventListener('mouseup', e => {
                const endX = e.clientX;
                checkSwipe(startX, endX);
            });

            function checkSwipe(start, end) {
                const diff = end - start;
                if (Math.abs(diff) > 50) { // 50px de seuil
                    callback(diff > 0 ? 'right' : 'left');
                }
            }
        }

        // Utilisation
        handleSwipe(slidesContainer, (direction) => {
            if (sliderType == "opacity") {
                if (direction === 'left') {
                    current = nextOp(slides, current);
                } else {
                    current = prevOp(slides, current);
                }
            } else {
                if (direction === 'left') {
                    goToSlide(current + 1);
                } else {
                    goToSlide(current - 1);
                }
            }

        });

        if (slider.querySelector(".slides").getAttribute("data-autoplay") == "true") {
            setInterval(() => {
                if (sliderType === "opacity") {
                    current = nextOp(slides, current);
                } else if (sliderType === "translation") {
                    current = nextTr(slidesContainer, current, slides.length)
                }
            }, 3000)
        }
    })

}

initSliders()*/


document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");
if(sliders){
    sliders.forEach(slider => {
    const slidesContainer = slider.querySelector(".slides");
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const nextBtn = slider.querySelector(".slider-right");
    const prevBtn = slider.querySelector(".slider-left");

    const type = slidesContainer.dataset.type || "translation";
    let current = 0;
    let isAnimating = false;

    // === MODE TRANSLATION ===
    if (type === "translation") {
      const firstClone = slides[0].cloneNode(true);
      const lastClone = slides[slides.length - 1].cloneNode(true);
      slidesContainer.prepend(lastClone);
      slidesContainer.appendChild(firstClone);

      slidesContainer.style.transition = "none";
      slidesContainer.style.transform = "translateX(-100%)";
      slidesContainer.getBoundingClientRect(); // stabilise
      slidesContainer.style.transition = "transform 0.6s ease-in-out";
    } 
    // === MODE OPACITY ===
    else {
      slides.forEach((s, i) => s.classList.toggle("slide-visible", i === 0));
    }

    // === Fonctions communes ===
    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      if (type === "translation") {
        slidesContainer.style.transition = "transform 0.6s ease-in-out";
        slidesContainer.style.transform = `translateX(-${(index + 1) * 100}%)`;
        current = index;
      } else {
        slides[current].classList.remove("slide-visible");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("slide-visible");
        setTimeout(() => (isAnimating = false), 600);
      }
    }

    // === Transitionend (pour translation seulement) ===
    if (type === "translation") {
      slidesContainer.addEventListener("transitionend", () => {
        isAnimating = false;

        if (current === -1) {
          slidesContainer.style.transition = "none";
          slidesContainer.style.transform = `translateX(-${slides.length * 100}%)`;
          current = slides.length - 1;
          slidesContainer.getBoundingClientRect();
          slidesContainer.style.transition = "transform 0.6s ease-in-out";
        } else if (current === slides.length) {
          slidesContainer.style.transition = "none";
          slidesContainer.style.transform = "translateX(-100%)";
          current = 0;
          slidesContainer.getBoundingClientRect();
          slidesContainer.style.transition = "transform 0.6s ease-in-out";
        }
      });
    }

    // === Boutons ===
    nextBtn.addEventListener("click", () => goToSlide(current + 1));
    prevBtn.addEventListener("click", () => goToSlide(current - 1));

    // === Swipe ===
    let startX = 0;
    const start = e => (startX = e.touches ? e.touches[0].clientX : e.clientX);
    const end = e => {
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) goToSlide(current + (diff < 0 ? 1 : -1));
    };

    slidesContainer.addEventListener("mousedown", start);
    slidesContainer.addEventListener("mouseup", end);
    slidesContainer.addEventListener("touchstart", start);
    slidesContainer.addEventListener("touchend", end);

    // === Autoplay (optionnel)
    const autoplay = slidesContainer.dataset.autoplay === "true";
    if (autoplay) setInterval(() => goToSlide(current + 1), 4000);
  });
}
  
});


/**Toggle dark / light mode*/
/*
const toggle = document.getElementById('dark-mode-toggle');
if(toggle){
    toggle.addEventListener('change', () => {
  if(toggle.checked) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
});
}



*/
 const toggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // 1. Charger le thème sauvegardé s'il existe
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.classList.add(savedTheme);
    toggle.checked = savedTheme === 'dark';
  } else {
    // Optionnel : détecter le thème système au premier chargement
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark');
      toggle.checked = true;
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }

  // 2. Écouter le changement du switch
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  });

/** Trigger sidebar */
const trigger = document.querySelector(".trigger-sidebar")
const sidebar = document.querySelector(".sidebar")
if(trigger){
    trigger.addEventListener("click",()=>{
        sidebar.classList.toggle("sidebar-masked")
    })
}