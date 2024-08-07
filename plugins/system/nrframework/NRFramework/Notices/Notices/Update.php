<?php

/**
 * @author          Tassos Marinos <info@tassos.gr>
 * @link            https://www.tassos.gr
 * @copyright       Copyright © 2024 Tassos All Rights Reserved
 * @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
 */

namespace NRFramework\Notices\Notices;

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use \NRFramework\Extension;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Session\Session;

class Update extends Notice
{
	protected $notice_payload = [
		'type' => 'success',
		'class' => 'update',
		'current_version' => '',
		'latest_version' => ''
	];

	public function __construct($payload = [])
	{
		parent::__construct($payload);

		$this->payload['current_version'] = Extension::getVersion($this->payload['ext_xml']);
		$this->payload['latest_version']  = Extension::getLatestVersion($this->payload['ext_xml']);
	}

	/**
	 * Notice title.
	 * 
	 * @return  string
	 */
	protected function getTitle()
	{
		return sprintf(Text::_('NR_EXTENSION_NEW_VERSION_IS_AVAILABLE'), $this->extension_name . ' v' . $this->payload['latest_version']);
	}

	/**
	 * Notice description.
	 * 
	 * @return  string
	 */
	protected function getDescription()
	{
		return sprintf(Text::_('NR_EXTENSION_NOTICE_DESC'), $this->extension_name);
	}
	
	/**
	 * Notice actions.
	 * 
	 * @return  string
	 */
	protected function getActions()
	{
		$url = Extension::getProductURL($this->payload['ext_xml']) . '/changelog';
		
		return '<span class="orange-text text-bold">' . sprintf(Text::_('NR_YOUR_USING_VERSION'), $this->payload['current_version']) . '</span>
					<a href="' . \NRFramework\Functions::getUTMURL($url, 'UserNotice', 'Update') . '" target="_blank" class="tf-notice-btn outline">' . Text::_('NR_VIEW_CHANGELOG') . '</a>
					<a href="' . Uri::base() . 'index.php?option=com_installer&task=update.find&' . Session::getFormToken() . '=1" class="tf-notice-btn success">' . Text::_('NR_UPDATE_NOW') . '</a>';
	}

	/**
	 * Whether the notice can run.
	 * 
	 * @return  string
	 */
	protected function canRun()
	{
		// If cookie exists, its been hidden
		if ($this->factory->getCookie('tfNoticeHideUpdateNotice_' . $this->payload['ext_element']) === 'true')
		{
			return false;
		}

		if (!$this->payload['latest_version'])
		{
			return false;
		}

		return version_compare($this->payload['latest_version'], $this->payload['current_version'], '>');
	}
}