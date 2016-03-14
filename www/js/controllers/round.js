angular.module('roboRating.controllers')
  .controller('RoundCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, Rounds) {

    // Set the pageTitle early to make sure it displays
    $scope.pageTitle = "Round - " + $stateParams.roundNumber;

    Rounds.get($stateParams.roundNumber).then(function (result) {
        $scope.round = result;

        $ionicSlideBoxDelegate.update();
    });
  });
