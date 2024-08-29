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

namespace RegularLabs\Plugin\System\Modals;

defined('_JEXEC') or die;

use Joomla\CMS\Factory as JFactory;
use Joomla\CMS\Filesystem\File as JFile;
use Joomla\CMS\Filesystem\Folder as JFolder;
use Joomla\CMS\Language\Text as JText;
use Joomla\CMS\Router\Route as JRoute;
use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\Input as RL_Input;
use RegularLabs\Library\Protect as RL_Protect;
use RegularLabs\Library\RegEx as RL_RegEx;

class Document
{
    static $all_themes;
    static $used_themes = [];

    public static function addPrint($url)
    {
        [$url, $hash] = explode('#', $url . '#', 2);

        $url .= ( ! str_contains($url, '?')) ? '?print=1' : '&amp;print=1';

        if ( ! empty($hash))
        {
            $url .= '#' . $hash;
        }

        return $url;
    }

    public static function addUrlAttributes($url, $fullpage = false, $print = false)
    {
        [$url, $hash] = explode('#', $url . '#', 2);

        if (
            ! str_starts_with($url, 'http')
            && str_starts_with($url, 'index.php')
            && ! str_contains($url, '/')
        )
        {
            $url = JRoute::link('site', $url);
        }

        $url = self::setUrlAttribute($url, 'ml');

        if ($fullpage)
        {
            $url = self::setUrlAttribute($url, 'fullpage');
        }

        if ($print)
        {
            $url = self::setUrlAttribute($url, 'print');
        }

        if ( ! empty($hash))
        {
            $url .= '#' . $hash;
        }

        return $url;
    }

    public static function loadStylesAndScripts()
    {
        // do not load scripts/styles on feeds or print pages
        if (RL_Document::isFeed() || RL_Input::getInt('print', 0))
        {
            return;
        }

        $params = Params::get();

        JText::script('MDL_MODALTXT_CLOSE', true);
        JText::script('MDL_MODALTXT_PREVIOUS', true);
        JText::script('MDL_MODALTXT_NEXT', true);

        $options = [
            'theme'                  => $params->theme ?: 'dark',
            'dimensionsIncludeTitle' => (int) $params->dimensions_include_title,
        ];

        RL_Document::scriptOptions($options, 'Modals');

        RL_Document::script('modals.script', ['type' => 'module']);
        self::loadStyles();

        if (RL_Input::getInt('ml', 0) && $params->add_redirect)
        {
            self::addRedirectScript();
        }
    }

    public static function removeHeadStuff(&$html)
    {
        // Remove all scripts and styles if data-modals attribute is not found
        if ( ! RL_RegEx::match('data-modals', $html))
        {
            self::removeAllScriptsAndStyles($html);

            return;
        }

        // Otherwise only remove the unused styles
        self::removeUnusedStyles($html);
    }

    public static function setTemplate()
    {
        $params = Params::get();

        RL_Input::set(
            'tmpl',
            RL_Input::getWord('tmpl', $params->sub_template)
        );

        RL_Document::style('modals.modal');
        RL_Document::script('modals.modal');
    }

    public static function setUrlAttribute($url, $key)
    {
        if (str_contains($url, $key . '=1'))
        {
            return $url;
        }

        return $url
            . (! str_contains($url, '?') ? '?' : '&amp;')
            . $key . '=1';
    }

    private static function addRedirectScript()
    {
        // Add redirect script
        $script =
            ";if( parent.location.href === window.location.href ) {
                loc = window.location.href.replace(/(\?|&)ml=1(&iframe=1(&fullpage=1)?)?(&|$)/, '$1');
                loc = loc.replace(/(\?|&)$/, '');

                if(parent.location.href !== loc) {
                    parent.location.href = loc;
                }
            }";

        RL_Document::scriptDeclaration($script);
    }

    private static function getThemes()
    {
        if ( ! is_null(self::$all_themes))
        {
            return self::$all_themes;
        }

        $folder = JPATH_SITE . '/media/modals/css';
        $files  = JFolder::files($folder, '^theme-[a-z0-9-_]+\.css$');

        $template = JFactory::getApplication()->getTemplate();
        $folder   = JPATH_SITE . '/media/templates/site/' . $template . '/css/modals';

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

        if ( ! RL_RegEx::matchAll('data-modals-theme="([^"]*)"', $html, $matches, null, PREG_PATTERN_ORDER))
        {
            return $themes;
        }

        $themes = [...$themes, ...$matches[1]];
        $themes = array_unique($themes);

        return $themes;
    }

    private static function loadStyles()
    {
        $params = Params::get();

        if ( ! $params->load_stylesheet)
        {
            RL_Document::style('modals.theme-custom');

            return;
        }

        RL_Document::style('modals.style');

        $themes = self::getThemes();

        foreach ($themes as $theme)
        {
            RL_Document::style('modals.theme-' . $theme);
        }
    }

    private static function removeAllScriptsAndStyles(&$html)
    {
        // Prevent the modals.modal style and script from being removed
        RL_Protect::protectByRegex($html, '<link [^>]*href="[^"]*/(modals/css|css/modals)/modal\..*?>');
        RL_Protect::protectByRegex($html, '<script [^>]*src="[^"]*/(modals/js|js/modals)/modal\..*?>');
        // Prevent the modals.button and modals.popup script from being removed
        RL_Protect::protectByRegex($html, '<script [^>]*src="[^"]*/(modals/js|js/modals)/(button|popup)\..*?>');

        // remove style and script if no items are found
        RL_Document::removeScriptsStyles($html, 'Modals');
        RL_Document::removeScriptsOptions($html, 'Modals');

        RL_Protect::unprotect($html);
    }

    private static function removeUnusedStyles(&$html)
    {
        $all_themes    = self::getThemes();
        $used_themes   = self::getUsedThemes($html);
        $unused_themes = array_diff($all_themes, $used_themes);

        foreach ($unused_themes as $theme)
        {
            RL_Document::removeStyleTag($html, 'modals', 'theme-' . $theme);
        }
    }
}
