(function() {
  'use strict';

  angular.module('nin').factory('demo', function(commands, $rootScope){
    var demo = bootstrap({
      rootPath: '//localhost:9000/',
    });

    window.demo = demo;

    $rootScope.globalJSErrors = $rootScope.globalJSErrors || {};
    var originalLoop = demo.looper.loop;
    demo.looper.loop = function() {
      try {
        originalLoop();

        delete $rootScope.globalJSErrors.looper;
      } catch(e) {
        e.context = "Error during looping of demo";
        $rootScope.globalJSErrors.looper = e;

        requestAnimFrame(demo.looper.loop);
      }
    };

    commands.on('playPause', function() {
      if(demo.music.paused) {
        demo.music.play();
      } else {
        demo.music.pause();
      }
    });

    commands.on('pause', function() {
      demo.music.pause();
    });

    commands.on('jog', function(amount) {
      demo.jumpToFrame(demo.getCurrentFrame() + amount);
    });

    commands.on('jumpToFrame', function(frame) {
      demo.jumpToFrame(frame);
    });

    commands.on('setPlaybackRate', function(rate) {
      demo.music.setPlaybackRate(rate);
    });

    var showCameraPathVisualizations = false;
    commands.on('toggleCameraPathVisualizations', function() {
      var showCameraPathVisualizations = !showCameraPathVisualizations;
      demo.lm.showCameraPathVisualizations(showCameraPathVisualizations);
    });

    return demo;
  });
})();
