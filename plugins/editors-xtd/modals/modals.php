<?php
/**
 * @package         Modals
 * @version         14.1.0
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

use Joomla\CMS\Language\Text as JText;
use Joomla\CMS\Uri\Uri as JUri;
use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\EditorButtonPlugin as RL_EditorButtonPlugin;
use RegularLabs\Library\Extension as RL_Extension;

defined('_JEXEC') or die;

if ( ! is_file(JPATH_LIBRARIES . '/regularlabs/regularlabs.xml')
    || ! class_exists('RegularLabs\Library\Parameters')
    || ! class_exists('RegularLabs\Library\DownloadKey')
    || ! class_exists('RegularLabs\Library\EditorButtonPlugin')
)
{
    return;
}

if ( ! RL_Document::isJoomlaVersion(4))
{
    RL_Extension::disable('modals', 'plugin', 'editors-xtd');

    return;
}

if (true)
{
    class PlgButtonModals extends RL_EditorButtonPlugin
    {
        protected $button_icon = '<svg viewBox="0 0 24 24" style="fill:none;" width="24" height="24" fill="none" stroke="currentColor">'
        . '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />'
        . '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />'
        . '</svg>';

        protected function loadScripts()
        {
            $params = $this->getParams();

            RL_Document::scriptOptions([
                'tag'            => $params->tag,
                'tag_characters' => explode('.', $params->tag_characters),
                'root'           => JUri::root(true),
            ], 'modals_button');

            RL_Document::script('modals.button');
        }
    }
}
