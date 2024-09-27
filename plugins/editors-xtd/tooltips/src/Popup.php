<?php
/**
 * @package         Tooltips
 * @version         9.2.2
 * 
 * @author          Peter van Westen <info@regularlabs.com>
 * @link            https://regularlabs.com
 * @copyright       Copyright © 2024 Regular Labs All Rights Reserved
 * @license         GNU General Public License version 2 or later
 */

namespace RegularLabs\Plugin\EditorButton\Tooltips;

defined('_JEXEC') or die;

use RegularLabs\Library\Document as RL_Document;
use RegularLabs\Library\EditorButtonPopup as RL_EditorButtonPopup;

class Popup extends RL_EditorButtonPopup
{
    protected $extension         = 'tooltips';
    protected $require_core_auth = false;

    protected function loadScripts()
    {
        RL_Document::script('regularlabs.regular');
        RL_Document::script('regularlabs.admin-form');
        RL_Document::script('regularlabs.admin-form-descriptions');
        RL_Document::script('tooltips.popup');

        $script = "document.addEventListener('DOMContentLoaded', function(){RegularLabs.TooltipsPopup.init()});";
        RL_Document::scriptDeclaration($script, 'Tooltips Button', true, 'after');
    }
}
