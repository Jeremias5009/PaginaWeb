<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_sis_videogrid
 *
 * @copyright	Copyright © 2023 - All rights reserved.
 * @license		GNU General Public License v2.0
 * @author 		Sergio Iglesias (@sergiois)
 */

defined('_JEXEC') or die;

$showVideo = reset($videos);
$default_video = $showVideo->id_video;
if($params->get('default_video'))
{
    $default_video = $params->get('default_video');
}
?>
<div id="sisvideogrid" class="row <?php echo $module->module.$module->id; ?>">
<div class="col-md-12">
<div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/<?php echo $default_video; ?>" id="sis_player" class="embed-responsive-item" allowfullscreen="allowfullscreen" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>
</div>
<div class="col-md-12">
<div id="sis_videogrid" class="horizontal">
<?php
foreach($videos as $num => $video)
{
    $class = '';
    if($video->id_video == $default_video){ $class = 'active'; }
    echo '<div class="sis_video '.$class.'"><img src="'.$video->image.'" alt="Vídeo" data-div="'.$module->module.$module->id.'" data-video="'.$video->id_video.'"></div>';
}
?>
</div>
</div>
</div>