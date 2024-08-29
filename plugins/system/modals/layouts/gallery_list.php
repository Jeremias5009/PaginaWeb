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
 * @var   array  $links
 * @var   array  $hidden_links
 * @var   string $separator
 */

extract($displayData);
?>
<div class="modals_gallery">
    <?php foreach ($links as $i => $link) : ?>
        <?php echo $link; ?>
        <?php if ($separator && $i < count($links) - 1) : ?>
            <?php echo $separator; ?>
        <?php endif; ?>
    <?php endforeach; ?>
    <?php foreach ($hidden_links as $link) : ?>
        <?php echo $link; ?>
    <?php endforeach; ?>
</div>
