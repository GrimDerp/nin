'use strict';

angular.module('nin')
  .controller('BottomCtrl', function ($scope, $interval, $q) {

    var linesContainer = null;

    $scope.onBottomScroll = function(event) {
      linesContainer = event.target;
      $scope.bottomScrollOffset = event.target.scrollLeft;
    };

    $scope.musicLayerClick = function($event) {
      $scope.demo.jumpToFrame($event.offsetX);
    };

    $interval(function(){
      $scope.hideMarker = false;
      if(!linesContainer) {
        return;
      }
      if(linesContainer.scrollLeft > $scope.currentFrame ||
        $scope.currentFrame >= linesContainer.scrollLeft + $q(linesContainer).width()) {
        $scope.hideMarker = true;
      } else {
        $scope.hideMarker = false;
      }
    }, 1000 / 60);
  });