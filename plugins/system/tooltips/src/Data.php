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

use RegularLabs\Library\RegEx as RL_RegEx;

class Data
{

    public static function createDataAttribute($key, $value)
    {
        $key = RL_RegEx::replace('^data-', '', $key);

        return 'data-tooltips-' . $key . '="' . $value . '"';
    }

    public static function createTagAttribute($key, $value)
    {
        if (in_array($key, ['title', 'alt']))
        {
            $value = htmlentities(strip_tags($value));
        }

        return $key . '="' . $value . '"';
    }

    public static function flattenAttributeList($attributes)
    {
        $params = Params::get();

        $string = '';

        foreach ($attributes as $key => $value)
        {
            $key = trim($key);

            // Ignore attributes when key is empty
            if ($key == '')
            {
                continue;
            }

            $value = trim($value);

            // Ignore attributes when value is empty, but not a title or alt attribute
            if ($value == '' && ! in_array($key, ['alt', 'title']))
            {
                continue;
            }

            if (is_bool($value) && in_array($key, $params->booleans))
            {
                $value = $value ? 'true' : 'false';
            }

            $string .= ' ' . $key . '="' . $value . '"';
        }

        return $string;
    }

    public static function flattenMixedAttributeList($settings)
    {
        $params = Params::get();

        $html_attributes = [];
        $data_attributes = [];

        foreach ($settings as $key => $value)
        {
            $key = trim($key);

            $value = self::prepareAttributeValue($key, $value);

            if (is_null($value))
            {
                continue;
            }

            if (in_array($key, $params->valid_html_attributes))
            {
                $html_attributes[] = self::createTagAttribute($key, $value);
            }

            if (in_array($key, $params->valid_data_keys))
            {
                $i = array_search($key, $params->valid_data_keys);

                $data_attributes[$i] = self::createDataAttribute($key, $value);
            }
        }

        ksort($data_attributes);

        $attributes = array_merge($html_attributes, ['data-tooltips'], $data_attributes);

        return implode(' ', array_unique($attributes));
    }

    public static function prepareAttributeValue($key, $value)
    {
        $params = Params::get();

        if (is_bool($value) && in_array($key, $params->booleans))
        {
            $value = $value ? 'true' : 'false';
        }

        $value = trim($value);

        if ($value == '')
        {
            return null;
        }

        return str_replace('"', '&quot;', $value);
    }
}
