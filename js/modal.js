import { refs } from './refs.js'

let currentSlide = 0

const swiperModal = new Swiper('.modalSwiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

export const openModal = (ind) => {
  swiperModal.update()
  swiperModal.slideTo(ind)
  refs.backdrop.classList.toggle('is-hidden')

  // Playing the video through openModal
  const iframes = document.querySelectorAll('.modalSwiper iframe')
  const player = new Vimeo.Player(iframes[ind])
  player.play()

  currentSlide = ind
}

export const closeModal = (e) => {
  if (e.target === e.currentTarget) {
    refs.backdrop.classList.toggle('is-hidden')

    const iframes = document.querySelectorAll('.modalSwiper iframe')
    const players = Array.from(iframes).map(
      (iframe) => new Vimeo.Player(iframe)
    )
    players.forEach((player) => player.pause())
  }
}

// Playing the video based on pagination clicks
const pagination = document.querySelector('.swiper-pagination')

pagination.addEventListener('click', (e) => {
  const clickedIndex = Array.from(e.target.parentNode.children).indexOf(
    e.target
  )
  const iframes = document.querySelectorAll('.modalSwiper iframe')

  if (clickedIndex !== -1) {
    const player = new Vimeo.Player(iframes[currentSlide])

    if (clickedIndex !== currentSlide) {
      player.pause()

      const currentPlayer = new Vimeo.Player(iframes[clickedIndex])
      currentPlayer.play()

      currentSlide = clickedIndex
    }
  }
})
