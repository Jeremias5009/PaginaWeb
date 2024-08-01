<?php
/**
 * Dropfiles
 *
 * We developed this code with our hearts and passion.
 * We hope you found it useful, easy to understand and to customize.
 * Otherwise, please feel free to contact us at contact@joomunited.com *
 *
 * @package   Dropfiles
 * @copyright Copyright (C) 2013 JoomUnited (http://www.joomunited.com). All rights reserved.
 * @copyright Copyright (C) 2013 Damien Barrère (http://www.crac-design.com). All rights reserved.
 * @license   GNU General Public License version 2 or later; http://www.gnu.org/licenses/gpl-2.0.html
 */

// no direct access
defined('_JEXEC') || die;

$path_root_hacategory = JPATH_ROOT . DIRECTORY_SEPARATOR . 'administrator' . DIRECTORY_SEPARATOR . 'components';
$path_root_hacategory .= DIRECTORY_SEPARATOR . 'com_dropfiles' . DIRECTORY_SEPARATOR . 'controllers';
$path_root_hacategory .= DIRECTORY_SEPARATOR . 'category.php';
// side effect: loads category
require_once($path_root_hacategory);