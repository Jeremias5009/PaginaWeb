<?php

/**
 * @package         Convert Forms
 * @version         4.4.3 Free
 * 
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2023 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

namespace ConvertForms\Field;

defined('_JEXEC') or die('Restricted access');

class Password extends \ConvertForms\Field\Text
{
	protected $inheritInputLayout = 'text';
}