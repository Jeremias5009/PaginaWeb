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

use RegularLabs\Library\ArrayHelper as RL_Array;
use RegularLabs\Library\Parameters as RL_Parameters;
use RegularLabs\Library\PluginTag as RL_PluginTag;
use RegularLabs\Library\RegEx as RL_RegEx;
use RegularLabs\Library\StringHelper as RL_String;

class Params
{
    protected static $params  = null;
    protected static $regexes = null;

    public static function fillMediaSettings(&$settings)
    {
        $params = self::get();

        $defaults = [
            'images'                     => '',
            'thumbnails'                 => '',
            'first'                      => '',
            'title'                      => null,
            'alt'                        => null,
            'description'                => null,
            'width'                      => 0,
            'height'                     => 0,
            'gallery-include-subfolders' => false,
        ];


        $settings->class = $settings->class ?? '';

        foreach ($params as $key => $value)
        {
            $key = RL_String::toDashCase($key);

            if (isset($settings->{$key}))
            {
                continue;
            }

            $settings->{$key} = $value;
        }

        foreach ($defaults as $key => $value)
        {
            if (isset($settings->{$key}))
            {
                continue;
            }

            $settings->{$key} = $value;
        }

        if ( ! empty($settings->thumbnails))
        {
            return;
        }

        $settings->thumbnails = $settings->{'gallery-showall'} ? 'all' : 1;
    }

    public static function get()
    {
        if ( ! is_null(self::$params))
        {
            return self::$params;
        }

        $params = RL_Parameters::getPlugin('modals');

        $params->tag = RL_PluginTag::clean($params->tag);

        // array_filter will remove any empty values
        $params->classnames = $params->autoconvert_classnames ? RL_Array::toArray(str_replace(' ', ',', trim($params->classnames))) : [];
        $params->mediafiles = RL_Array::toArray(strtolower($params->mediafiles));

        $params->booleans = [
            'auto-titles',
            'fullpage',
            'iframe',
            'inline',
            'open-once',
        ];

        $params->key_aliases = [
            'url'                        => ['href', 'link', 'src'],
            'classname'                  => ['class-name'],
        ];

        $params->valid_attribute_keys = [
            'alt',
            'class',
            'href',
            'id',
            'rel',
            'title',
            'itemscope',
        ];

        $params->include_empty_attributes = [
            'alt',
            'data-title',
            'title',
        ];

        $params->valid_data_keys = [
            'data-class',
            'data-title',
            'description',
            'description-position',
            'height',
            'legacy',
            'srcset',
            'theme',
            'title',
            'title-position',
            'width',
            'type',
        ];

        self::$params = $params;

        return self::$params;
    }

    public static function getRegex($type = 'tag')
    {
        $regexes = self::getRegexes();

        return $regexes->{$type} ?? $regexes->tag;
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

    public static function getTagWords()
    {
        $params = self::get();

        return [
            $params->tag,
        ];
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

    private static function getRegexes()
    {
        if ( ! is_null(self::$regexes))
        {
            return self::$regexes;
        }

        $params = self::get();

        // Tag character start and end
        [$tag_start, $tag_end] = Params::getTagCharacters();

        $pre        = RL_PluginTag::getRegexSurroundingTagsPre();
        $post       = RL_PluginTag::getRegexSurroundingTagsPost();
        $inside_tag = RL_PluginTag::getRegexInsideTag($tag_start, $tag_end);

        $tag_start = RL_RegEx::quote($tag_start);
        $tag_end   = RL_RegEx::quote($tag_end);

        $spaces      = RL_PluginTag::getRegexSpaces();
        $spaces_none = RL_PluginTag::getRegexSpaces('*');

        $a_tag        = RL_PluginTag::getRegexTags('a', false, false);
        $spans_images = RL_PluginTag::getRegexTags(['span', 'i', 'img']);
        $any_text = '[^<>]*';

        self::$regexes = (object) [];

        self::$regexes->tag =
            '(?<start_pre>' . $pre . ')'
            . $tag_start . $params->tag . $spaces . '(?<data>' . $inside_tag . ')' . $tag_end
            . '(?<start_post>' . $post . ')'

            . '(?<pre>' . $pre . ')'
            . '(?<text>.*?)'
            . '(?<post>' . $post . ')'

            . '(?<end_pre>' . $pre . ')'
            . $tag_start . '\/' . $params->tag . $tag_end
            . '(?<end_post>' . $post . ')';

        self::$regexes->inlink =
            '(?<link_start>' . $a_tag . ')'
            . '(?<pre>' . $any_text . ')'

            . '(?<image_pre>(?:' . $spans_images . $any_text . '){0,6})'

            . $tag_start . $params->tag . $spaces_none . '(?<data>' . $inside_tag . ')' . $tag_end

            . '(?<text>.*?)'

            . $tag_start . '\/' . $params->tag . $tag_end

            . '(?<image_post>(?:' . $any_text . $spans_images . '){0,6})'

            . '(?<post>' . $any_text . ')'
            . '(?<link_end></a>)';

        self::$regexes->link = $a_tag;


        return self::$regexes;
    }
}
