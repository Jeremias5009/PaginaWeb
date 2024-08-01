<?php
/**
 * @copyright	Copyright © 2023 - All rights reserved.
 * @license		GNU General Public License v2.0
 * @author 		Sergio Iglesias (@sergiois)
 */

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\HTML\HTMLHelper;

defined('_JEXEC') or die;

$videos	= $params->get("videos");
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'), ENT_COMPAT, 'UTF-8');

if(count((array)$videos)):
    HTMLHelper::_('jquery.framework');
    HTMLHelper::_('script', 'modules/mod_sis_videogrid/assets/js/sis_videogrid.js');
    HTMLHelper::_('stylesheet', 'modules/mod_sis_videogrid/assets/css/sis_videogrid.css');
    require ModuleHelper::getLayoutPath('mod_sis_videogrid', $params->get('type_view','default'));
endif;