function _createForOfIteratorHelperLoose(e,t){var r,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),r=0,function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var TF_ImageDimension_Control=function(){function e(){this.initEvents()}var t=e.prototype;return t.initEvents=function(){var t=this;document.addEventListener("change",function(e){t.onSelectValue(e)})},t.onSelectValue=function(e){e=e.target.closest(".tf-imagedimensions-control select");if(e&&"disabled"!==e.value)for(var t=_createForOfIteratorHelperLoose(e.closest(".tf-imagedimensions-control").querySelectorAll("input"));!(r=t()).done;){var r=r.value;if(null!==r.offsetParent){r.focus();break}}},e}();"loading"!=document.readyState?new TF_ImageDimension_Control:document.addEventListener("DOMContentLoaded",function(){new TF_ImageDimension_Control});
