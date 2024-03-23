/*
    ########## Your setup goes here ##########
    
    These functions and scripts will ONLY be loaded on Sub Page 1

*/
waitless.scripts.push(
    { src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', location: 'body', callback: swiperLoaded }
);

function swiperLoaded() {
    const swiper = new Swiper('.swiper', {
        speed: 400,
        slidesPerView: 3,
        spaceBetween: 32,
    });
    console.log('Swiper is done loading');
}

console.log('page-1.js');