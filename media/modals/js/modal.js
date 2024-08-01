/**
 * @package         Modals
 * @version         14.0.14
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

(function() {
    'use strict';

    window.RegularLabs = window.RegularLabs || {};

    window.RegularLabs.Modals = window.RegularLabs.Modals || {
        close: function() {
            for (const group in parent.RegularLabs.Modals.modals) {
                parent.RegularLabs.Modals.modals[group].close();
            }
        },
    };
})();

window.RLModals = window.RLModals || RegularLabs.Modals;
