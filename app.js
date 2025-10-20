

const burger = document.querySelector("#burger")
const burgerIcon = document.querySelector(".burger i")
const nav = document.querySelector("header>nav")
burger.addEventListener("change", () => {
    if (burger.checked) {
        openNav()
    } else {
        closeNav()
    }
})

// <i class="ph ph-x"></i>
// <i class="ph ph-list"></i>

function openNav() {
    nav.classList.remove("closed-nav")
    burgerIcon.classList.remove("ph-list")
    burgerIcon.classList.add("ph-x")
}

function closeNav() {
    nav.classList.add("closed-nav")
    burgerIcon.classList.remove("ph-x")
    burgerIcon.classList.add("ph-list")
}

window.addEventListener("resize", () => {
    nav.style.transition = 'none'
    if (nav.classList.contains("closed-nav") == false) {
        closeNav()
    }
    const resetTimer = setTimeout(() => {
        nav.style = ""
        clearTimeout(resetTimer)
    }, 600)

})

// accordions
let currentAcc = null;
const accordions = document.querySelectorAll(".accordion")
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
        slidesContainer.style.transition = "transform 0.6s ease-in-out";
        slidesContainer.style.transform = `translateX(-${current * 100}%)`;



        // Si on vient d'atteindre le clone (donc après la vraie dernière)
        if (current === total - 1) {
            // désactiver la transition pour le repositionnement
            setTimeout(() => {

                slidesContainer.style.transition = "none";
                current = 0;
                slidesContainer.style.transform = `translateX(-${current * 100}%)`;
            }, 600)
            return 0
        }



        return current;
    }

    function prevTr(slidesContainer, current, total) {
        current--;
        slidesContainer.style.transition = "transform 0.6s ease-in-out";
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


        // si le slider est de type translation : on duplique la premiere diapo a la fin pour gere le defilement infini
        if (sliderType == "translation") {

            const firstslide = slides[0].cloneNode(true)
            firstslide.classList.remove("slide-visible")
            slidesContainer.appendChild(firstslide)
            slides = slider.querySelector(".slides").children

        }

        // au click
        nextBtn.addEventListener("click", () => {

            if (sliderType === "opacity") {
                current = nextOp(slides, current)
            } else {

                console.log(current, slides.length)
                current = nextTr(slidesContainer, current, slides.length)
            }
        })

        prevBtn.addEventListener('click', () => {
            if (sliderType === "opacity") {
                current = prevOp(slides, current)

            } else {

                current = prevTr(slidesContainer, current, slides.length)
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
                    current = nextTr(slidesContainer, current, slides.length);
                } else {
                    current = prevTr(slidesContainer, current, slides.length);
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

initSliders()


/**Toggle dark / light mode*/
const toggle = document.getElementById('dark-mode-toggle');

toggle.addEventListener('change', () => {
  if(toggle.checked) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
});