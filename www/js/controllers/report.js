angular.module('roboRating.controllers')
  .controller('ReportCtrl', function ($scope, Ratings, $ionicLoading) {
      Ratings.sort().then(function (ratings) {
              $scope.ratings = ratings;
              $ionicLoading.hide();
      });
  });
