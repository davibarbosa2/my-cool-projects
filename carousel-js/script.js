let slidePositon = 0
const slides = document.getElementsByClassName('carousel-item')
const totalSlides = slides.length

document
    .getElementById('carousel-button-next')
    .addEventListener('click', () => {
        nextSlide()
    })

document
    .getElementById('carousel-button-prev')
    .addEventListener('click', () => {
        prevSlide()
    })


function updateSlidePositon() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible')
    }
    slides[slidePositon].classList.add('carousel-item-visible')
}

function nextSlide() {
    if (slidePositon === totalSlides -1) {
        slidePositon = 0
    } else {
        slidePositon++
    }
    updateSlidePositon()
}

function prevSlide() {
    if (slidePositon === 0) {
        slidePositon = totalSlides - 1
    } else {
        slidePositon--
    }
    updateSlidePositon()
}