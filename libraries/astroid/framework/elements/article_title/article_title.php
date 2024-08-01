<?php

/**
 * @package   Astroid Framework
 * @author    Astroid Framework Team https://astroidframe.work
 * @copyright Copyright (C) 2023 AstroidFrame.work.
 * @license https://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
 * DO NOT MODIFY THIS FILE DIRECTLY AS IT WILL BE OVERWRITTEN IN THE NEXT UPDATE
 * You can easily override all files under /astroid/ folder.
 * Just copy the file to JROOT/media/templates/site/YOUR_ASTROID_TEMPLATE/astroid/elements/module_position/module_position.php folder to create and override
 */

// No direct access.
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\Component\Content\Administrator\Extension\ContentComponent;

extract($displayData);
$item = $options['article'];
$params = $item->article->params;
$htag    = $params->get('show_page_heading') ? 'h2' : 'h1';
$currentDate       = Factory::getDate()->format('Y-m-d H:i:s');
$isNotPublishedYet = $item->article->publish_up > $currentDate;
$isExpired         = !is_null($item->article->publish_down) && $item->article->publish_down < $currentDate;
$canEdit = $params->get('access-edit');
if ($params->get('show_title')) {
    echo '<'.$htag.'>'.$item->article->title.'</'.$htag.'>';
    if ($item->article->state == ContentComponent::CONDITION_UNPUBLISHED) {
        echo '<span class="badge bg-warning text-light">'.Text::_('JUNPUBLISHED').'</span>';
    }
    if ($isNotPublishedYet) {
        echo '<span class="badge bg-warning text-light">'.Text::_('JNOTPUBLISHEDYET').'</span>';
    }
    if ($isExpired) {
        echo '<span class="badge bg-warning text-light">'.Text::_('JEXPIRED').'</span>';
    }
}
if ($canEdit) {
    echo LayoutHelper::render('joomla.content.icons', ['params' => $params, 'item' => $item->article]);
}
// Content is generated by content plugin event "onContentAfterTitle"
echo $item->article->event->afterDisplayTitle;