<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);

/**
 * Layout variables
 * ---------------------
 * 	$options         : (array)  Optional parameters
 * 	$label           : (string) The html code for the label (not required if $options['hiddenLabel'] is true)
 * 	$input           : (string) The input field html code
 */

if (!empty($options['showonEnabled']))
{
	HTMLHelper::_('jquery.framework');
	HTMLHelper::_('script', 'jui/cms.js', ['version' => 'auto', 'relative' => true]);
}

$class = empty($options['class']) ? '' : ' ' . $options['class'];
$rel   = empty($options['rel']) ? '' : ' ' . $options['rel'];

?>

<?php if ($input != '</div>') { ?>
	<div class="well nr-well <?php echo $class; ?>"<?php echo $rel; ?>>
<?php } ?>

<?php echo $input; ?>