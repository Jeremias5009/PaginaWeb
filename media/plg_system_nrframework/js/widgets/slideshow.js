var TF_Slideshow=function(){function t(t){this.id=t,this.selector="#"+this.id,this.thumbs_selector="#thumbs_"+this.id,this.wrapper=document.querySelector(this.selector),this.options=JSON.parse(this.wrapper.dataset.options),this.maybeLoadLightbox(),this.swiper=null,this.thumbsSwiper=null}var e=t.prototype;return e.init=function(){var i=this,o=this.wrapper.querySelector(".autoplay-progress-circle svg")||!1,n=this.wrapper.querySelector(".autoplay-progress-circle span")||!1,t=parseFloat(getComputedStyle(this.wrapper).getPropertyValue("--slideshow-slides-per-view")||1),e=(parseFloat(getComputedStyle(this.wrapper).getPropertyValue("--slideshow-space-between-slides")||0),this.options.transition_effect),t=(1<t&&"slide"!==e&&(e="slide",this.wrapper.querySelector(".swiper-cube-shadow"))&&this.wrapper.querySelector(".swiper-cube-shadow").remove(),{}),e=(this.options.breakpoints.mobile&&(t[this.options.breakpoints.mobile]={},this.options.slides_per_view.tablet&&(t[this.options.breakpoints.mobile].slidesPerView=this.options.slides_per_view.tablet),this.options.space_between_slides.tablet)&&(t[this.options.breakpoints.mobile].spaceBetween=this.options.space_between_slides.tablet),this.options.breakpoints.tablet&&(t[this.options.breakpoints.tablet]={},this.options.slides_per_view.desktop&&(t[this.options.breakpoints.tablet].slidesPerView=this.options.slides_per_view.desktop),this.options.space_between_slides.desktop)&&(t[this.options.breakpoints.tablet].spaceBetween=this.options.space_between_slides.desktop),{loop:this.options.infinite_loop,effect:e,slidesPerView:this.options.slides_per_view.mobile||1,spaceBetween:this.options.space_between_slides.mobile||0,breakpoints:t,on:{autoplayTimeLeft:function(t,e,s){i.options.autoplay_progress&&(o.style.setProperty("--progress",1-s),n.textContent=Math.ceil(e/1e3)+"s")}}});this.options.autoplay&&(e.autoplay={delay:parseInt(this.options.autoplay_delay),disableOnInteraction:!1}),"arrows"===this.options.nav_controls||"arrows_dots"===this.options.nav_controls?e.navigation={nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}:e.navigation={enabled:!1},"dots"===this.options.nav_controls||"arrows_dots"===this.options.nav_controls?e.pagination={el:".swiper-pagination",clickable:!0}:e.pagination={enabled:!1},this.options.keyboard_control&&(e.keyboard={enabled:!0}),this.options.show_thumbnails&&(t={spaceBetween:10,slidesPerView:"auto",loop:!1},this.options.show_thumbnails_arrows&&(t.navigation={nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}),this.thumbsSwiper=new Swiper(this.thumbs_selector,t),e.thumbs={swiper:this.thumbsSwiper}),this.swiper=new Swiper(this.selector,e)},e.maybeLoadLightbox=function(){var t;this.options.lightbox&&(t={selector:".tf-gallery-lightbox-item."+this.id,touchNavigation:!0},GLightbox(t))},t}(),TF_Slideshows=function(){function t(){this.init()}var e=t.prototype;return e.init=function(){this.getSlideshows().forEach(function(t){new TF_Slideshow(t.id).init()})},e.getSlideshows=function(){return document.querySelectorAll(".nrf-widget.tf-slideshow-wrapper")},t}();document.addEventListener("DOMContentLoaded",function(t){new TF_Slideshows});
