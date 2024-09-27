/**
 * @package         Tooltips
 * @version         9.2.2
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

'use strict';

import {Helper} from './helper.js?9.2.2';

export function Tooltip(element, id) {
    this.id                   = id;
    this.element              = element;
    this.tooltip              = null;
    this.elements             = {};
    this.animationEndEvent    = null;
    this.globalEventListeners = {};
    this.status               = 'closed';
    this.settings             = RegularLabs.Tooltips.settings;
    this.closeTimer           = null;
    this.outsideClickEvent    = null;
    this.originalPosition     = 'top';

    const init = async () => {
        const createElements = () => {
            return new Promise((resolve) => {
                this.tooltip    = Helper.createElementFromHtml(this.settings.htmlTemplates.tooltip);
                this.tooltip.id = `rl_tooltip_${this.id}`;

                Helper.setData(this.tooltip, 'theme', this.settings.theme);
                Helper.setData(this.tooltip, 'style', this.settings.style);

                if (Helper.hasData(this.element, 'is-image')) {
                    Helper.setData(this.tooltip, 'is-image', true);
                }

                if (Helper.hasData(this.element, 'class')) {
                    this.tooltip.className = Helper.getData(this.element, 'class');
                }

                this.elements.main  = this.tooltip.querySelector('[data-tooltips-element="main"]');
                this.elements.arrow = this.tooltip.querySelector('[data-tooltips-element="arrow"]');

                if (this.element.getAttribute('data-tooltips-title')) {
                    this.elements.title           = Helper.createElementFromHtml(
                        this.settings.htmlTemplates.title.replace(
                            /%titleTagType%/g,
                            this.settings.titleTagType
                        )
                    );
                    this.elements.title.innerHTML = this.element.getAttribute('data-tooltips-title');
                    this.elements.main.appendChild(this.elements.title);

                    Helper.setData(this.tooltip, 'has-title', true);
                }

                if (this.element.getAttribute('data-tooltips-content')) {
                    this.elements.content           = Helper.createElementFromHtml(this.settings.htmlTemplates.content);
                    this.elements.content.innerHTML = this.element.getAttribute('data-tooltips-content');
                    this.elements.main.appendChild(this.elements.content);

                    Helper.setData(this.tooltip, 'has-content', true);
                }

                if (this.settings.width) {
                    this.elements.main.style.width = Helper.getStyleSize(this.settings.width);
                }

                if (this.settings.height) {
                    this.elements.main.style.height = Helper.getStyleSize(this.settings.height, true);
                }

                resolve();
            });
        };

        const addEventListeners = () => {
            return new Promise((resolve) => {

                const eventType  = this.settings.mode === 'click' ? 'click' : 'mouseenter';
                const closeDelay = this.settings.mode !== 'hover' ? this.settings.closeDelayClickMode : this.settings.closeDelay;

                this.element.addEventListener('touchstart', () => {
                    if (this.status !== 'closed') {
                        return;
                    }
                    clearTimeout(this.closeTimer);
                    this.open();
                });

                this.element.addEventListener(eventType, () => {
                    if (this.status !== 'closed') {
                        return;
                    }
                    clearTimeout(this.closeTimer);
                    this.open();
                });

                this.element.addEventListener('mouseleave', () => {
                    this.closeTimer = setTimeout(() => {
                        this.close();
                    }, closeDelay);
                });

                this.tooltip.addEventListener('mouseenter', () => {
                    clearTimeout(this.closeTimer);
                });

                this.tooltip.addEventListener('click', () => {
                    clearTimeout(this.closeTimer);
                });

                this.tooltip.addEventListener('mouseleave', () => {
                    this.closeTimer = setTimeout(() => {
                        this.close();
                    }, closeDelay);
                });

                this.outsideClickEvent = (event) => {
                    if (event.target !== this.element && ! this.element.contains(event.target)
                        && event.target !== this.tooltip && ! this.tooltip.contains(event.target)) {
                        this.close();
                    }
                };

                resolve();
            });
        };

        const setSettings = () => {
            return new Promise((resolve) => {
                this.settings = Object.assign({}, this.settings);
                for (const setting in this.settings) {
                    const elementSetting = Helper.getData(this.element, setting);

                    if (elementSetting === undefined) {
                        continue;
                    }

                    this.settings[setting] = elementSetting;
                }

                this.originalPosition = this.settings.position;

                resolve();
            });
        };

        await setSettings();
        await createElements();
        addEventListeners();
    };

    init();
}

Tooltip.prototype = {
    open: async function() {
        await this.updateStatus('open');

        const effect = this.settings.cssEffects[this.settings.effect].in;

        if ( ! document.querySelector(`#${this.tooltip.id}`)) {
            document.body.appendChild(this.tooltip);
        }

        this.setPosition();
        Helper.hide(this.tooltip);

        await Helper.animate(
            this.tooltip,
            effect,
            [async () => {
                if (this.settings.mode === 'click' || this.settings.mode === 'sticky') {
                    window.addEventListener('click', this.outsideClickEvent);
                }
                window.addEventListener('touchstart', this.outsideClickEvent);

                this.updateStatus('opened');
            }]
        );
    },

    close: async function() {
        if (this.outsideClickEvent) {
            if (this.settings.mode === 'click' || this.settings.mode === 'sticky') {
                window.removeEventListener('click', this.outsideClickEvent);
            }
            window.removeEventListener('touchstart', this.outsideClickEvent);
        }

        clearTimeout(this.closeTimer);

        if (this.status === 'close' || this.status === 'closed') {
            return;
        }

        await this.updateStatus('close');

        const effect = this.settings.cssEffects[this.settings.effect].out;

        this.animationEndEvent = Helper.animate(
            this.tooltip,
            effect,
            [async () => {
                if (this.status === 'open') {
                    return;
                }

                Helper.remove(this.tooltip);
                this.updateStatus('closed');
            }]
        );
    },

    setPosition: function() {
        this.resetPosition();
        Helper.setData(this.tooltip, 'position', this.settings.position);

        const hasClassHidden = this.tooltip.classList.contains('hidden');

        this.tooltip.classList.remove('hidden');

        switch (this.settings.position) {
            case 'bottom':
                this.setPositionBottom();
                break;
            case 'left':
                this.setPositionLeft();
                break;
            case 'right':
                this.setPositionRight();
                break;
            case 'top':
            default:
                this.setPositionTop();
                break;
        }

        this.setArrowOnTitleAttribute();

        if (hasClassHidden) {
            this.tooltip.classList.add('hidden');
        }
    },

    setArrowOnTitleAttribute: function() {
        if ( ! Helper.hasData(this.tooltip, 'has-title')) {
            return;
        }

        if (this.settings.position === 'bottom') {
            Helper.setData(this.tooltip, 'arrow-on-title', true);
            return;
        }

        if (this.settings.position === 'top') {
            if ( ! Helper.hasData(this.tooltip, 'has-content')) {
                Helper.setData(this.tooltip, 'arrow-on-title', true);
            }
            return;
        }

        const titleMeasurements = Helper.getMeasurements(this.elements.title);
        const arrowMeasurements = Helper.getMeasurements(this.elements.arrow);

        if (arrowMeasurements.middle < titleMeasurements.bottom) {
            Helper.setData(this.tooltip, 'arrow-on-title', true);
        }
    },

    hasRoom: function(position) {
        const elementMeasurements = Helper.getMeasurements(this.element);
        const windowMargin        = Helper.getWindowMargins(this.settings.margin);
        const arrowMeasurements   = Helper.getMeasurements(this.elements.arrow);

        const arrowSize = Math.max(arrowMeasurements.width, arrowMeasurements.height);

        if (position === 'left' || position === 'right') {
            if (elementMeasurements.middle < (windowMargin.top + arrowSize)) {
                return false;
            }

            if (elementMeasurements.middle > (windowMargin.bottom - arrowSize)) {
                return false;
            }
        }

        if (position === 'top' || position === 'bottom') {
            if (elementMeasurements.center < (windowMargin.left + arrowSize)) {
                return false;
            }

            if (elementMeasurements.center > (windowMargin.right - arrowSize)) {
                return false;
            }
        }

        const measurements = this.getTooltipMeasurements(position);
        const room         = this.getRoom();

        return room[position].width >= measurements.width
            && room[position].height >= measurements.height;
    },

    setPositionTop: function() {
        if ( ! this.hasRoom('top')) {
            this.setPositionBottom();
            return;
        }

        this.resetPosition();

        this.settings.position = 'top';
        Helper.setData(this.tooltip, 'position', this.settings.position);

        const tooltipMeasurements = this.getTooltipMeasurements();
        const elementMeasurements = Helper.getMeasurements(this.element);

        this.setPositionByOffsets(
            elementMeasurements.top - tooltipMeasurements.height,
            elementMeasurements.center - (tooltipMeasurements.width / 2)
        );
    },

    setPositionBottom: function() {
        if ( ! this.hasRoom('bottom') && this.hasRoom('top')) {
            this.setPositionTop();
            return;
        }

        this.resetPosition();

        this.settings.position = 'bottom';
        Helper.setData(this.tooltip, 'position', this.settings.position);

        const tooltipMeasurements = this.getTooltipMeasurements();
        const elementMeasurements = Helper.getMeasurements(this.element);
        const arrowMeasurements   = Helper.getMeasurements(this.elements.arrow);

        this.setPositionByOffsets(
            elementMeasurements.bottom + arrowMeasurements.height,
            elementMeasurements.center - (tooltipMeasurements.width / 2)
        );
    },

    setPositionLeft: function() {
        if ( ! this.hasRoom('left') && this.hasRoom('right')) {
            this.setPositionRight();
            return;
        }

        if ( ! this.hasRoom('left')) {
            this.setPositionTop();
            return;
        }

        this.resetPosition();

        this.settings.position = 'left';
        Helper.setData(this.tooltip, 'position', this.settings.position);

        const tooltipMeasurements = this.getTooltipMeasurements();
        const elementMeasurements = Helper.getMeasurements(this.element);

        this.setPositionByOffsets(
            elementMeasurements.middle - (tooltipMeasurements.height / 2),
            elementMeasurements.left - tooltipMeasurements.width
        );
    },

    setPositionRight: function() {
        if ( ! this.hasRoom('right') && this.hasRoom('left')) {
            this.setPositionLeft();
            return;
        }

        if ( ! this.hasRoom('right')) {
            this.setPositionTop();
            return;
        }

        this.resetPosition();

        this.settings.position = 'right';
        Helper.setData(this.tooltip, 'position', this.settings.position);

        const tooltipMeasurements = this.getTooltipMeasurements();
        const elementMeasurements = Helper.getMeasurements(this.element);
        const arrowMeasurements   = Helper.getMeasurements(this.elements.arrow);

        this.setPositionByOffsets(
            elementMeasurements.middle - (tooltipMeasurements.height / 2),
            elementMeasurements.right + arrowMeasurements.width
        );
    },

    setPositionByOffsets: function(top, left) {
        this.tooltip.style.top  = `${top}px`;
        this.tooltip.style.left = `${left}px`;

        this.moveWithinMargins();
    },

    moveWithinMargins: function() {
        if (this.settings.position === 'left' || this.settings.position === 'right') {
            this.moveWithinMarginsVertical();
            return;
        }

        this.moveWithinMarginsHorizontal();
    },

    moveWithinMarginsHorizontal: function() {
        const windowMargin        = Helper.getWindowMargins(this.settings.margin);
        const elementMeasurements = Helper.getMeasurements(this.element);
        let tooltipMeasurements   = this.getTooltipMeasurements();

        if (tooltipMeasurements.right > windowMargin.right) {
            const offset                   = windowMargin.right - tooltipMeasurements.width;
            this.tooltip.style.left        = `${offset}px`;
            this.elements.arrow.style.left = `${elementMeasurements.center - offset}px`;
        }

        tooltipMeasurements = this.getTooltipMeasurements();

        if (tooltipMeasurements.left < windowMargin.left) {
            const offset                   = windowMargin.left;
            this.tooltip.style.left        = `${offset}px`;
            this.elements.arrow.style.left = `${elementMeasurements.center - offset}px`;
        }
    },

    moveWithinMarginsVertical: function() {
        const windowMargin        = Helper.getWindowMargins(this.settings.margin);
        const elementMeasurements = Helper.getMeasurements(this.element);
        let tooltipMeasurements   = this.getTooltipMeasurements();

        if (tooltipMeasurements.bottom > windowMargin.bottom) {
            const offset                  = windowMargin.bottom - tooltipMeasurements.height;
            this.tooltip.style.top        = `${offset}px`;
            this.elements.arrow.style.top = `${elementMeasurements.middle - offset}px`;
        }

        tooltipMeasurements = this.getTooltipMeasurements();

        if (tooltipMeasurements.top < windowMargin.top) {
            const offset                  = windowMargin.top;
            this.tooltip.style.top        = `${offset}px`;
            this.elements.arrow.style.top = `${elementMeasurements.middle - offset}px`;
        }
    },

    resetPosition: function() {
        const windowMargin = Helper.getWindowMargins(this.settings.margin);

        this.settings.position         = this.originalPosition;
        this.tooltip.style.top         = `${windowMargin.top}px`;
        this.tooltip.style.left        = `${windowMargin.left}px`;
        this.tooltip.style.width       = '';
        this.elements.arrow.style.left = '';
        this.elements.arrow.style.top  = '';

        Helper.removeData(this.tooltip, 'arrow-on-title');

        const tooltipMeasurements = this.getTooltipMeasurements();

        this.tooltip.style.width = `${tooltipMeasurements.width}px`;

        if (tooltipMeasurements.width > windowMargin.width) {
            this.tooltip.style.width = `${windowMargin.width}px`;
        }
    },

    getRoom: function() {
        const elementMeasurements = Helper.getMeasurements(this.element);
        const windowMargin        = Helper.getWindowMargins(this.settings.margin);

        return {
            top   : {
                width : windowMargin.width,
                height: elementMeasurements.top - windowMargin.top
            },
            bottom: {
                width : windowMargin.width,
                height: windowMargin.bottom - elementMeasurements.bottom
            },
            left  : {
                width : elementMeasurements.left - windowMargin.left,
                height: windowMargin.height
            },
            right : {
                width : windowMargin.right - elementMeasurements.right,
                height: windowMargin.height
            }
        }
    },

    getTooltipMeasurements: function(position) {
        position                  = position || this.settings.position;
        const tooltipMeasurements = Helper.getMeasurements(this.tooltip);
        const arrowMeasurements   = Helper.getMeasurements(this.elements.arrow);

        // copy values from tooltipMeasurements
        const measurements = {
            width : tooltipMeasurements.width,
            height: tooltipMeasurements.height,
            top   : tooltipMeasurements.top,
            left  : tooltipMeasurements.left,
            right : tooltipMeasurements.right,
            bottom: tooltipMeasurements.bottom,
            middle: tooltipMeasurements.middle,
            center: tooltipMeasurements.center
        }

        switch (position) {
            case 'bottom':
                measurements.top -= arrowMeasurements.height;
                measurements.height += arrowMeasurements.height;
                break;
            case 'left':
                measurements.right += arrowMeasurements.width;
                measurements.width += arrowMeasurements.width;
                break;
            case 'right':
                measurements.left -= arrowMeasurements.width;
                measurements.width += arrowMeasurements.width;
                break;
            case 'top':
            default:
                measurements.bottom += arrowMeasurements.height;
                measurements.height += arrowMeasurements.height;
                break;
        }

        measurements.center = measurements.left + (measurements.width / 2);
        measurements.middle = measurements.top + (measurements.height / 2);

        return measurements;
    },

    updateStatus: async function(status) {
        return new Promise((resolve) => {
            this.status = status;
            this.triggerEvent(status);

            resolve();
        });
    },

    triggerEvent: function(status) {
        if (typeof this.settings[`on${Helper.capitalize(status)}`] === 'function') {
            this.settings[`on${Helper.capitalize(state)}`]();
        }

        if (this.activeSlide && typeof this.activeSlide.eventListeners[status] === 'function') {
            this.activeSlide.eventListeners[status]();
        }
    },

    hideInactiveSlides: function() {
        this.slides.forEach((inactive_slide) => {
            if (inactive_slide === this.activeSlide
                || inactive_slide === this.previousSlide
            ) {
                return;
            }

            Helper.hide(inactive_slide.tooltip);
        });
    },

    addEventListener: function(element, type, callback) {
        element.addEventListener(type, callback, true);

        return {
            element : element,
            type    : type,
            callback: callback
        };
    },
};
