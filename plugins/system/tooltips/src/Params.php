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

use RegularLabs\Library\Parameters as RL_Parameters;
use RegularLabs\Library\PluginTag as RL_PluginTag;
use RegularLabs\Library\RegEx as RL_RegEx;

class Params
{
    protected static $params = null;
    protected static $regex  = null;

    public static function get()
    {
        if ( ! is_null(self::$params))
        {
            return self::$params;
        }

        $params = RL_Parameters::getPlugin('tooltips');

        $params->tag = RL_PluginTag::clean($params->tag);

        $params->key_aliases = [
            'content' => ['text'],
        ];
        $params->booleans    = [];

        $params->valid_html_attributes = [
            'class',
        ];

        $params->valid_data_keys = [
            'content',
            'title',
            'theme',
            'style',
            'class',
            'is-image',
            'is-image-link',
        ];

        self::$params = $params;

        return self::$params;
    }

    public static function getRegex()
    {
        if ( ! is_null(self::$regex))
        {
            return self::$regex;
        }

        $params = self::get();

        [$tag_start, $tag_end] = Params::getTagCharacters();

        $inside_tag = RL_PluginTag::getRegexInsideTag($tag_start, $tag_end);

        $tag_start = RL_RegEx::quote($tag_start);
        $tag_end   = RL_RegEx::quote($tag_end);

        $spaces = RL_PluginTag::getRegexSpaces();

        self::$regex =
            $tag_start . RL_RegEx::quote($params->tag) . '(?<tip>(?:' . $spaces . '|<)' . $inside_tag . ')' . $tag_end
            . '(?<text>.*?)'
            . $tag_start . '/' . RL_RegEx::quote($params->tag) . $tag_end;

        return self::$regex;
    }

    public static function getSettings()
    {
        $params = self::get();

        $settings = [];

        foreach ($params as $key => $value)
        {
            $key = str_replace('_', '-', $key);

            $settings[$key] = $value;
        }

        return (object) $settings;
    }

    public static function getTagCharacters()
    {
        $params = self::get();

        if ( ! isset($params->tag_character_start))
        {
            self::setTagCharacters();
        }

        return [$params->tag_character_start, $params->tag_character_end];
    }

    public static function getTags($only_start_tags = false)
    {
        $params = self::get();

        [$tag_start, $tag_end] = self::getTagCharacters();

        $tags = [
            [
                $tag_start . $params->tag,
            ],
            [
                $tag_start . '/' . $params->tag . $tag_end,
            ],
        ];

        return $only_start_tags ? $tags[0] : $tags;
    }

    public static function setTagCharacters()
    {
        $params = self::get();

        [self::$params->tag_character_start, self::$params->tag_character_end] = explode('.', $params->tag_characters);
    }
}
