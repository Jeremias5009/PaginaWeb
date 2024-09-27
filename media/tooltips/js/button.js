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

    window.RegularLabs.TooltipsButton = window.RegularLabs.TooltipsButton || {
        form   : null,
        options: {},

        setForm: function(form) {
            this.form = form;
        },

        insertText: function(editor_name) {
            this.options = Joomla.getOptions ? Joomla.getOptions('rl_tooltips_button', {}) : Joomla.optionsStorage.rl_tooltips_button || {};

            let html = this.renderHtml();

            if ( ! html) {
                return;
            }

            const editor = parent.Joomla.editors.instances[editor_name];

            html = this.prepareOutputForEditor(html, editor);

            editor.replaceSelection(html);
        },

        renderHtml: function() {
            const tag       = this.options.tag;
            const tag_start = this.options.tag_characters[0];
            const tag_end   = this.options.tag_characters[1];

            const attributes = this.getAttributes();
            const link_text  = this.getLinkText();

            return '<p>'
                + tag_start + (tag + ' ' + attributes.join(' ')).trim() + tag_end
                + link_text
                + tag_start + '/' + tag + tag_end
                + '</p>';
        },

        prepareOutputForEditor: function(string, editor) {
            const editor_content   = editor.getValue();
            const editor_selection = editor.getSelection();

            // If the editor is CodeMirror
            if (editor_content === '' || editor_content[0] !== '<') {
                return string;
            }

            // If selection is empty or code is replacing a selection not starting with a html tag
            if (editor_selection.indexOf('<') !== 0) {
                // remove surrounding p tags
                return string.replace(/^<p>(.*)<\/p>$/g, '$1');
            }

            return string;
        },

        getContent: function() {
            return this.getTextOrImage('content');
        },

        getLinkText: function() {
            const content = this.getTextOrImage('link');

            return content ? content : '...';
        },

        getTextOrImage: function(prefix = 'content') {
            const type = this.getValue(prefix + '_type', 'text');

            if (type === 'text') {
                return this.getValue(prefix + '_text', '');
            }

            const src = this.getValue(prefix + '_image', '');

            if ( ! src) {
                return '';
            }

            return '<img src="' + src + '" />';
        },

        getAttributes: function() {
            const attributes = [];

            const title = this.getValue('title', '');
            let content = this.getContent();

            if ( ! title && ! content) {
                content = '...';
            }

            this.addAttribute(attributes, 'title');

            if (content) {
                attributes.push('content="' + content + '"');
            }

            this.addAttribute(attributes, 'theme');
            this.addAttribute(attributes, 'class');
            this.addAttribute(attributes, 'width');
            this.addAttribute(attributes, 'height');

            return attributes;
        },

        addAttribute: function(attributes, id, key = null, true_value = null, false_value = null) {
            key = key ? key : id;

            let value = this.getValue(id);

            // join value if it is an array
            if (Array.isArray(value)) {
                value = value.join(',');
            }

            if (value === '' || value === undefined || value === null) {
                if (false_value !== null) {
                    attributes.push(key + '="' + false_value + '"');
                }
                return;
            }

            value = true_value !== null ? true_value : value;

            attributes.push(key + '="' + value + '"');
        },

        getValue: function(id, default_value = '') {
            let elements = this.form.querySelectorAll('[name="' + id + '"]');

            if ( ! elements.length) {
                elements = this.form.querySelectorAll('[name="' + id + '[]"]');
            }

            if ( ! elements.length) {
                return default_value;
            }

            const element = elements[0];

            if (element.type === 'textarea') {
                return this.fixType(element.value);
            }

            let value = element.value ? element.value : default_value;

            if (element.type === 'select-one') {
                if (element.type === 'checkbox' && ! element.checked) {
                    return default_value;
                }

                return this.fixType(value);
            }

            if (element.type === 'select-multiple') {
                value = [];

                for (let i = 0; i < element.options.length; i++) {
                    if (element.options[i].selected && element.options[i].value !== '') {
                        value.push(element.options[i].value);
                    }
                }

                return this.fixType(value);
            }

            if (elements.length > 1) {
                value = [];

                for (let i = 0; i < elements.length; i++) {
                    if ((elements[i].selected || elements[i].checked) && elements[i].value !== '') {
                        value.push(elements[i].value);
                    }
                }

                if (element.type === 'radio') {
                    return this.fixType(value[0]);
                }

                return this.fixType(value);
            }

            return this.fixType(value);
        },

        fixType: function(value) {
            // if it is an array, run fixType on each value
            if (Array.isArray(value)) {
                value.forEach((val, index) => {
                    value[index] = this.fixType(val);
                });

                return value;
            }

            if (isNaN(value) || isNaN(parseInt(value))) {
                return value;
            }

            return Number(value);
        },
    };
})();
