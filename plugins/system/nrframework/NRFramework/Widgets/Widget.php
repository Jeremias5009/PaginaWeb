<?php

/**
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2024 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
 */

namespace NRFramework\Widgets;

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Session\Session;

class Widget
{
	protected $widget_options = [];
	
	/**
	 * Widget's default options
	 *
	 * @var array
	 */
	protected $options = [
		// Set whether to load the CSS variables
		'load_css_vars' => true,

		// Set whether to load the default stylesheet
		'load_stylesheet' => true,

		// If true, the widget will be rended in read-only mode.
		'readonly' => false,

		// If true, the widget will be rended in disabled mode.
		'disabled' => false,

		// Indicates the widget's input field must be filled out before submitting the form.
		'required' => false,

		// The CSS class to be used on the widget's wrapper
		'css_class' => '',

		// The CSS class to be used on the input
		'input_class' => '',

		// The input name
		'name' => '',

		// The default widget value
		'value' => '',
		
		// Extra attributes
		'atts' => '',
		
		// Custom CSS
		'custom_css' => '',

		// A short hint that describes the expected value
		'placeholder' => '',

		// The name of the layout to be used to render the widget
		'layout' => 'default',

		// The extension name where the widget is loaded from.
		'extension' => '',

		// The aria-label attribute
		'aria_label' => '',
		
		// Whether we are rendering the Pro version of the widget
		'pro' => false
	];

	/**
	 * If no name is provided, this counter is appended to the widget's name to prevent name conflicts 
	 *
	 * @var int
	 */
	protected static $counter = 0;

	/**
	 * Class constructor
	 *
	 * @param array $options
	 */
	public function __construct($options = [])
	{
		// Merge Widget class default options with given Widget default options
		$this->options = array_merge($this->options, $this->widget_options, $options);

		// Set ID if none given
		if (!isset($this->options['id']))
		{
			$this->options['id'] = $this->getName() . self::$counter;
		}

		// Help developers target the whole widget by applying the widget's ID to the CSS class list.
		// Do not use the id="xx" attribute in the HTML to prevent conflicts with the input's ID.
		$this->options['css_class'] .= ' ' . $this->options['id'];
		
		// Set name if none given
		if (!isset($this->options['name']))
		{
			$this->options['name'] = $this->options['id'];
		}
		
		// Set disabled class if widget is disabled
		if ($this->options['disabled'])
		{
			$this->options['css_class'] .= ' disabled';
		}

		self::$counter++;
	}

	/**
	 * Renders the widget with the given layout
	 * 
	 * Layouts can be overriden in the following folder: /templates/TEMPLATE_NAME/html/tassos/WIDGET_NAME/LAYOUT_NAME.php
	 * 
	 * @return  string
	 */
	public function render()
	{
		$defaultPath  = implode(DIRECTORY_SEPARATOR, [JPATH_PLUGINS, 'system', 'nrframework', 'layouts']);
		$overridePath = implode(DIRECTORY_SEPARATOR, [JPATH_THEMES, Factory::getApplication()->getTemplate(), 'html', 'tassos']);

		$layout = new FileLayout('widgets.' . $this->getName() . '.' . $this->options['layout'], null, ['debug' => false]);
		$layout->addIncludePaths($defaultPath);
		$layout->addIncludePaths($overridePath);

		return $layout->render($this->options);
	}

	/**
	 * Get the name of the widget
	 *
	 * @return void
	 */
	public function getName()
	{
		return strtolower((new \ReflectionClass($this))->getShortName());
	}

	/**
	 * Returns the options key value.
	 * 
	 * @param   string  $key
	 * 
	 * @return  mixed
	 */
	public function getOption($key)
	{
		return isset($this->options[$key]) ? $this->options[$key] : null;
	}

	/**
	 * Manages ajax requests for the widget.
	 * 
	 * @param   string  $task
	 * 
	 * @return  void
	 */
	public function onAjax($task)
	{
        Session::checkToken('request') or die('Invalid Token');

		if (!$task || !is_string($task))
		{
			return;
		}

		$method = 'ajax_' . $task;

		if (!method_exists($this, $method))
		{
			return;
		}

		$this->$method();
	}
	
	/**
	 * Sets the options key value.
	 * 
	 * @param   string  $key
	 * 
	 * @return  void
	 */
	public function setOption($key, $value)
	{
		$this->options[$key] = $value;
	}

	/**
	 * Checks if an option exists.
	 * 
	 * @param   string  $key
	 * 
	 * @return  bool
	 */
	public function optionExists($key)
	{
		return isset($this->options[$key]);
	}
}