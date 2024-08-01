<?php
/**
 * @package         Tooltips
 * @version         9.2.1
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
    RL_Extension::disable('tooltips', 'plugin', 'editors-xtd');

    return;
}

if (true)
{
    class PlgButtonTooltips extends RL_EditorButtonPlugin
    {
        protected $button_icon = '<svg viewBox="0 0 24 24" style="fill:none;" width="24" height="24" fill="none" stroke="currentColor">'
        . '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20l-4-4h-3c-1.105 0-2-0.895-2-2v0-8c0-1.105 0.895-2 2-2v0h14c1.105 0 2 0.895 2 2v0 8c0 1.105-0.895 2-2 2v0h-3l-4 4z" />'
        . '</svg>';

        protected function loadScripts()
        {
            $params = $this->getParams();

            RL_Document::scriptOptions([
                'tag'            => $params->tag,
                'tag_characters' => explode('.', $params->tag_characters),
                'root'           => JUri::root(true),
            ], 'tooltips_button');

            RL_Document::script('tooltips.button');
        }
    }
}
