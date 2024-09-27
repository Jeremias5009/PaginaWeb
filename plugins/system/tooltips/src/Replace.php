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

use RegularLabs\Library\Html as RL_Html;
use RegularLabs\Library\Protect as RL_Protect;
use RegularLabs\Library\RegEx as RL_RegEx;
use RegularLabs\Library\StringHelper as RL_String;

class Replace
{
    public static function replaceTags(&$string, $area = 'article', $context = '')
    {
        if ( ! is_string($string) || $string == '')
        {
            return false;
        }

        // Check if tags are in the text snippet used for the search component
        if (str_starts_with($context, 'com_search.'))
        {
            $limit = explode('.', $context, 2);
            $limit = (int) array_pop($limit);

            $string_check = substr($string, 0, $limit);

            if ( ! RL_String::contains($string_check, Params::getTags(true)))
            {
                return false;
            }
        }

        $params = Params::get();

        RL_Protect::removeFromHtmlTagAttributes(
            $string,
            [
                $params->tag,
            ]
        );

        // allow in component?
        if (RL_Protect::isRestrictedComponent($params->disabled_components ?? [], $area))
        {

            Protect::_($string);

            $regex  = Params::getRegex();
            $string = RL_RegEx::replace($regex, '\2', $string);

            RL_Protect::unprotect($string);

            return true;
        }

        Protect::_($string);

        [$start_tags, $end_tags] = Params::getTags();

        [$pre_string, $string, $post_string] = RL_Html::getContentContainingSearches(
            $string,
            $start_tags,
            $end_tags
        );

        self::replaceSyntax($string);

        $string = $pre_string . $string . $post_string;

        RL_Protect::unprotect($string);

        return true;
    }

    private static function replaceSyntax(&$string)
    {
        $regex = Params::getRegex();

        RL_RegEx::matchAll($regex, $string, $matches);

        if (empty($matches))
        {
            return;
        }

        $params = Params::get();

        foreach ($matches as $match)
        {
            $html = Tooltip::get($match['tip'], $match['text']);

            if ($params->place_comments)
            {
                $html = Protect::wrapInCommentTags($html);
            }

            $string = str_replace($match[0], $html, $string);
        }
    }
}
