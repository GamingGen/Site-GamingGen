/**
 * Created by alexandre.leclerc on 16/12/2015.
 */
'use strict';
angular.module('frontPlayer',
    [
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.buffering"
    ]
)
    .controller('FrontCtrl',
    ["$sce","$timeout", function ($sce, $timeout) {
        var controller = this;
        controller.API = null;
        controller.onPlayerReady = function (API) {
            controller.API = API;
        };
        controller.videos = [
            {
                sources: [
                    {
                        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),
                        type: "video/mp4"
                    },
                    {
                        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),
                        type: "video/webm"
                    },
                    {
                        src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),
                        type: "video/ogg"
                    }
                ]
            },
            {
                sources: [
                    {
                        src: $sce.trustAsResourceUrl("http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_stereo.ogg"),
                        type: "video/ogg"
                    }
                ]
            }
        ];

        controller.config = {
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            sources: controller.videos[0].sources,
            theme: {
                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            },
            plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png"
            }
        };

        controller.setVideo = function (index) {
            controller.API.stop();
            controller.config.sources = controller.videos[index].sources;
            $timeout(function() {
                controller.API.play();
            }, 500);
        };

        $sce.callAtTimeout = function() {
            controller.API.play();
        };

        $timeout( function(){ $sce.callAtTimeout(); }, 500);
    }]
);

function callAtTimeout() {
    console.log("Timeout occurred");
}