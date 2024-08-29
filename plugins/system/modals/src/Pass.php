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

use RegularLabs\Library\File as RL_File;
use RegularLabs\Library\RegEx as RL_RegEx;
use RegularLabs\Library\StringHelper as RL_String;

class Pass
{
    public static function passClassnames($attributes)
    {
        $params = Params::get();

        if (empty($attributes->class))
        {
            return false;
        }

        return self::arrayInArray($attributes->class, $params->classnames);
    }

    public static function passExternal($attributes)
    {
    }

    public static function passLinkChecks($attributes)
    {
        // return if the link has no href
        if (empty($attributes->href))
        {
            return false;
        }

        $params = Params::get();

        // return if url is in ignore list
        if (self::urlIgnored($attributes->href))
        {
            return false;
        }

        // return if the link already has a data-modals-modal attribute
        if ( ! empty($attributes->{'data-modals-modal'}))
        {
            return false;
        }

        // check for classnames, external sites and target blanks
        if (
            self::passClassnames($attributes)
        )
        {
            return true;
        }


        return false;
    }

    public static function passTarget($attributes)
    {
    }

    public static function urlIgnored($url)
    {
        $params = Params::get();

        if (empty($params->exclude_urls))
        {
            return false;
        }

        $exclude_urls = explode(',', str_replace(['\n', ' '], [',', ''], $params->exclude_urls));

        foreach ($exclude_urls as $exclude)
        {
            if ($exclude && (str_contains($url, $exclude) || str_contains(htmlentities($url), $exclude)))
            {
                return true;
            }
        }

        return false;
    }

    private static function arrayInArray($needles, $haystack)
    {
        if ( ! is_array($needles))
        {
            $needles = explode(' ', trim($needles));
        }

        if ( ! is_array($haystack))
        {
            $haystack = explode(' ', trim($haystack));
        }

        // Check
        return (boolean) array_intersect($haystack, $needles);
    }

    private static function passURL($url, $param_url)
    {
    }

    private static function passURLRegex($url, $param_url)
    {
    }

    private static function passURLs($url)
    {
    }
}
