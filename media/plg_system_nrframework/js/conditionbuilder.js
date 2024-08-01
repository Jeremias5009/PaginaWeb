function _createForOfIteratorHelperLoose(e,t){var r,o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(o)return(o=o.call(e)).next.bind(o);if(Array.isArray(e)||(o=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return o&&(e=o),r=0,function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var TF_Condition_Builder=function(){function e(e){this.app_ajax_url="?option=com_ajax&format=raw&plugin=nrframework&task=ConditionBuilder",this.wrapper=e,this.isJ4=Joomla.Modal,this.root_url=this.wrapper.dataset.root,this.site_url=this.root_url.replace("/administrator/",""),this.token=this.wrapper.dataset.token,this.init()}var t=e.prototype;return t.init=function(){this.initEvents(),this.initLoadConditions()},t.initEvents=function(){this.prepare(),document.addEventListener("click",function(e){this.addConditionEvent(e),this.deleteConditionEvent(e),this.deleteGroupConditionEvent(e)}.bind(this)),document.addEventListener("change",function(e){this.handleConditionSelector(e)}.bind(this)),jQuery(document).on("change",".condition_selector",function(e){this.handleConditionSelector(e)}.bind(this)),document.addEventListener("afterConditionSettings",function(e){this.loadConditionAssets(e.detail.condition_name,e.detail.element)}.bind(this))},t.prepare=function(){NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/toggle.css")},t.initLoadConditions=function(){var r,e=this.wrapper.previousElementSibling.value;e?(e={data:e,name:this.wrapper.previousElementSibling.getAttribute("name"),include_rules:this.wrapper.dataset.includeRules,exclude_rules:this.wrapper.dataset.excludeRules,exclude_rules_pro:this.wrapper.dataset.excludeRulesPro},(r=this).call("init_load",e,function(e){var t=r.wrapper.querySelector(".tf-conditionbuilder-initial-message");t&&t.remove(),r.wrapper.querySelector(".cb-groups").innerHTML=e,r.beautifyProConditions(r.wrapper),r.getValidRules().forEach(function(e){r.loadConditionAssets(e.value,e.closest(".cb-item"))}),r.wrapper.classList.add("init-load-done")})):this.wrapper.querySelector(".tf-cb-add-new-group").click()},t.loadConditionAssets=function(e,t){var r=this;switch(e){case"Joomla\\UserGroup":case"Joomla\\Menu":case"Component\\ContentCategory":case"Component\\K2Category":case"Component\\VirtueMartCategory":case"Component\\VirtueMartCategoryView":case"Component\\HikashopCategory":case"Component\\HikashopCategoryView":NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/treeselect.css"),NRHelper.loadScript(this.site_url+"/media/plg_system_nrframework/js/treeselect.js",function(){NRTreeselect.init(t)},!0);break;case"Date\\Date":case"Component\\HikashopLastPurchasedDate":case"Component\\VirtueMartLastPurchasedDate":NRHelper.loadStyleSheet(this.site_url+"/media/system/css/fields/calendar.css"),NRHelper.loadScript(this.site_url+"/media/system/js/fields/calendar-locales/en.js"),NRHelper.loadScript(this.site_url+"/media/system/js/fields/calendar-locales/date/gregorian/date-helper.min.js"),NRHelper.loadScript(this.site_url+"/media/system/js/fields/calendar.min.js",function(){t.querySelectorAll(".field-calendar").forEach(function(e){JoomlaCalendar.init(e)})},!0);break;case"Date\\Time":NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/vendor/jquery-clockpicker.min.css"),NRHelper.loadScript(this.site_url+"/media/plg_system_nrframework/js/vendor/jquery-clockpicker.min.js",function(){t.querySelectorAll(".clockpicker").forEach(function(e){jQuery(e).clockpicker()})},!0);break;case"URL":case"Joomla\\UserID":case"Geo\\City":case"Geo\\Region":case"Referrer":case"IP":case"Component\\VirtueMartCartContainsProducts":case"Component\\VirtueMartCurrentProductPrice":case"Component\\VirtueMartCurrentProductStock":case"Component\\HikashopCartContainsProducts":case"Component\\HikashopCurrentProductPrice":case"Component\\HikashopCurrentProductStock":this.isJ4?NRHelper.loadScript(this.site_url+"/media/system/js/fields/joomla-field-subform.min.js"):NRHelper.loadScript(this.site_url+"/media/jui/js/jquery.ui.core.min.js",function(){NRHelper.loadScript(r.site_url+"/media/jui/js/jquery.ui.sortable.min.js",function(){NRHelper.loadScript(r.site_url+"/media/system/js/subform-repeatable.js")})}),NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/tfinputrepeater.css"),NRHelper.loadScript(this.site_url+"/media/plg_system_nrframework/js/tfinputrepeater.js"),"Joomla\\UserID"===e&&(this.isJ4?NRHelper.loadScript(this.site_url+"/media/system/js/fields/joomla-field-user.min.js"):NRHelper.loadScript(this.site_url+"/media/jui/js/fielduser.min.js"));case"Component\\VirtueMartCartContainsProducts":case"Component\\VirtueMartCurrentProductPrice":case"Component\\VirtueMartCurrentProductStock":case"Component\\HikashopCartContainsProducts":case"Component\\HikashopCurrentProductPrice":case"Component\\HikashopCurrentProductStock":this.loadSelect2();break;case"Component\\K2Item":case"Component\\ContentArticle":case"Component\\VirtueMartSingle":case"Component\\HikashopSingle":case"Component\\HikashopPurchasedProduct":case"Component\\VirtueMartPurchasedProduct":this.loadSelect2();break;case"PHP":this.isJ4||CodeMirror.fromTextArea(t.querySelector("textarea"),{lineNumbers:!0,indentUnit:0,tabSize:4,mode:"php"})}switch(e){case"Component\\VirtueMartCartContainsProducts":case"Component\\VirtueMartCartContainsXProducts":case"Component\\VirtueMartLastPurchasedDate":case"Component\\VirtueMartCurrentProductPrice":case"Component\\VirtueMartCurrentProductStock":case"Component\\VirtueMartTotalSpend":case"Component\\VirtueMartCartValue":case"Component\\HikashopCartContainsProducts":case"Component\\HikashopCartContainsXProducts":case"Component\\HikashopLastPurchasedDate":case"Component\\HikashopCurrentProductPrice":case"Component\\HikashopCurrentProductStock":case"Component\\HikashopTotalSpend":case"Component\\HikashopCartValue":NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/tf-ecomm-range-field.css")}NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/toggle.css"),"Date"!=e&&jQuery(document).trigger("subform-row-add",[t]),this.isJ4&&this.fixShowOnElements(t)},t.loadSelect2=function(){var e=this;NRHelper.loadStyleSheet(this.site_url+"/media/plg_system_nrframework/css/select2.css"),NRHelper.loadScript(this.site_url+"/media/plg_system_nrframework/js/vendor/select2.min.js",function(){NRHelper.loadScript(e.site_url+"/media/plg_system_nrframework/js/ajaxify.js",function(){new TF_Ajaxify_Field},!0)},!0)},t.fixShowOnElements=function(t){t.querySelectorAll("[data-showon]").forEach(function(e){e.removeAttribute("data-showon-initialised"),Joomla.Showon.initialise(t)})},t.handleConditionSelector=function(e){var t,r=e.target.closest(".condition_selector");r&&r.value&&(e.preventDefault(),(t=r.closest(".cb-item")).classList.add("ajax-loading"),this.loadConditionSettings(t,r.value,function(){t.classList.remove("ajax-loading"),t.querySelector(".cb-item-content").querySelectorAll("select.hasChosen").forEach(function(e){jQuery(e).chosen("destroy"),jQuery(e).chosen({disable_search_threshold:10,inherit_select_classes:!0})})}))},t.loadConditionSettings=function(t,r,o){var e=parseInt(t.closest(".cb-group").dataset.key),n=parseInt(t.closest(".cb-item").dataset.key),e={conditionItemGroup:this.wrapper.previousElementSibling.getAttribute("name")+"["+e+"][rules]["+n+"]",name:r,request_option:this.wrapper.dataset.option,request_layout:this.wrapper.dataset.layout};this.call("options",e,function(e){e=""!==e?e:'<div class="select-condition-message">'+Joomla.JText._("NR_CB_SELECT_CONDITION_GET_STARTED")+"</div>",t.querySelector(".cb-item-content").innerHTML=e;e=new CustomEvent("afterConditionSettings",{detail:{element:t,condition_name:r}});document.dispatchEvent(e),o&&o()})},t.beautifyProConditions=function(e){var r,o,n,e=e.querySelectorAll(".condition_selector:not(.tf-cb-prepared)");0!==e.length&&(r=function(e){e=e.nextElementSibling.querySelectorAll("li.disabled-result.group-option");0!==e.length&&e.forEach(function(e){e.classList.add("is-pro"),e.querySelector(".locks")||(e.setAttribute("data-pro-only",e.innerHTML),e.innerHTML+='<div class="locks"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 96 960 960"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 96 960 960"><path d="M220 422h390v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326h-60q0-79 55.606-134.5t134.5-55.5Q559 136 614.5 191.575T670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422Zm0 494h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM220 916V482v434Z"/></svg></div>')})},o=new MutationObserver(function(e,t){for(var r=_createForOfIteratorHelperLoose(e);!(o=r()).done;){var o=o.value;(o.target.closest(".chosen-results")||o.target.closest(".chzn-results"))&&o.target.closest(".hasChosen")&&o.target.closest(".hasChosen").previousElementSibling&&(jQuery(o.target.closest(".hasChosen").previousElementSibling).trigger("chosen:showing_dropdown").trigger("chzn:showing_dropdown"),t.disconnect())}}),n={attributes:!0,childList:!0,characterData:!0,subtree:!0},e.forEach(function(t){t.classList.add("tf-cb-prepared"),jQuery(t).on("chosen:ready",function(e){t.nextElementSibling.querySelector(".chosen-search input").addEventListener("keydown",function(e){o.observe(t.nextElementSibling.querySelector(".chosen-results"),n)})}),jQuery(t).on("chosen:showing_dropdown",function(e){r(t)}),jQuery(t).on("liszt:ready",function(e){t.nextElementSibling.querySelector(".chzn-search input").addEventListener("keydown",function(e){o.observe(t.nextElementSibling.querySelector(".chzn-results"),n)})}),jQuery(t).on("liszt:showing_dropdown",function(e){r(t)})}))},t.deleteGroupConditionEvent=function(e){e.target.closest(".removeGroupCondition")&&(e.preventDefault(),e=e.target.closest(".cb-group"),this.getValidRules(e).length&&!confirm(Joomla.JText._("NR_ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ITEM"))||(1!=this.getTotalConditionGroups()?e.remove():(e.querySelectorAll(".cb-item:not(:first-child)").forEach(function(e){e.remove()}),this.resetCondition(e.querySelector(".cb-item")))))},t.deleteConditionEvent=function(e){e.target.closest(".tf-cb-remove-condition")&&(e.preventDefault(),0!==(e=e.target.closest(".cb-item")).querySelector(".condition_selector").selectedIndex&&!confirm(Joomla.JText._("NR_ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ITEM"))||(1==this.getTotalConditionItems()?this.resetCondition(e):this.deleteCondition(e)))},t.deleteCondition=function(e){var t=e.closest(".cb-group");e.remove(),0==t.querySelectorAll(".cb-item").length&&t.remove()},t.resetCondition=function(e){e.querySelector(".condition_selector").selectedIndex=0,jQuery(e.querySelector(".condition_selector")).chosen("destroy"),jQuery(e.querySelector(".condition_selector")).chosen({disable_search_threshold:10,inherit_select_classes:!0}),jQuery(e.querySelector(".condition_selector")).trigger("change")},t.getTotalConditionGroups=function(){return this.wrapper.querySelectorAll(".cb-group").length},t.getValidRules=function(e){var e=(e=void 0===e?this.wrapper:e).querySelectorAll("select.condition_selector"),t=[];return e.forEach(function(e){0!==e.selectedIndex&&t.push(e)}),t},t.getTotalConditionItems=function(){return this.wrapper.querySelectorAll(".cb-item").length},t.addConditionEvent=function(e){var t,r,o=e.target.closest(".tf-cb-add-new-group");o&&(e.preventDefault(),e=(t=o.closest(".cb-item")||o).closest(".cb-group"),o=groupKey=0,o=this.addingNewGroup(t)?(groupKey=this.findHighestGroupKey()+1,0):(groupKey=parseInt(e.dataset.key),this.findHighestGroupItemKey(e)+1),t.classList.add("ajax-loading"),(r=this).addCondition(t,this.wrapper.previousElementSibling.getAttribute("name"),groupKey,o,function(e){t.classList.remove("ajax-loading"),r.wrapper.classList.add("init-load-done"),r.beautifyProConditions(e)}))},t.findHighestGroupKey=function(){return Math.max.apply(Math,Array.from(this.wrapper.querySelectorAll(".cb-group[data-key]")).map(function(e){return parseInt(e.dataset.key)}))},t.findHighestGroupItemKey=function(e){return Math.max.apply(Math,Array.from(e.querySelectorAll(".cb-item[data-key]")).map(function(e){return parseInt(e.dataset.key)}))},t.addCondition=function(r,e,t,o,n){var i=this.addingNewGroup(r),e={conditionItemGroup:e,groupKey:t,conditionKey:o,include_rules:this.wrapper.dataset.includeRules,exclude_rules:this.wrapper.dataset.excludeRules,exclude_rules_pro:this.wrapper.dataset.excludeRulesPro,addingNewGroup:i},s=this;this.call("add",e,function(e){var t=document.createElement("div"),e=(t.innerHTML=e,s.wrapper.querySelector(".tf-conditionbuilder-initial-message")),e=(e&&e.remove(),null),e=i?(s.wrapper.querySelector(".cb-groups").insertAdjacentHTML("beforeend",t.innerHTML),s.wrapper.querySelector(".cb-group:last-of-type")):(r.closest(".item-group-footer")?r.closest(".cb-group").querySelector(".cb-items").insertAdjacentHTML("beforeend",t.innerHTML):r.insertAdjacentHTML("afterend",t.innerHTML),r.closest(".cb-group"));n&&n(e)})},t.addingNewGroup=function(e){return!!e&&!e.closest(".cb-group")},t.call=function(e,t,r){var o=this,n=this.root_url+this.app_ajax_url+"&"+this.token+"=1";t.subtask=e,fetch(n,{method:"post",body:JSON.stringify(t)}).then(function(e){return e.text()}).then(function(e){r(e),o.wrapper.querySelectorAll("select.hasChosen").forEach(function(e){jQuery(e).chosen("destroy"),jQuery(e).chosen({disable_search_threshold:10,inherit_select_classes:!0})}),o.wrapper.querySelectorAll(".hasPopover").forEach(function(e){jQuery(e).popover({html:!0,trigger:"hover focus",container:"body"})})}).catch(function(e){alert(e)})},e}(),TF_Condition_Builder_Loader=function(){function e(){this.init()}return e.prototype.init=function(){var t;window.IntersectionObserver&&(t=new IntersectionObserver(function(e,t){e.forEach(function(e){e.isIntersecting&&(new TF_Condition_Builder(e.target),t.unobserve(e.target))})},{rootMargin:"0px 0px 0px 0px"}),document.querySelectorAll("div.cb").forEach(function(e){t.observe(e)}))},e}();!function(){"use strict";document.addEventListener("DOMContentLoaded",function(){new TF_Condition_Builder_Loader})}(window);

