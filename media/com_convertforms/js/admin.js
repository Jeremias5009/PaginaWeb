!function(){var r=/\s/g,a=/>/g,d=/</g;var s="__autosizeInputGhost";function l(){var e=document.createElement("div");return e.id=s,e.style.cssText="display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;",document.body.appendChild(e),e}var c="";document.addEventListener("DOMContentLoaded",function(){c=l()}),window.autosizeInput=function(t,e){var n=window.getComputedStyle(t),o="box-sizing:"+n.boxSizing+";border-left:"+n.borderLeftWidth+" solid black;border-right:"+n.borderRightWidth+" solid black;font-family:"+n.fontFamily+";font-feature-settings:"+n.fontFeatureSettings+";font-kerning:"+n.fontKerning+";font-size:"+n.fontSize+";font-stretch:"+n.fontStretch+";font-style:"+n.fontStyle+";font-variant:"+n.fontVariant+";font-variant-caps:"+n.fontVariantCaps+";font-variant-ligatures:"+n.fontVariantLigatures+";font-variant-numeric:"+n.fontVariantNumeric+";font-weight:"+n.fontWeight+";letter-spacing:"+n.letterSpacing+";margin-left:"+n.marginLeft+";margin-right:"+n.marginRight+";padding-left:"+n.paddingLeft+";padding-right:"+n.paddingRight+";text-indent:"+n.textIndent+";text-transform:"+n.textTransform;function i(e){e=e||t.value||t.getAttribute("placeholder")||"",(c=null===document.getElementById(s)?l():c).style.cssText+=o,c.innerHTML=e.replace(r,"&nbsp;").replace(a,"&lt;").replace(d,"&gt;");e=window.getComputedStyle(c).width;return t.style.width=e}return t.addEventListener("input",function(){i()}),n=i(),e&&e.minWidth&&"0px"!==n&&(t.style.minWidth=n),i}}((window,document)),jQuery(function(s){s.fn.awesomeEditor=function(e){function t(){var n=0;return function(e,t){clearTimeout(n),n=setTimeout(e,t)}}var o=this,i=s.extend({plugin:"Convert Forms Editor",debug:!0,form:o.find(".cf-editor-options #adminForm"),root:o.data("root"),base:Joomla.getOptions("system.paths").base,GoogleFonts:ConvertFormsGoogleFonts},e),n=new function(){var t=this,n=this;this.container=o.get(0),this.init=function(){var n=this;this.loadStylesheet("media/com_convertforms/css/convertforms.css"),document.addEventListener("click",function(e){var t=e.target.dataset.cfaction;t&&"save"===t&&(e.preventDefault(),n.save(e.target))}),document.querySelectorAll(".field-media-wrapper > .modal").forEach(function(e){s(e).on("show.bs.modal",function(){s(e).appendTo("body")})})},this.initEditorFields=function(){tinyMCE.remove(),tinyMCE.init({init_instance_callback:function(e){e.on("ExecCommand",function(){tinyMCE.triggerSave(),a()}),e.on("blur",function(){tinyMCE.triggerSave(),a()})},document_base_url:i.root,height:"170",plugins:"textcolor, code, colorpicker, fullscreen, link, image",selector:".editorx",toolbar1:"fontsizeselect styleselect link unlink image mybutton",toolbar2:"forecolor | bold italic underline | alignleft aligncenter alignright | code fullscreen",fontsize_formats:"10px 11px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 42px 46px 48px 50px 52px",mode:"specific_textareas",entity_encoding:"raw",forced_root_block:"",toolbar_items_size:"small",statusbar:!1,menubar:!1,inline_styles:!0,force_br_newlines:!1,paste_data_images:!0,importcss_append:!0,image_advtab:!0,valid_children:"+div[style]"})},this.loadGoogleFont=function(e){-1<i.GoogleFonts.indexOf(e)&&this.loadStylesheet("//fonts.googleapis.com/css?family="+encodeURIComponent(e))},this.goToPanel=function(e,t){(vv=o.find(".tabs-left ul li a[href=#"+e+"]")).trigger("click"),o.find(".tab-content .accordion-group."+t+" .accordion-heading a.collapsed").trigger("click")},this.request=function(t){r[t.endpoint]||(r[t.endpoint]=!0,s(".loader").fadeIn(),t.beforeSend&&t.beforeSend(),fetch(i.base+"/index.php?option=com_convertforms&tmpl=component&task=form."+t.endpoint,{method:"POST",credentials:"include",body:JSON.stringify(i.form.find("select, input[name*=jform], textarea").serializeArray()),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(function(e){return r[t.endpoint]=!1,s(".loader").fadeOut(),t.complete&&t.complete(),"text"==t.type?e.text():e.json()}).then(function(e){if(e.error)throw new Error(e.error);t.success(e)}).catch(function(e){d(e)}))},this.updateCodeMirrorInstances=function(){var e=document.querySelectorAll(".CodeMirror");e.length&&e.forEach(function(e){e.CodeMirror.setSize(345,null),e.CodeMirror.on("blur",function(){e.CodeMirror.save(),e.previousElementSibling.dispatchEvent(new Event("change",{bubbles:!0}))})})},this.saveCodeMirrorInstances=function(){var e=document.querySelectorAll(".CodeMirror");e.length&&e.forEach(function(e){e.CodeMirror.save()})},this.updateJ5CodeMirrorInstances=function(){var e=document.querySelectorAll(".cm-editor");e.length&&e.forEach(function(t){var n=t.querySelector(".cm-content").cmView;n.dom.addEventListener("blur",function(){var e=n.view.state.sliceDoc();t.nextElementSibling.value=e,t.nextElementSibling.dispatchEvent(new Event("change",{bubbles:!0}))})})},this.saveJ5CodeMirrorInstances=function(){var e=document.querySelectorAll(".cm-editor");e.length&&e.forEach(function(e){var t=e.querySelector(".cm-content").cmView.view.state.sliceDoc();e.nextElementSibling.value=t,e.nextElementSibling.dispatchEvent(new Event("change",{bubbles:!0}))})},this.save=function(e){t.request({endpoint:"ajaxSave",beforeSend:function(){n.saveCodeMirrorInstances(),n.saveJ5CodeMirrorInstances(),Joomla.removeMessages(),e&&e.classList.add("working")},complete:function(){e&&e.classList.remove("working")},success:function(e){e.isNew&&(window.location.href=e.redirect.replace(/&amp;/g,"&"))}})},this.loadStylesheet=function(e){e=-1<e.indexOf("http")||-1<e.indexOf("//")?e:i.root+e,s("link[href='"+e+"']").length||s("head").append(s('<link rel="stylesheet" type="text/css" />').attr("href",e))},this.loadScript=function(e,t){var n;document.querySelector('script[src="'+e+'"]')?console.log("Script is already loaded",e):((n=document.createElement("script")).type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!=n.readyState&&"complete"!=n.readyState||(n.onreadystatechange=null,t&&t())}:n.onload=function(){t&&t()},e=-1<e.indexOf("http")||-1<e.indexOf("//")?e:i.root+e,n.src=e,document.getElementsByTagName("head")[0].appendChild(n))},this.onAfterDrawForm=function(e){s(".nrEditorPreviewContainer").html(e.html),s("#preview-successmsg").trigger("change")}},r=(n.init(),{});function a(){n.request({endpoint:"preview",beforeSend:function(){n.saveCodeMirrorInstances(),n.saveJ5CodeMirrorInstances()},success:function(e){n.onAfterDrawForm(e)}})}function d(e){Joomla.renderMessages({error:[e]})}return o.on("renderForm",function(){a()}),o.on("error",function(e,t){d(t)}),s(document).on("click",".cf-control-group",function(){key=s(this).data("key"),o.trigger("controlGroupClick",[key])}),s(".page-title").click(function(){n.goToPanel("design","box"),s("#jform_name").focus()}),s(document).on("change",".cf-editor-options input, .cf-editor-options select, .cf-editor-options textarea",function(e){($el=s(e.target)).hasClass("norender")||((isColorPicker=$el.hasClass("minicolors-input"))?t()(function(){a()},100):a())}),s(document).on("subform-row-add subform-row-remove nrChoicesUpdate",function(){setTimeout(function(){a()},50)}),s(document).on("subform-row-add",function(){n.initEditorFields()}),s(document).on("submit",".cf form",function(){return!1}),n.initEditorFields(),s("select.nrfont").change(function(){n.loadGoogleFont(s(this).val())}).trigger("change"),a(),t()(function(){n.updateCodeMirrorInstances(),n.updateJ5CodeMirrorInstances()},400),s("#preview-successmsg").change(function(){box=s(".nrEditorPreview .cf"),s(this).is(":checked")?(successMessage=s("#jform_successmsg").val(),box.find(".cf-response").html(successMessage),box.addClass("cf-success"),s("#jform_hideform0").is(":checked")?box.addClass("cf-success-hideform"):box.removeClass("cf-success-hideform")):box.removeClass("cf-success cf-error")}),window.ConvertFormsBuilder=n,this}}),jQuery(function(e){(editor=e(".nrEditor")).length&&editor.awesomeEditor()}),jQuery(function(t){t(document).on("click",".cf-layout-btn",function(){var e=t(this);container=e.closest(".control-group").find(".cf-layout-classes"),isVisible=container.is(":visible"),container.slideToggle(),e.text(isVisible?e.data("show-label"):e.data("hide-label"))}),t(document).on("click",".cf-layout-classes .cf-layout > span",function(){var e=t(this).closest(".control-group");input=e.find("input"),btn=e.find(".cf-layout-btn"),value=t.trim(input.val()),css_class=t(this).attr("class"),value=0<value.length?value+" ":value,input.val(value+css_class).trigger("change"),btn.trigger("click")})}),jQuery(function(r){var i=r(".fm");function a(e){var e=document.querySelector('.fmItem[data-key="'+e+'"]'),t=e.querySelector('input[id$="_label"]');return t&&t.value.trim()||(t=e.querySelector('input[id$="_text"]'))&&t.value?t.value:(t=e.querySelector('input[id$="_name"]'))&&t.value?t.value:e.querySelector("h3 > span").innerHTML}function n(e){var t=a(e).trim();document.querySelector('.fmAddedFields .item[data-key="'+e+'"] .fmFieldLabel').innerHTML=t}function d(t){running||(running=!0,isCopy=void 0!==t.copyfield,i.addClass("disabled"),r.ajax({type:"POST",url:$builder.attr("data-root")+"administrator/index.php?option=com_convertforms&view=form&layout=field&format=raw",data:t,success:function(e){isCopy?i.find(".fmItems .fmItem[data-key="+t.copyfield+"]").after(e):i.find(".fmItems").append(e),$response=r(e),fieldKey=$response.attr("data-key"),fieldLabel=$response.attr("data-label"),$field=i.find(".fmAddedFields .item:last-child").clone().attr("data-key",fieldKey).find(".fmFieldLabel").html(fieldLabel).end(),isCopy?$field.insertAfter(".fmAddedFields .item[data-key="+t.copyfield+"]"):$field.appendTo(".fmAddedFields"),i.trigger("afterAddField",[i.attr("data-nextid")]).trigger("fieldsUpdate");e=new CustomEvent("AfterFieldAdd",{detail:{field_key:fieldKey}});builder.dispatchEvent(e),n(fieldKey),c.emitEvent("update")},error:function(e,t,n){$builder.trigger("error",n)},complete:function(){running=!1,i.removeClass("disabled")}}))}function o(e){var t=isJ4?'.tabs-left button[aria-controls="fields"]':'.tabs-left ul li a[href="#fields"]',t=(builder.querySelector(t).click(),s("fmItems"),i.find(".fmItem").hide().filter("[data-key="+e+"]").show(),{id:e,el:document.querySelector('.fmItem[data-key="'+e+'"]')});c.emitEvent("displayOptions",t)}function s(e){$tab.find('li a[href="#'+e+'"]').tab("show")}function l(e){return e=void 0===e?i.attr("data-nextid"):e,i.attr("data-formcontrol").replace("X",e)}$builder=r(".nrEditor"),builder=$builder.get(0),$tab=r("#fieldsManagerTabs"),running=!1,isJ4=null!==document.getElementById("wrapper"),0!=(el=r(".fmAddedFields")).length&&new Sortable(el.get(0),{animation:150,ghostClass:"ghost-item",onUpdate:function(){var e;(e=i.find(".fmItems")).find(".fmItem").sort(function(e,t){return r(".fmAddedFields .item[data-key="+r(e).attr("data-key")+"]").index()-r(".fmAddedFields .item[data-key="+r(t).attr("data-key")+"]").index()}).appendTo(e),i.trigger("fieldsUpdate"),ConvertFormsBuilder.initEditorFields(),c.emitEvent("update")}}),document.querySelectorAll(".fmItems .fmItem").forEach(function(e){n(e.dataset.key)}),i.find(".addField").on("click",function(e){var t;void 0===r(this).attr("data-pro-only")&&d({field:{type:t=r(this).attr("data-type"),key:i.attr("data-nextid"),name:t+"_"+i.attr("data-nextid"),label:r.trim(r(this).text())},formcontrol:encodeURIComponent(l())})}),builder.addEventListener("fields.displayOptions",function(e){e=e.detail.el;null!=e.querySelector(".nr-images-selector")&&ConvertFormsBuilder.loadStylesheet("media/plg_system_nrframework/css/images-selector-field.css"),null!=e.querySelector(".nrf-slider-wrapper")&&(ConvertFormsBuilder.loadStylesheet("media/plg_system_nrframework/css/widgets/slider.css"),ConvertFormsBuilder.loadScript("media/plg_system_nrframework/js/widgets/slider.js")),null!=e.querySelector(".tf-imagedimensions-control")&&(ConvertFormsBuilder.loadStylesheet("media/plg_system_nrframework/css/controls/imagedimensions.css"),ConvertFormsBuilder.loadScript("media/plg_system_nrframework/js/controls/imagedimensions.js"))}),r(document).on("click",".fmAddedFields .item",function(){o(r(this).attr("data-key")),s("fmItems")}),r(document).on("click",".removeField",function(){var e,t,n=r(this);return confirm("Are you sure")&&(e=n.closest("div").attr("data-key"),t=e,i.find(".fmAddedFields > .item[data-key="+t+"]").remove(),i.find(".fmItem[data-key="+t+"]").remove(),i.trigger("fieldsUpdate"),c.emitEvent("update"),n.data("focusnext"))&&((e=i.find(".fmItems > .fmItem:first-child").attr("data-key"))?o(e):s("fmaddField")),!1}),r(document).on("click",".copyField",function(){var e,o,t=r(this).closest("div").attr("data-key");return t=t,e=i.find(".fmItems > .fmItem[data-key="+t+"]"),field_type=e.find("input[id$=_type]").val(),field_data=e.find("input, select, textarea"),formControl=l(t),o={},r.map(field_data.serializeArray(),function(e,t){var n=e.name.replace(formControl,"field"),e=e.value;"field[name]"==n&&(e+="_copy"+Math.random().toString(36).substr(2,4)),"field[key]"==n&&(e=i.attr("data-nextid")),o[n]=e}),o.formcontrol=encodeURIComponent(l()),o.copyfield=t,d(o),!1}),i.on("fieldsUpdate",function(e){$builder.trigger("renderForm")}),i.on("afterAddField",function(){key=parseInt(i.attr("data-nextid"));var e=r(".fmItem[data-key="+key+"]");o(key),isJ4||i.find(".hasPopover").popover({html:!0,trigger:"hover focus",container:"body"}),isJ4?(e.get(0).dispatchEvent(new CustomEvent("joomla:updated",{bubbles:!0,cancelable:!0})),ConvertFormsBuilder.initEditorFields()):(r(document).trigger("subform-row-add"),e=(e=e)||document,r(e).find(".minicolors").each(function(){var e=r(this),t="color"!==e.data("validate")&&e.data("format")||"hex";e.minicolors({control:e.data("control")||"hue",format:"rgba"===t?"rgb":t,keywords:e.data("keywords")||"",opacity:"rgba"===t,position:e.data("position")||"default",theme:e.data("theme")||"bootstrap"})})),key+=1,i.attr("data-nextid",key)}),$builder.on("controlGroupClick",function(e,t){o(t)}),document.addEventListener("change",function(e){e=e.target.closest(".fmItem");e&&(n(e.dataset.key),c.emitEvent("update"))});var c={emitEvent:function(e,t){builder.dispatchEvent(new CustomEvent("fields."+e,{detail:t}))},getFieldsArray:function(){var i,e=r(".fmItems .fmItem");if(e.length)return i=[],e.each(function(){var e=r(this),t=e.find("input[id$=__name]").val(),n=e.find("input[id$=__type]").val(),e=e.data("key"),o={id:e,name:t,label:a(e)+" ("+e+")",type:n,shortcode:t?"{field."+t+"}":null,shortcodeWithID:t?"{field."+e+"}":null};o.hasInput=!["html","heading","emptyspace","divider","captcha","recaptchaaio","recaptcha","recaptchav2invisible","hcaptcha","signature"].includes(n),["radio","dropdown","checkbox"].includes(n)&&((t=document.querySelector('.fmItems .fmItem[data-key="'+e+'"]').querySelector(".nr_choices").querySelectorAll(".nr-choice-item"))&&(o.options=[]),t.forEach(function(e){var t,n=e.querySelector(".nr-choice-label").value;n&&(t=e.querySelector(".nr-choice-value").value,o.options.push({id:e.dataset.id,label:n,value:t||n}))})),i.push(o)}),i}};window.ConvertFormsBuilder.FieldsHelper=c}),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector("#formname"),e=document.querySelector("#jform_name");function n(e){t.value=e,autosizeInput(t)}autosizeInput(t),t.addEventListener("input",function(){e.value=this.value}),t.addEventListener("blur",function(){this.value||n(this.dataset.fallback)}),e.addEventListener("input",function(){n(this.value)})}),jQuery(function(r){var e=r(".st");r(".fm").on("fieldsUpdate",function(){e.trigger("update")}),r(document).on("subform-row-add",function(){e.trigger("update")}),r(document).on("smartTagsBoxBeforeRender",function(e,t,n){var o,i=n.closest(".fmItem").length;skipFields=-1<["jform_text","jform_footer"].indexOf(n.prev().attr("id")),(skip=i||skipFields)||(o={},(n={})[Joomla.JText._("COM_CONVERTFORMS_SUBMISSION")]={"{submission.id}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_ID"),"{submission.user_id}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_USER_ID"),"{submission.date}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_DATE"),"{submission.status}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_STATUS"),"{submission.campaign_id}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_CAMPAIGN_ID"),"{submission.form_id}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_FORM_ID"),"{submission.visitor_id}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSION_VISITOR_ID"),"{submissions.count}":Joomla.JText._("COM_CONVERTFORMS_SUBMISSIONS_COUNT")},i=n,ConvertFormsBuilder.FieldsHelper.getFieldsArray().filter(function(e){return void 0!==e.name}).forEach(function(e){var t;o[e.shortcode]=e.label,"dropdown"!=e.type&&"radio"!=e.type||(t="{field."+e.name+".label}",o[t]=e.label+" Label")}),o["{all_fields}"]=Joomla.JText._("COM_CONVERTFORMS_ALL_FIELDS"),o["{all_fields --excludeEmpty=true}"]=Joomla.JText._("COM_CONVERTFORMS_ALL_FILLED_ONLY_FIELDS"),o["{all_fields --hideLabels=true}"]=Joomla.JText._("COM_CONVERTFORMS_ALL_FIELDS_NO_LABELS"),i[Joomla.JText._("COM_CONVERTFORMS_FIELDS")]=o,r.extend(!0,t,i))})}),jQuery(function(e){var t=e(".nrEditor");function n(){if(null!=(state=function(){if(0!=($tabs=t.find(".nav-tabs")).children().length)return tab=$tabs.find("li.active a").attr("href").replace("#",""),panel=(panel=t.find(".tab-pane#"+tab+" .accordion-body.in.collapse")).length?(panel=panel.parent().attr("class").split(" "))[1]:"",tab+"-"+panel}())){formID=t.find("form").attr("pk");try{Cookies.set("ConvertFormsState"+formID,state)}catch(e){console.log(e)}}}document.querySelector("body.task-display")||(t.find(".accordion").on("shown.bs.collapse hidden.bs.collapse",function(){n()}),t.find(".nav-tabs").on("shown.bs.tab",function(){n()}))});

