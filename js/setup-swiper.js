export const setupSwiper = () => {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    centeredSlides: false,
    initialSlide: 0,
    breakpoints: {
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1199: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
}
