var TF_Address_Lookup=function(){function e(){this.controller=null,this.initEvents()}var t=e.prototype;return t.initEvents=function(){var t=this;document.addEventListener("click",function(e){this.onSelectAutocompleteItem(e),this.onHideAutocompleteResults(e)}.bind(this)),document.addEventListener("focusout",function(e){this.onFocusOut(e)}.bind(this)),document.addEventListener("keyup",this.debounce(function(e){t.onAddressAutocomplete(e)},500))},t.onFocusOut=function(e){e=e.target.closest(".tf-address-lookup-field-address");e&&""===e.value&&(this.controller&&this.controller.abort(),e.previousElementSibling.value="")},t.debounce=function(o,n){var s;return function(){var e=this,t=arguments;clearTimeout(s),s=setTimeout(function(){return o.apply(e,t)},n)}},t.onAddressAutocomplete=function(e){var t,o,n,e=e.target.closest('.tf-address-lookup-field-address[data-autocomplete="true"]');e&&(this.controller&&this.controller.abort(),this.controller=new AbortController,t=this.controller.signal,o=e.nextElementSibling,n=this,null==(e=e.value.split(" ").map(function(e){return encodeURIComponent(e)}).join("+").trim())||""===e?this.hideResults(o):fetch("https://nominatim.openstreetmap.org/search?q="+e+"&addressdetails=1&format=json",{signal:t}).then(function(e){return e.json()}).then(function(e){n.showResults(e,o)}))},t.showResults=function(e,o){o.innerHTML="",e.length?(e.forEach(function(e){var t='<div class="tf-address-lookup-field-autocomplete-item" data-coordinates="{coordinates}">{label}</div>';t=(t=t.replace("{coordinates}",e.lat+","+e.lon)).replace("{label}",e.display_name),o.innerHTML+=t}),o.classList.add("is-visible")):this.hideResults(o)},t.hideResults=function(e){e.classList.remove("is-visible")},t.onSelectAutocompleteItem=function(e){var t,o,e=e.target.closest(".tf-address-lookup-field-autocomplete-item");e&&(e.parentElement.previousElementSibling.value=e.innerHTML,e.parentElement.previousElementSibling.previousElementSibling.value=e.dataset.coordinates,o=(t=e.dataset.coordinates.split(","))[0].trim(),t=t[1].trim(),o=new CustomEvent("onTFAddressLookupSelectedItem",{detail:{item:e,lat:o,lng:t,address:e.innerHTML}}),document.dispatchEvent(o),this.hideAutocompleteResult(e.parentElement))},t.onHideAutocompleteResults=function(e){var t=this;e.target.closest(".tf-address-lookup-field-autocomplete-results")||document.querySelectorAll(".tf-address-lookup-field-autocomplete-results.is-visible").forEach(function(e){t.hideAutocompleteResult(e)})},t.hideAutocompleteResult=function(e){e.classList.remove("is-visible"),e.innerHTML=""},e}();document.addEventListener("DOMContentLoaded",function(){new TF_Address_Lookup});
