<?php
/**
 * @package         Convert Forms
 * @version         4.4.5 Free
 * 
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2024 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

defined('_JEXEC') or die('Restricted access');

extract($displayData);
?>
<div class="tf-notice<?php echo !empty($class) ? ' ' . $class : ''; ?>" role="alert">
	<?php if (isset($icon) && !empty($icon)): ?>
		<svg class="color" xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 40 40"><?php echo $icon; ?></svg>
	<?php endif; ?>
	<div class="content">
		<div class="title"><?php echo isset($title) ? $title : ''; ?></div>
		<?php if (isset($description)): ?>
			<div class="description"><?php echo $description; ?></div>
		<?php endif; ?>
	</div>
	<?php if ($actions): ?>
	<div class="actions"><?php echo $actions; ?></div>
	<?php endif; ?>
	<?php if ($tooltip): ?>
		<div class="notice-tooltip-wrapper">
			<svg class="notice-tooltip-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<mask id="mask0_113_8" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
					<rect width="24" height="24" fill="#D9D9D9"/>
				</mask>
				<g mask="url(#mask0_113_8)">
					<path d="M11.95 18C12.3 18 12.596 17.879 12.838 17.637C13.0793 17.3957 13.2 17.1 13.2 16.75C13.2 16.4 13.0793 16.1043 12.838 15.863C12.596 15.621 12.3 15.5 11.95 15.5C11.6 15.5 11.304 15.621 11.062 15.863C10.8207 16.1043 10.7 16.4 10.7 16.75C10.7 17.1 10.8207 17.3957 11.062 17.637C11.304 17.879 11.6 18 11.95 18ZM11.05 14.15H12.9C12.9 13.6 12.9627 13.1667 13.088 12.85C13.2127 12.5333 13.5667 12.1 14.15 11.55C14.5833 11.1167 14.925 10.704 15.175 10.312C15.425 9.92067 15.55 9.45 15.55 8.9C15.55 7.96667 15.2083 7.25 14.525 6.75C13.8417 6.25 13.0333 6 12.1 6C11.15 6 10.3793 6.25 9.788 6.75C9.196 7.25 8.78333 7.85 8.55 8.55L10.2 9.2C10.2833 8.9 10.471 8.575 10.763 8.225C11.0543 7.875 11.5 7.7 12.1 7.7C12.6333 7.7 13.0333 7.84567 13.3 8.137C13.5667 8.429 13.7 8.75 13.7 9.1C13.7 9.43333 13.6 9.74567 13.4 10.037C13.2 10.329 12.95 10.6 12.65 10.85C11.9167 11.5 11.4667 11.9917 11.3 12.325C11.1333 12.6583 11.05 13.2667 11.05 14.15ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" />
				</g>
			</svg>
			<div class="notice-tooltip">
				<div class="notice-tooltip-arrow"></div>
				<div class="notice-tooltip-inner"><?php echo $tooltip; ?></div>
			</div>
		</div>
	<?php endif; ?>
	<?php if ($dismissible): ?>
		<button type="button" class="close btn-close" data-dismiss="alert" aria-label="Close">
			<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_105_53" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#D9D9D9"/></mask><g mask="url(#mask0_105_53)"><path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" /></g></svg>
		</button>
	<?php endif; ?>
</div>