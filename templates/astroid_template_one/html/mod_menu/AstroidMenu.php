<?php
/**
 * @package   Astroid Framework
 * @author    Astroid Framework https://astroidframe.work
 * @copyright Copyright (C) 2023 AstroidFrame.work.
 * @license https://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
 */
use Joomla\CMS\Helper\ModuleHelper;
defined('_JEXEC') or die;

$id = '';

if ($tagId = $params->get('tag_id', ''))
{
	$id = ' id="' . $tagId . '"';
}

// The menu class is deprecated. Use nav instead
?>
<ul class="nav astroidmenu menu menu-module list-inline d-block<?php echo $class_sfx; ?>"<?php echo $id; ?>>
<?php foreach ($list as $i => &$item)
{
	$class = 'item-' . $item->id;

	if ($item->id == $default_id)
	{
		$class .= ' default';
	}

	if ($item->id == $active_id || ($item->type === 'alias' && $item->getParams()->get('aliasoptions') == $active_id))
	{
		$class .= ' current';
	}

	if (in_array($item->id, $path))
	{
		$class .= ' active';
	}
	elseif ($item->type === 'alias')
	{
		$aliasToId = $item->getParams()->get('aliasoptions');

		if (count($path) > 0 && $aliasToId == $path[count($path) - 1])
		{
			$class .= ' active';
		}
		elseif (in_array($aliasToId, $path))
		{
			$class .= ' alias-parent-active';
		}
	}

	if ($item->type === 'separator')
	{
		$class .= ' divider';
	}

	if ($item->deeper)
	{
		$class .= ' deeper';
	}

	if ($item->parent)
	{
		$class .= ' parent';
	}

	echo '<li class="' . $class . '">';

	switch ($item->type) :
		case 'separator':
		case 'component':
		case 'heading':
		case 'url':
			require ModuleHelper::getLayoutPath('mod_menu', 'default_' . $item->type);
			break;

		default:
			require ModuleHelper::getLayoutPath('mod_menu', 'default_url');
			break;
	endswitch;

	// The next item is deeper.
	if ($item->deeper)
	{
		echo '<ul class="nav-child unstyled">';
	}
	// The next item is shallower.
	elseif ($item->shallower)
	{
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else
	{
		echo '</li>';
	}
}
?></ul>