(function(global) {
    
    const waitless = {
        scripts: [],
        functions: [],
        isLibraryAvailable: isLibraryAvailable
    };

    // Lazy load iframes
    function loadIframes() {
        var iframeContainers = document.querySelectorAll('iframe[waitless]');
        if (iframeContainers.length > 0) {
            var observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0 // 100% = 1.0
            };
            var loadIframe = function(iframeEl) {
                var iframeSrc = iframeEl.getAttribute('waitless');
                try {
                    iframeEl.setAttribute('src', iframeSrc);
                    iframeEl.removeAttribute('waitless');
                } catch (error) {
                    return;
                }
            };
            var iframeObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        loadIframe(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            iframeContainers.forEach(function(container) {
                iframeObserver.observe(container);
            });
            waitless.triggerLoad = function() {
                iframeContainers.forEach(function(container) {
                    loadIframe(container);
                });
            };
        }
    }

    // Lazy load scripts
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
        const urlRegex = /^(?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+(?:\/(?:[^\/.]+\/)*[^\/.]+\.[a-zA-Z0-9]+)?\/?$/;
        waitlessScripts.forEach(script => {
            const waitlessUrl = script.getAttribute('waitless');
            if (urlRegex.test(waitlessUrl)) {
                script.src = waitlessUrl;
                script.removeAttribute('waitless');
            } else {
                console.error(`Invalid URL: ${waitlessUrl}`);
            }
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

    global.waitless = waitless;
    console.log('waitless 1.0.4');
})(this);
