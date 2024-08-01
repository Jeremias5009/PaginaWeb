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

defined('_JEXEC') or die;

use Joomla\CMS\Factory as JFactory;
use Joomla\CMS\Language\Text as JText;
use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\Extension as RL_Extension;
use RegularLabs\Library\Html as RL_Html;
use RegularLabs\Library\SystemPlugin as RL_SystemPlugin;
use RegularLabs\Plugin\System\Tooltips\Document;
use RegularLabs\Plugin\System\Tooltips\Params;
use RegularLabs\Plugin\System\Tooltips\Replace;

// Do not instantiate plugin on install pages
// to prevent installation/update breaking because of potential breaking changes
if (
    in_array(JFactory::getApplication()->input->getCmd('option'), ['com_installer', 'com_regularlabsmanager'])
    && JFactory::getApplication()->input->getCmd('action') != ''
)
{
    return;
}

if ( ! is_file(JPATH_LIBRARIES . '/regularlabs/regularlabs.xml')
    || ! class_exists('RegularLabs\Library\Parameters')
    || ! class_exists('RegularLabs\Library\DownloadKey')
    || ! class_exists('RegularLabs\Library\SystemPlugin')
)
{
    JFactory::getApplication()->getLanguage()->load('plg_system_tooltips', __DIR__);
    JFactory::getApplication()->enqueueMessage(
        JText::sprintf('TT_EXTENSION_CAN_NOT_FUNCTION', JText::_('TOOLTIPS'))
        . ' ' . JText::_('TT_REGULAR_LABS_LIBRARY_NOT_INSTALLED'),
        'error'
    );

    return;
}

if ( ! RL_Document::isJoomlaVersion(4, 'TOOLTIPS'))
{
    RL_Extension::disable('tooltips', 'plugin');

    RL_Document::adminError(
        JText::sprintf('RL_PLUGIN_HAS_BEEN_DISABLED', JText::_('TOOLTIPS'))
    );

    return;
}

if (true)
{
    class PlgSystemTooltips extends RL_SystemPlugin
    {
        public $_lang_prefix     = 'TT';
        public $_jversion        = 4;
        public $_enable_in_admin = true;

        public function __construct(&$subject, $config = [])
        {
            parent::__construct($subject, $config);

            $params = Params::get();

            $this->_enable_in_admin = $params->enable_admin;
        }

        protected function loadStylesAndScripts(&$buffer)
        {
            Document::loadStylesAndScripts();
        }

        protected function changeFinalHtmlOutput(&$html)
        {
            [$pre, $body, $post] = RL_Html::getBody($html);

            Replace::replaceTags($body);

            $html = $pre . $body . $post;

            return true;
        }

        protected function cleanFinalHtmlOutput(&$html)
        {
            Document::removeHeadStuff($html);

            return true;
        }
    }
}
