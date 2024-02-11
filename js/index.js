import { getVideos } from './get-videos.js'
import { refs } from './refs.js'
import { setupSwiper } from './setup-swiper.js'
import { closeModal, openModal } from './modal.js'

const init = async () => {
  refs.spinner.style.display = 'block'

  await getVideos()
  setupSwiper()

  refs.spinner.style.display = 'none'
  refs.mySwiper.style.display = 'block'

  const iframes = document.querySelectorAll('.mySwiper iframe')
  const players = Array.from(iframes).map((iframe) => new Vimeo.Player(iframe))

  players.forEach((player, ind) =>
    player.on('play', () => {
      player.pause()
      openModal(ind)
    })
  )
}

init()

refs.backdrop.addEventListener('click', closeModal)
