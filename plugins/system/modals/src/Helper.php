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

use Joomla\CMS\Layout\FileLayout as JFileLayout;
use RegularLabs\Library\Layout;

defined('_JEXEC') or die;

class Helper
{
    static $layout_path = JPATH_PLUGINS . '/system/modals/layouts';
    static $layouts     = [];

    public static function addClassName($class, $class_name)
    {
        if (empty($class_name))
        {
            return $class;
        }

        $classes     = explode(' ', $class);
        $class_names = explode(' ', $class_name);

        foreach ($class_names as $class_name)
        {
            if (empty($class_name) || in_array($class_name, $classes))
            {
                continue;
            }

            $classes[] = $class_name;
        }

        return implode(' ', $classes);
    }

    public static function createInlineContentBlock($content, $id = null)
    {
        $id = $id ?: uniqid('modal_') . rand(1000, 9999);

        return [
            '<div style="display:none;">'
            . '<div id="' . $id . '">'
            . $content
            . '</div></div>',
            $id,
        ];
    }

    public static function removeClassname($class, $class_name)
    {
        if (empty($class_name))
        {
            return $class;
        }

        $classes     = explode(' ', $class);
        $class_names = explode(' ', $class_name);

        $classes = array_diff($classes, $class_names);

        return implode(' ', $classes);
    }

    public static function getLayout($layout_id)
    {
        return Layout::get($layout_id, self::$layout_path, 'modals');
    }
}
