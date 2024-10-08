<?php

/**
 *  @author          Tassos Marinos <info@tassos.gr>
 *  @link            https://www.tassos.gr
 *  @copyright       Copyright © 2024 Tassos All Rights Reserved
 *  @license         GNU GPLv3 <http://www.gnu.org/licenses/gpl.html> or later
*/

namespace NRFramework\Conditions\Conditions\Geo;

defined('_JEXEC') or die;

use NRFramework\Countries;
use NRFramework\Functions;

class Country extends GeoBase
{
    /**
     * Shortcode aliases for this Condition
     */
    public static $shortcode_aliases = ['geo.country'];
    
    /**
     *  Country check
     * 
     *  @return bool
     */
    public function prepareSelection()
    {
        $selection = Functions::makeArray($this->getSelection());

        return array_map(function($c) {
            if (strlen($c) > 2)
            {
                $c = Countries::getCode($c);
            }
            return $c;
        }, $selection);
    }

    /**
     *  Returns the assignment's value
     * 
     *  @return string Country code
     */
	public function value()
	{
        return [
            $this->geo->getCountryName(),
            $this->geo->getCountryCode()
        ];
	}
}