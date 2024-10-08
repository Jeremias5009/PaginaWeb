/**
 * @package         Modals
 * @version         14.1.0
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

'use strict';

export const Helper = {
    getStyleSize: function(size, is_height = false) {
        // return if size in undefined
        if (typeof size === 'undefined') {
            return '';
        }

        if ( ! isNaN(size)) {
            size += 'px';
        }

        size = size.replace('%', is_height ? 'vh' : 'vw');

        return size;
    },

    getData: function(element, key) {
        const dataKey = `modals${Helper.camelcase(key)}`;
        const value   = element.dataset[dataKey];

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return value;
    },

    setData: function(element, key, value) {
        const dataKey            = `modals${Helper.camelcase(key)}`;
        element.dataset[dataKey] = value;
    },

    removeData: function(element, key) {
        const dataKey = `modals${Helper.camelcase(key)}`;
        delete element.dataset[dataKey];
    },

    hasData: function(element, key) {
        const dataKey = `modals${Helper.camelcase(key)}`;
        return dataKey in element.dataset;
    },

    storeOriginalStyle: function(element, style, defaultValue = '') {
        if ( ! Helper.hasData(element, style)) {
            let element_style = element.style[style];

            // if element_style is empty and style is maxHeight or maxWidth
            if (element_style === '' && (style === 'maxHeight' || style === 'maxWidth')) {
                element_style = window.getComputedStyle(element)[style];
            }

            Helper.setData(element, `original-${style}`, Helper.getData(element, `original-${style}`) || element_style || defaultValue);
        }

        Helper.restoreOriginalStyle(element, style);
    },

    restoreOriginalStyle: function(element, style) {
        element.style[style] = Helper.getData(element, `original-${style}`);
    },

    storeOriginalStyles: function(element, styles, defaultValues = []) {
        styles.forEach((style, index) => {
            Helper.storeOriginalStyle(element, style, defaultValues[index]);
        });
    },

    restoreOriginalStyles: function(element, styles) {
        styles.forEach(style => Helper.restoreOriginalStyle(element, style));
    },

    paginationSideScroll: function(element, to) {
        const step       = 10;
        const direction  = element.scrollLeft < to ? 'right' : 'left';
        const distance   = Math.abs(direction === 'right' ? to - element.scrollLeft : element.scrollLeft - to);
        let scrollAmount = 0;

        const slideTimer = setInterval(function() {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }

            scrollAmount += step;

            if (scrollAmount >= distance) {
                element.scrollLeft = to;
                window.clearInterval(slideTimer);
            }
        }, 10);
    },

    paginationSideScrollMouseWheel: function(event, element) {
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        element.scrollLeft -= (delta * 40);
        event.preventDefault();
    },

    isMobile: function() {
        return 'navigator' in window && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    isTouch: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    },

    createElementFromHtml: function(string) {
        string = string.replace(/\s*\n\s*/g, '').trim();

        const element = this.getExistingElementFromHashString(string);

        if (element) {
            return element.cloneNode(true);
        }

        const container = document.createElement('div');

        container.innerHTML = string.trim();

        if (container.childNodes.length > 1) {
            container.innerHTML = `<div>${string.trim()}</div>`;
        }

        return container.firstChild;
    },

    getExistingElementFromHashString: function(string) {
        if (string.indexOf('#') === -1 || string.indexOf(' ') > -1) {
            return false;
        }

        const hash = string.split('#').pop();

        if (hash.trim() === '') {
            return false;
        }

        // Return if hash contains a slash
        if (hash.indexOf('/') > -1) {
            return false;
        }

        const element = document.querySelector(`#${hash}`);

        if ( ! element) {
            return false;
        }

        return element;
    },

    remove: function(element) {
        element.parentNode.removeChild(element);
    },

    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    camelcase: function(string, capitalizeFirst = true) {
        if ( ! string) {
            return string;
        }

        // Add a space before existing capitals
        string = string.replace(/([A-Z])/g, ' $1');

        string = string.trim().toLowerCase();

        // Replace dashes and underscores with spaces
        string = string.replace(/[-_\s]/g, ' ');

        // Replace characters followed by a space with a Capital (remove space)
        string = string.replace(/ (.)/g, function(match) {
            return match.toUpperCase();
        });

        // Remove any remaining whitespace
        string = string.replace(/ /g, '');

        if (capitalizeFirst) {
            string = this.capitalize(string);
        }

        return string;
    },

    // Used for animating stuff based on the total amount of time it should take (so longer 'distances' take the same time as short distances)
    getValueByFixedDurationEffect: function(start_value, end_value, time_diff, duration) {
        if ( ! time_diff) {
            return {
                value: start_value,
            };
        }

        duration = parseFloat(duration);

        const total_movement = end_value - start_value;

        // how far are we? 0 = still at starting point, 1 = all the way to there
        // max out at 1
        const position = Math.min(1, time_diff / duration);

        const value = start_value + (total_movement * position);

        return parseFloat(value);
    },

    // Used for animating stuff based on a constant speed (so longer 'distances' take longer)
    getValueByConstantSpeedEffect: function(previous_value, time_diff, duration, step) {
        const base_duration = 250;
        duration            = parseFloat(duration);

        const time_ratio = time_diff / base_duration; // 1 = 1 full step, lower is smaller increments, higher is larger increments
        const speed      = base_duration / duration; // 1 = normal, lower is slower, higher is faster

        const increment = step * time_ratio * speed;
        const value     = previous_value + increment;

        return parseFloat(value);
    },

    animate: function(element, animation, callbacks = []) {
        if ( ! element) {
            return false;
        }

        if ( ! animation
            || animation === 'none'
            || animation === 'show'
            || animation === 'hide'
        ) {
            if (animation === 'hide') {
                Helper.hide(element);
            } else {
                Helper.show(element);
            }

            Helper.runCallbacks(callbacks);

            return;
        }

        if (element.length) {
            element.forEach((el) => {
                Helper.animate(el, animation, callbacks);
                callbacks = [];
            });
            return;
        }

        const animationEnd   = this.getAnimationEndEvent();
        const animationNames = animation.split(' ');

        const onAnimateStart = () => {
            Helper.setData(element, 'animating', true);

            animationNames.forEach((name) => {
                element.classList.add(`rl-modals-animate-${name}`);
            });
        };

        const onAnimateEnd = function() {
            Helper.removeData(element, 'animating');

            animationNames.forEach((name) => {
                element.classList.remove(`rl-modals-animate-${name}`);
            });

            Helper.runCallbacks(callbacks);

            element.removeEventListener(animationEnd, onAnimateEnd, true);
        };

        Helper.show(element);
        onAnimateStart();

        element.addEventListener(animationEnd, onAnimateEnd, true);
    },

    runCallbacks: function(callbacks = []) {
        for (const callback in callbacks) {
            if (typeof callbacks[callback] === 'function') {
                callbacks[callback]();
            }
        }
    },

    getAnimationEndEvent: function() {
        const el         = document.createElement('fakeelement');
        const animations = {
            animation      : 'animationend',
            OAnimation     : 'oAnimationEnd',
            MozAnimation   : 'animationend',
            WebkitAnimation: 'webkitAnimationEnd'
        };

        for (const key in animations) {
            if (el.style[key] !== undefined) {
                return animations[key];
            }
        }
    },

    getTransitionEndEvent: function() {
        const el          = document.createElement('fakeelement');
        const transitions = {
            transition      : 'transitionend',
            OTransition     : 'oTransitionEnd',
            MozTransition   : 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };

        for (const key in transitions) {
            if (el.style[key] !== undefined) {
                return transitions[key];
            }
        }
    },

    // prevents the given unction from being executed too many times in quick succession
    debounce: function(func, wait = 20, immediate = true) {
        let timeout;

        return function() {
            const context = this, args = arguments;

            const later = function() {
                timeout = null;

                if (immediate) {
                    return;
                }

                return func.apply(context, args);
            };

            var callNow = immediate && ! timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if ( ! callNow) {
                return;
            }

            return func.apply(context, args);
        };
    },

    getInterval: function(speed, increment) {
        let timeout = 5; // in ms. lower is smoother, but below 5 browser lag sets in and animation becomes longer
        increment   = (increment * speed) / (50 / timeout);

        return {
            speed    : speed,
            timeout  : timeout,
            increment: increment,
        };
    },

    show: function(element) {
        if ( ! element) {
            return;
        }

        element.classList.remove('hidden');
    },

    hide: function(element) {
        if ( ! element) {
            return;
        }

        element.classList.add('hidden');
    },

    disablePageScrolling: async function() {
        const scrollBar  = window.innerWidth - document.documentElement.clientWidth;
        const styleSheet = document.createElement('style');

        styleSheet.className = 'rl-modals-disable-page-scrolling';
        styleSheet.innerText = `
            html,
            html body {
                overflow: hidden;
            }
            `;

        if (scrollBar > 0) {
            styleSheet.innerText += `
                html {margin-right: ${scrollBar}px}
                `;
        }

        document.head.appendChild(styleSheet);
    },

    enablePageScrolling: async function() {
        const style = document.querySelector('.rl-modals-disable-page-scrolling');

        if (style) {
            Helper.remove(style);
        }
    },

    getMainHtmlElement: function() {
        return document.getElementsByTagName('html')[0];
    },

    createIframe: function(url, config, onload) {
        const iframe = document.createElement('iframe');
        config       = config || {};

        iframe.className      = config.class || '';
        iframe.src            = url;
        iframe.style.width    = '100%';
        iframe.style.height   = '100%';
        iframe.referrerpolicy = 'no-referrer-when-downgrade';
        // allow fullscreen and autoplay for videos
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; fullscreen');

        iframe.onload = function() {
            iframe.classList.add('node-ready');

            if (typeof onload === 'function') {
                onload();
            }
        };

        return iframe;
    },
}
