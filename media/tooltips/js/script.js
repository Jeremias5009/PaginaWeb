/**
 * @package         Tooltips
 * @version         9.2.1
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

import {Tooltip} from './modules/tooltip.js?9.2.1';
import {Helper} from './modules/helper.js?9.2.1';

(function() {
    'use strict';

    window.RegularLabs = window.RegularLabs || {};

    window.RegularLabs.Tooltips = window.RegularLabs.Tooltips || {
        defaults: {
            theme              : 'light',
            style              : '',
            position           : 'top',
            titleTagType       : 'h3',
            effect             : 'none',
            closeDelay         : 200,
            closeDelayClickMode: 5000,
            margin             : 10,
            mode               : 'hover',
            width              : '',
            height             : '',
            cssEffects         : {
                fade: {
                    in : 'fade-in',
                    out: 'fade-out'
                },
                zoom: {
                    in : 'zoom-in',
                    out: 'zoom-out'
                },
                none: {
                    in : 'show',
                    out: 'hide'
                }
            },
            htmlTemplates      : {
                tooltip: `
                    <div data-tooltips-element="tooltip" class="hidden" tabindex="-1" role="dialog" aria-hidden="true">
                         <div data-tooltips-element="main"></div>
                         <div data-tooltips-element="arrow"></div>
                    </div>
                    `,
                title  : '<%titleTagType% data-tooltips-element="title"></%titleTagType%>',
                content: '<div data-tooltips-element="content"></div>',
            }
        },

        settings : {},
        tooltips : [],
        idCounter: 0,

        init: async function(settings) {
            const setSettings = (settings) => {
                return new Promise(resolve => {
                    if (this.settings.length) {
                        return;
                    }

                    this.settings = {...this.defaults};

                    if (
                        typeof Joomla !== 'undefined'
                        && typeof Joomla.getOptions !== 'undefined'
                    ) {
                        this.settings = {
                            ...this.settings,
                            ...Joomla.getOptions('rl_tooltips')
                        };
                    }

                    this.settings = {
                        ...this.settings,
                        ...settings
                    };

                    resolve();
                });
            };

            const createTooltips = async () => {
                const elements = document.querySelectorAll('[data-tooltips]');

                for (const element of elements) {
                    await RegularLabs.Tooltips.createTooltip(element);
                }
            };

            await setSettings(settings);
            await createTooltips();
        },

        createTooltip: async function(element) {
            return new Promise(async (resolve) => {
                if ( ! (element instanceof Element)) {
                    resolve();
                    return;
                }

                if (Helper.getData(element, 'done')) {
                    resolve();
                    return;
                }

                const id = RegularLabs.Tooltips.idCounter++;

                this.tooltips[id] = new Tooltip(element, id);

                resolve();
            });
        },

        open: function(link) {
            const tooltip = this.getTooltipByElement(link);

            if ( ! tooltip) {
                return;
            }

            tooltip.open();
        },

        close: function(link) {
            if ( ! link) {
                this.closeAll();
                return;
            }

            const tooltip = this.getTooltipByElement(link);

            if ( ! tooltip) {
                return;
            }

            tooltip.close();
        },

        closeAll: function() {
            for (const group in this.tooltips) {
                this.tooltips[group].close();
            }
        },

        getTooltipByElement: function(element) {
            for (const i in this.tooltips) {
                if (this.tooltips[i].element === element) {
                    return this.tooltips[i];
                }
            }

            return null;
        },
    };

    RegularLabs.Tooltips.init();
})();

window.RLTooltips = window.RLTooltips || (function(options) {
    return RegularLabs.Tooltips.init(options);
});
