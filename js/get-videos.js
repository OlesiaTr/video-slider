import { refs } from './refs.js'

const accessToken = '72769dbdd8b9d5cfd5d22c7195426b0c'
const apiUrl = 'https://api.vimeo.com/videos/824804225'
const NUMBER_OF_VIDEOS = 8

export const getVideos = async () => {
  try {
    refs.swiperWrapper.innerHTML = ''

    for (let i = 0; i < NUMBER_OF_VIDEOS; i += 1) {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const video = data.embed.html

      // Add videos to main swiper
      const swiperSlideDiv = document.createElement('div')
      swiperSlideDiv.classList.add('swiper-slide')
      swiperSlideDiv.innerHTML = video
      refs.swiperWrapper.appendChild(swiperSlideDiv)

      // Add videos to modal swiper
      const modalSlideDiv = document.createElement('div')
      modalSlideDiv.classList.add('swiper-slide')
      modalSlideDiv.innerHTML = video
      refs.modalWrapper.appendChild(modalSlideDiv)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
