<?php
/**
 * Dropfiles
 *
 * We developed this code with our hearts and passion.
 * We hope you found it useful, easy to understand and to customize.
 * Otherwise, please feel free to contact us at contact@joomunited.com *
 *
 * @package   Dropfiles
 * @copyright Copyright (C) 2013 JoomUnited (http://www.joomunited.com). All rights reserved.
 * @copyright Copyright (C) 2013 Damien Barrère (http://www.crac-design.com). All rights reserved.
 * @license   GNU General Public License version 2 or later; http://www.gnu.org/licenses/gpl-2.0.html
 */


defined('_JEXEC') || die;


/**
 * Class DropfilesViewGoogledrive
 */
class DropfilesViewGoogledrive extends JViewLegacy
{
    /**
     * State
     *
     * @var string
     */
    protected $state;

    /**
     * Display the view
     *
     * @param null $tpl Template
     *
     * @return void
     */
    public function display($tpl = null)
    {
        $app = JFactory::getApplication();
        $layout = $app->input->get('layout', 'default');
        $this->canDo = DropfilesHelper::getActions();
        if ($this->canDo->get('core.admin')) {
            if ($layout === 'redirect') {
                JLoader::register('DropfilesCloudHelper', JPATH_ADMINISTRATOR . '/components/com_dropfiles/helpers/dropfilescloud.php');
                if (DropfilesCloudHelper::watchChanges()) {
                    DropfilesComponentHelper::setParams(array('google_watch_changes' => 1));
                }
            }
        }
        $this->setLayout($layout);
        parent::display($tpl);
    }
}
