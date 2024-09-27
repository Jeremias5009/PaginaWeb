/**
 * @package         Tooltips
 * @version         9.2.2
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

(function() {
    'use strict';

    window.RegularLabs = window.RegularLabs || {};

    window.RegularLabs.TooltipsPopup = window.RegularLabs.TooltipsPopup || {
        form: null,

        init: function() {
            if ( ! parent.RegularLabs.TooltipsButton) {
                document.querySelector('body').innerHTML = '<div class="alert alert-error">This page cannot function on its own.</div>';
                return;
            }

            this.form = document.getElementById('tooltipsForm');

            parent.RegularLabs.TooltipsButton.setForm(this.form);
        }
    };
})();
