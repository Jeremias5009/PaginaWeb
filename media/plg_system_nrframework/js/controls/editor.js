var TF_Editor_Item=function(){function t(t){this.editor=t,this.init()}var e=t.prototype;return e.init=function(){var e=this;this.initEditor(this.editor),document.querySelectorAll("joomla-field-subform").forEach(function(t){t.addEventListener("subform-row-add",function(t){e.initEditors(t.target)})})},e.initEditors=function(t){var e=this;t.querySelectorAll(".tf-editor-wrapper").forEach(function(t){e.initEditor(t)})},e.initEditor=function(t){var e=t.querySelector("textarea");e&&(window.WfEditor&&!document.querySelector('script[data-asset-name="tinymce"]')?(window.WfEditor.settings.theme_buttons1="bold,italic,underline,strikethrough,removeformat,code,bullist,numlist,outdent,indent,styleselect,blockquote,link,unlink,imgmanager,fullscreen",window.WfEditor.settings.theme_buttons2="",window.WfEditor.settings.theme_buttons3="",window.WfEditor.settings.theme_buttons4="",window.WfEditor.create([e])):(e={target:e,menubar:!1,plugins:["code","media","lists","visualblocks","link","autolink","image","fullscreen"],toolbar:"bold italic underline strikethrough removeformat code | bullist numlist | outdent indent | styleselect blockquote | link unlink image media | fullscreen"},t.dataset.plugins&&(e.plugins=JSON.parse(t.dataset.plugins)||e.plugins),t.dataset.toolbar&&(e.toolbar=JSON.parse(t.dataset.toolbar)||e.toolbar),tinymce.init(e)))},t}(),TF_Editors_Loader=function(){function t(){this.init()}return t.prototype.init=function(){var t,e;window.IntersectionObserver&&(t=document.querySelectorAll(".tf-editor-wrapper"))&&(e=new IntersectionObserver(function(t,e){t.forEach(function(t){t.isIntersecting&&(new TF_Editor_Item(t.target),e.unobserve(t.target))})},{rootMargin:"0px 0px 0px 0px"}),t.forEach(function(t){e.observe(t)}))},t}();document.addEventListener("DOMContentLoaded",function(){new TF_Editors_Loader});

