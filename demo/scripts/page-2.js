/*
    ########## Your setup goes here ##########
    
    These functions and scripts will ONLY be loaded on Sub Page 2

    In this case we are loading GSAP and execute a custom function on first interaction

*/
waitless.scripts.push(
    { src: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', location: 'body', callback: gsapLoaded },
    { src: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', location: 'body', callback: gsapLoaded }
)

waitless.functions.push(function() {
    console.log('custom function after all scripts loaded on page 2');
});

function gsapLoaded() {
    if (isLibraryAvailable('gsap')) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to("[data-speed]", {
        y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
        ease: "none",
        scrollTrigger: {
            start: 0,
            end: "max",
            invalidateOnRefresh: true,
            scrub: 0
        }
        });
        console.log('GSAP loaded');
    }
}
console.log('page-2.js');