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

namespace RegularLabs\Plugin\System\Tooltips;

defined('_JEXEC') or die;

use ContentHelperRoute;
use Joomla\CMS\Router\Route as JRoute;
use Joomla\CMS\Uri\Uri as JUri;
use RegularLabs\Library\ObjectHelper as RL_Object;
use RegularLabs\Library\PluginTag as RL_PluginTag;
use RegularLabs\Library\RegEx as RL_RegEx;
use RegularLabs\Library\StringHelper as RL_String;

class Tooltip
{
    public static function get($attributes, $text)
    {
        $settings = self::getSettings($attributes);

        if ( ! empty($settings->title))
        {
            self::fixUrls($settings->title);
        }

        if ( ! empty($settings->content))
        {
            self::fixUrls($settings->content);
        }

        if ( ! empty($settings->content) && self::isImage($settings->content))
        {
            $settings->{'is-image'} = true;
        }

        return
            '<span ' . Data::flattenMixedAttributeList($settings) . '>'
            . $text
            . '</span>';
    }

    private static function fixUrls(&$string)
    {
        if (empty($string) || ! str_contains($string, '="'))
        {
            return;
        }

        // JRoute internal links
        RL_RegEx::matchAll('href="([^"]*)"', $string, $url_matches);

        if ( ! empty($url_matches))
        {
            foreach ($url_matches as $url_match)
            {
                $url    = 'href="' . JRoute::_($url_match[1]) . '"';
                $string = str_replace($url_match[0], $url, $string);
            }
        }

        // Add root to internal image sources
        RL_RegEx::matchAll('src="([^"]*)"', $string, $url_matches);

        if ( ! empty($url_matches))
        {
            foreach ($url_matches as $url_match)
            {
                $url = $url_match[1];

                if ( ! str_starts_with($url, 'http'))
                {
                    $url = JUri::root() . $url;
                }

                $url    = 'src="' . $url . '"';
                $string = str_replace($url_match[0], $url, $string);
            }
        }
    }

    private static function getSettings($attributes)
    {
        $params = Params::get();

        // Get the values from the tag
        $settings = RL_PluginTag::getAttributesFromString(
            $attributes,
            'url',
            $params->booleans,
            'dash'
        );

        $settings->theme = RL_String::toDashCase($settings->theme ?? $params->theme, true);

        if (isset($settings->position) && ! in_array($settings->position, ['top', 'bottom', 'left', 'right']))
        {
            unset($settings->position);
        }

        return RL_Object::replaceKeys($settings, $params->key_aliases);
    }

    private static function isImage($string)
    {
        return RL_RegEx::match('^\s*(&lt;|<)img [^>]*(&gt;|>)\s*$', $string);
    }
}
