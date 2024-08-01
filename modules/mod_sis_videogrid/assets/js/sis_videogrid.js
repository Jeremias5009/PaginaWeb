document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('#sis_videogrid .sis_video');
    videos.forEach(function(video)
    {
        video.addEventListener('click', function()
        {
            videos.forEach(function(video)
            {
                video.classList.remove('active');
            });
            this.classList.add('active');
            var id_video = this.querySelector('img').getAttribute('data-video');
            var class_video = this.querySelector('img').getAttribute('data-div');
            var url_video = 'https://www.youtube.com/embed/' + id_video + '?autoplay=1';

            document.querySelector('.' + class_video + ' #sis_player').setAttribute('src', url_video);
        });
    });
}, false);