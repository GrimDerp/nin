'use strict';

angular.module('nin').directive('demo', function($interval, demo) {
  return {
    restrict: 'E',
    template: '<div class=demo-container></div>',
    link: function(scope, element) {
      demo.setContainer(element[0].children[0]);

      var rect = element[0].children[0].getBoundingClientRect();
      $interval(function() {
        var newRect = element[0].children[0].getBoundingClientRect();
        if(newRect.width != rect.width || newRect.height != rect.height) {
          rect = newRect;
          demo.resize();
        }
      }, 100);


      scope.$watch('fullscreen', function (toFullscreen){
        if (toFullscreen) {
          // go to fullscreen
          element[0].children[0].classList.add('fullscreen')
        } else {
          // exit fullscreen
          element[0].children[0].classList.remove('fullscreen')
        }
        demo.resize();
      })

      $interval(function() {
        scope.$parent.$parent.currentFrame = demo.getCurrentFrame();
        scope.$parent.$parent.duration = demo.music.duration * 60;
      }, 1000 / 60);

      setTimeout(function(){
        demo.start();
        demo.music.pause();
      }, 0);
    }
  };
});
