<?php
/*
 * Copyright (C) joomla-monster.com
 * Website: http://www.joomla-monster.com
 * Support: info@joomla-monster.com
 *
 * JM Team Profiles is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JM Team Profiles is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JM Team Profiles. If not, see <http://www.gnu.org/licenses/>.
*/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

$row_number = ( $elements > $span_size ) ? $span_size : $elements;

?>

<div id="<?php echo $id; ?>" class="jmm-team-profiles <?php echo $theme_class . ' ' . $mod_class_suffix; ?>">
	<div class="jmm-team-profiles-in">
		<div class="jmm-mod-row row-<?php echo $row_number; ?>">
				<?php

				foreach($output_data as $item) {

					$alt = ( !empty($item->alt) ) ? $item->alt  : '';
					$img_class = ( !empty($avatar_style) ) ? $avatar_style : '';

				?>

				<div class="jmm-item">

					<?php if( $item->image_file ) : ?>
						<div class="jmm-avatar">
							<?php if( !empty($item->item_url) && $avatar_link ) {
								echo '<a href="' . $item->item_url . '">';
							} ?>
							<span class="jmm-img <?php echo $img_class; ?>"><img src="<?php echo $item->image_file; ?>" alt="<?php echo $alt; ?>"></span>
							<?php if( !empty($item->item_url) && $avatar_link ) {
								echo '</a>';
							} ?>
						</div>
					<?php endif; ?>

					<?php if( $item->name ) : ?>
						<div class="jmm-name">
							<?php if( !empty($item->item_url) ) {
								echo '<a href="' . $item->item_url . '">';
							}
							echo $item->name;
							if( !empty($item->item_url) ) {
								echo '</a>';
							}
							?>
						</div>
					<?php endif; ?>

					<?php if( $item->profession ) : ?>
						<div class="jmm-profession">
							<?php echo $item->profession; ?>
						</div>
					<?php endif; ?>

					<?php if( ($item->social1_icon && $item->social1_url) || ($item->social2_icon && $item->social2_url) || ($item->social3_icon && $item->social3_url) ) : ?>
						<div class="jmm-social">
							<ul class="jmm-list">
								<?php if( $item->social1_icon && $item->social1_url ) : ?>
									<li class="jmm-item"><a class="jmm-link" href="<?php echo $item->social1_url; ?>" aria-label="<?php echo JText::_('MOD_JM_TEAM_PROFILES_FIELD_SOCIAL1_LABEL'); ?>"><span class="jmm-ico <?php echo $item->social1_icon; ?>" aria-hidden="true"></span></a></li>
								<?php endif; ?>

								<?php if( $item->social2_icon && $item->social2_url ) : ?>
									<li class="jmm-item"><a class="jmm-link" href="<?php echo $item->social2_url; ?>" aria-label="<?php echo JText::_('MOD_JM_TEAM_PROFILES_FIELD_SOCIAL2_LABEL'); ?>"><span class="jmm-ico <?php echo $item->social2_icon; ?>" aria-hidden="true"></span></a></li>
								<?php endif; ?>

								<?php if( $item->social3_icon && $item->social3_url ) : ?>
									<li class="jmm-item"><a class="jmm-link" href="<?php echo $item->social3_url; ?>" aria-label="<?php echo JText::_('MOD_JM_TEAM_PROFILES_FIELD_SOCIAL3_LABEL'); ?>"><span class="jmm-ico <?php echo $item->social3_icon; ?>" aria-hidden="true"></span></a></li>
								<?php endif; ?>
							</ul>
						</div>
					<?php endif; ?>

					<?php if( !empty($item->desc) ) : ?>
						<div class="jmm-desc">
							<?php echo $item->desc; ?>
						</div>
					<?php endif; ?>

				</div>

				<?php

				}

				?>
		</div>
	</div>
</div>
