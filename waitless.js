// Load scripts
const waitless = {
    scripts: [],
    functions: []
};
const interactionList = ['keydown', 'mousemove', 'wheel', 'touchmove', 'touchstart', 'touchend'];
let fallbackDelay = 10000;
let interactionDetected = false;
function loadScripts(scriptConfigs, globalCallback) {
    removeEventListeners();
    let loadedScripts = 0;
    const totalScripts = scriptConfigs.length;
    function scriptLoaded(callback) {
        loadedScripts++;
        if (loadedScripts === totalScripts && typeof globalCallback === 'function') {
            globalCallback();
        }
        if (typeof callback === 'function') {
            callback();
        }
    }
    function scriptError(src, callback) {
        const error = new Error(`Failed to load script: ${src}`);
        loadedScripts++;
        if (typeof callback === 'function') {
            callback(error);
        }
        if (loadedScripts === totalScripts && typeof globalCallback === 'function') {
            globalCallback(error);
        }
    }
    scriptConfigs.forEach(function(config) {
        const { src, location = 'body', callback } = config;
        const script = document.createElement('script');
        script.src = src;

        let loaded = false;

        script.onload = function() {
            if (!loaded) {
                loaded = true;
                scriptLoaded(callback);
            }
        };
        script.onerror = function() {
            if (!loaded) {
                loaded = true;
                scriptError(src, callback);
            }
        };
        if (location === 'head') {
            document.head.appendChild(script);
        } else if (location === 'body') {
            document.body.appendChild(script);
        }
    });
    const waitlessScripts = document.querySelectorAll('script[waitless]');
    waitlessScripts.forEach(script => {
        const src = script.getAttribute('waitless');
        script.src = src;
        script.removeAttribute('waitless');
    });
}
const scriptLoadTimeout = setTimeout(() => {
    if (!interactionDetected) {
        loadScripts(waitless.scripts, allScriptsReady);
    }
}, fallbackDelay);
function loadScriptsOnFirstInteraction() {
    if (!interactionDetected) {
        loadScripts(waitless.scripts, allScriptsReady);
    }
    interactionDetected = true;
    clearTimeout(scriptLoadTimeout);
}
function allScriptsReady() {
    console.log('All scripts are done loading');
    waitless.functions.forEach(func => {
        if (typeof func === 'function') {
            func();
        }
    });
}
function isLibraryAvailable(libraryName) {
    return typeof window[libraryName] !== 'undefined';
}
function removeEventListeners() {
    interactionList.forEach(event => {
        document.removeEventListener(event, loadScriptsOnFirstInteraction);
    });    
}
// Event listeners to trigger script loading
interactionList.forEach(event => {
    document.addEventListener(event, loadScriptsOnFirstInteraction);
});
console.log('waitless 1.0.1');
