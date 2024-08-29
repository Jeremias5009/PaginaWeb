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

defined('_JEXEC') or die;

use Joomla\CMS\Factory as JFactory;
use Joomla\CMS\Language\Text as JText;
use Joomla\CMS\Layout\FileLayout as JFileLayout;
use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\Extension as RL_Extension;
use RegularLabs\Library\Html as RL_Html;
use RegularLabs\Library\Input as RL_Input;
use RegularLabs\Library\SystemPlugin as RL_SystemPlugin;
use RegularLabs\Plugin\System\Modals\Clean;
use RegularLabs\Plugin\System\Modals\Document;
use RegularLabs\Plugin\System\Modals\Params;
use RegularLabs\Plugin\System\Modals\Replace;

// Do not instantiate plugin on install pages
// to prevent installation/update breaking because of potential breaking changes
if (
    in_array(JFactory::getApplication()->input->getCmd('option'), [
        'com_installer', 'com_regularlabsmanager'
    ])
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
    JFactory::getApplication()->getLanguage()->load('plg_system_modals', __DIR__);
    JFactory::getApplication()->enqueueMessage(
        JText::sprintf('MDL_EXTENSION_CAN_NOT_FUNCTION', JText::_('MODALS'))
        . ' ' . JText::_('MDL_REGULAR_LABS_LIBRARY_NOT_INSTALLED'),
        'error'
    );

    return;
}

if ( ! RL_Document::isJoomlaVersion(4, 'MODALS'))
{
    RL_Extension::disable('modals', 'plugin');

    RL_Document::adminError(
        JText::sprintf('RL_PLUGIN_HAS_BEEN_DISABLED', JText::_('MODALS'))
    );

    return;
}

if (true)
{
    class PlgSystemModals extends RL_SystemPlugin
    {
        public $_enable_in_admin = true;
        public $_lang_prefix     = 'MDL';
        public $_jversion        = 4;

        public function __construct(&$subject, $config = [])
        {
            parent::__construct($subject, $config);

            $params = Params::get();

            $this->_enable_in_admin = $params->enable_admin;
        }

        public function processArticle(
            &$string,
            $area = 'article',
            $context = '',
            $article = null,
            $page = 0
        )
        {
            Replace::replaceTags($string, $area, $context);
        }

        protected function loadStylesAndScripts(&$buffer)
        {
            Document::loadStylesAndScripts();
        }

        protected function changeDocumentBuffer(&$buffer)
        {
            if (RL_Input::getInt('ml', 0) && ! RL_Input::getInt('fullpage', 0))
            {
                Document::setTemplate();
            }

            return Replace::replaceTags($buffer, 'component');
        }

        protected function changeModulePositionOutput(&$buffer, &$params)
        {
            Replace::replaceTags($buffer, 'body');
        }

        protected function changeFinalHtmlOutput(&$html)
        {
            [$pre, $body, $post] = RL_Html::getBody($html);

            Replace::replaceTags($body, 'html');
            Clean::cleanFinalHtmlOutput($pre);

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
