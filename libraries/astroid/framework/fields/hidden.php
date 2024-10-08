<?php
/**
 * @package   Astroid Framework
 * @author    Astroid Framework Team https://astroidframe.work
 * @copyright Copyright (C) 2023 AstroidFrame.work.
 * @license https://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or Later
 */
defined('JPATH_PLATFORM') or die;
use Joomla\CMS\Form\FormField;
/**
 * Form Field class for the Joomla Platform.
 * Provides a hidden field
 *
 * @link   http://www.w3.org/TR/html-markup/input.hidden.html#input.hidden
 * @since  11.1
 */
class JFormFieldHidden extends FormField {

   /**
    * The form field type.
    *
    * @var    string
    * @since  11.1
    */
   protected $type = 'Hidden';

   /**
    * Name of the layout being used to render the field
    *
    * @var    string
    * @since  3.7
    */
   protected $layout = 'joomla.form.field.hidden';

   /**
    * Method to get the field input markup.
    *
    * @return  string  The field input markup.
    *
    * @since   11.1
    */
   protected function getInput() {
      // Trim the trailing line in the layout file
      return rtrim($this->getRenderer($this->layout)->render($this->getLayoutData()), PHP_EOL);
   }

   /**
    * Method to get the data to be passed to the layout for rendering.
    *
    * @return  array
    *
    * @since 3.7
    */
   protected function getLayoutData() {
      $data = parent::getLayoutData();
      $extraData = array(
          'ngShow' => $this->element['ngShow'],
          'ngHide' => $this->element['ngHide'],
          'ngRequired' => $this->element['ngRequired'],
      );
      return array_merge($data, $extraData);
   }

}
