<?php
/**
 * @package         Tooltips
 * @version         9.2.2
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

namespace RegularLabs\Plugin\System\Tooltips;

defined('_JEXEC') or die;

use Joomla\CMS\Factory as JFactory;
use Joomla\CMS\Filesystem\File as JFile;
use Joomla\CMS\Filesystem\Folder as JFolder;
use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\Input as RL_Input;
use RegularLabs\Library\Protect as RL_Protect;
use RegularLabs\Library\RegEx as RL_RegEx;

class Document
{
    static $all_themes;
    static $used_themes = [];

    public static function loadStylesAndScripts()
    {
        // do not load scripts/styles on feeds or print pages
        if (RL_Document::isFeed() || RL_Input::getInt('print', 0))
        {
            return;
        }

        $params = Params::get();

        $options = [
            'theme'               => $params->theme ?: 'light',
        ];

        RL_Document::scriptOptions($options, 'Tooltips');

        RL_Document::script('tooltips.script', ['type' => 'module']);
        self::loadStyles();
    }

    public static function removeHeadStuff(&$html)
    {
        // Remove all scripts and styles if data-tooltips attribute is not found
        if ( ! RL_RegEx::match('data-tooltips', $html))
        {
            self::removeAllScriptsAndStyles($html);

            return;
        }

        // Otherwise only remove the unused styles
        self::removeUnusedStyles($html);
    }

    private static function getThemes()
    {
        if ( ! is_null(self::$all_themes))
        {
            return self::$all_themes;
        }

        $folder = JPATH_SITE . '/media/tooltips/css';
        $files  = JFolder::files($folder, '^theme-[a-z0-9-_]+\.css$');

        $template = JFactory::getApplication()->getTemplate();
        $folder   = JPATH_SITE . '/media/templates/site/' . $template . '/css/tooltips';

        if (is_dir($folder))
        {
            $files_template = JFolder::files($folder, '^theme-[a-z0-9-_]+\.css$');
            $files_template = empty($files_template) ? [] : $files_template;
            $files          = [...$files, ...$files_template];
        }

        $files = array_unique($files);

        $themes = [];

        foreach ($files as $file)
        {
            $file_name = JFile::stripExt($file);
            $file_name = substr($file_name, 6);

            $themes[] = $file_name;
        }

        self::$all_themes = array_unique($themes);

        return self::$all_themes;
    }

    private static function getUsedThemes($html)
    {
        $params = Params::get();

        $themes = [$params->theme];

        if ( ! RL_RegEx::matchAll('data-tooltips-theme="([^"]*)"', $html, $matches, null, PREG_PATTERN_ORDER))
        {
            return $themes;
        }

        return array_unique([...$themes, ...$matches[1]]);
    }

    private static function loadStyles()
    {
        $params = Params::get();

        if ( ! $params->load_stylesheet)
        {
            RL_Document::style('tooltips.theme-custom');

            return;
        }

        RL_Document::style('tooltips.style');

        $themes = self::getThemes();

        foreach ($themes as $theme)
        {
            RL_Document::style('tooltips.theme-' . $theme);
        }
    }

    private static function removeAllScriptsAndStyles(&$html)
    {
        // Prevent the tooltips.button and tooltips.popup script from being removed
        RL_Protect::protectByRegex($html, '<script [^>]*src="[^"]*/(tooltips/js|js/tooltips)/(button|popup)\..*?>');

        // remove style and script if no items are found
        RL_Document::removeScriptsStyles($html, 'Tooltips');
        RL_Document::removeScriptsOptions($html, 'Tooltips');

        RL_Protect::unprotect($html);
    }

    private static function removeUnusedStyles(&$html)
    {
        $all_themes    = self::getThemes();
        $used_themes   = self::getUsedThemes($html);
        $unused_themes = array_diff($all_themes, $used_themes);

        foreach ($unused_themes as $theme)
        {
            RL_Document::removeStyleTag($html, 'tooltips', 'theme-' . $theme);
        }
    }
}
