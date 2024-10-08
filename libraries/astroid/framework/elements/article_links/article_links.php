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

use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
$item = $options['article'];

// Create shortcut
$urls = json_decode($item->article->urls);

// Create shortcuts to some parameters.
$params = $item->article->params;
if ($urls && (!empty($urls->urla) || !empty($urls->urlb) || !empty($urls->urlc))) :
    ?>
    <div class="content-links">
        <ul class="menu list-inline">
            <?php
            $urlarray = array(
                array($urls->urla, $urls->urlatext, $urls->targeta, 'a'),
                array($urls->urlb, $urls->urlbtext, $urls->targetb, 'b'),
                array($urls->urlc, $urls->urlctext, $urls->targetc, 'c')
            );
            foreach ($urlarray as $url) :
                $link = $url[0];
                $label = $url[1];
                $target = $url[2];
                $id = $url[3];

                if ( ! $link) :
                    continue;
                endif;

                // If no label is present, take the link
                $label = $label ?: $link;

                // If no target is present, use the default
                $target = $target ?: $params->get('target' . $id);
                ?>
                <li class="content-links-<?php echo $id; ?>">
                    <?php
                    // Compute the correct link

                    switch ($target)
                    {
                        case 1:
                            // Open in a new window
                            echo '<a href="' . htmlspecialchars($link, ENT_COMPAT, 'UTF-8') . '" target="_blank" rel="nofollow noopener noreferrer">' .
                                htmlspecialchars($label, ENT_COMPAT, 'UTF-8') . '</a>';
                            break;

                        case 2:
                            // Open in a popup window
                            $attribs = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600';
                            echo "<a href=\"" . htmlspecialchars($link, ENT_COMPAT, 'UTF-8') . "\" onclick=\"window.open(this.href, 'targetWindow', '" . $attribs . "'); return false;\" rel=\"noopener noreferrer\">" .
                                htmlspecialchars($label, ENT_COMPAT, 'UTF-8') . '</a>';
                            break;
                        case 3:
                            // Open in a modal window
                            echo '<a href="' . htmlspecialchars($link, ENT_COMPAT, 'UTF-8') . '" rel="noopener noreferrer" data-bs-toggle="modal" data-bs-target="#linkModal">' .
                                htmlspecialchars($label, ENT_COMPAT, 'UTF-8') . ' </a>';
                            echo HTMLHelper::_(
                                'bootstrap.renderModal',
                                'linkModal',
                                [
                                    'url'    => $link,
                                    'title'  => $label,
                                    'height' => '100%',
                                    'width'  => '100%',
                                    'modalWidth'  => '500',
                                    'bodyHeight'  => '500',
                                    'footer' => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-hidden="true">'
                                        . \Joomla\CMS\Language\Text::_('JLIB_HTML_BEHAVIOR_CLOSE') . '</button>'
                                ]
                            );
                            break;

                        default:
                            // Open in parent window
                            echo '<a href="' . htmlspecialchars($link, ENT_COMPAT, 'UTF-8') . '" rel="nofollow">' .
                                htmlspecialchars($label, ENT_COMPAT, 'UTF-8') . ' </a>';
                            break;
                    }
                    ?>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>