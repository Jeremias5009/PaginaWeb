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

defined('JPATH_BASE') or die;

/**
 * Layout variables
 * -----------------
 *
 * @var   object $displayData
 * @var   string $link
 * @var   string $content
 */

extract($displayData);
?>
<?php echo $link; ?><?php echo $content; ?></a>
