<?php

/**
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2024 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
 */

defined('_JEXEC') or die('Restricted access');

use Joomla\CMS\Form\FormRule;

class JFormRuleNRDate extends FormRule
{
	public function test(SimpleXMLElement $element, $value, $group = null, Joomla\Registry\Registry $input = null, Joomla\CMS\Form\Form $form = null)
	{
		if (!$value = trim($value))
		{
			return true;
		}

		$format = (string) $element->attributes()->timeformat;

		return $this->validateDate($value, $format);
	}

	/**
	 * Validates the given date with the given format
	 * 
	 * @param   string  $date
	 * @param   string  $format
	 * 
	 * @return  boolean
	 */
	private function validateDate($date, $format = 'Y-m-d')
	{
		$d = DateTime::createFromFormat($format, $date);
		return $d && $d->format($format) === $date;
	}
}