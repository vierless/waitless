/*
    ########## Your setup goes here ##########
    
    These functions and scripts will be loaded site-wide on all pages

*/
waitless.scripts.push (
    { src: 'https://player.vimeo.com/api/player.js', location: 'body', callback: vimeoLoaded },
    { src: 'https://fast.wistia.com/assets/external/E-v1.js', location: 'body', callback: wistiaLoaded }
);
function wistiaLoaded() {
    console.log('Wistia is done loading');
}
function vimeoLoaded() {
    console.log('Vimeo is done loading');
}

console.log('global.js');