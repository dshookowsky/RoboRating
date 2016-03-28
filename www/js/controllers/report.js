angular.module('roboRating.controllers')
  .controller('ReportCtrl', function ($scope, Ratings, Teams, $ionicLoading) {
      Ratings.sort().then(function (ratings) {
              $scope.ratings = ratings;
              $ionicLoading.hide();

              /*
              ratings = [];
              teams = Teams.all();

              for (var teamIndex = 0; teamIndex < teams.length; teamIndex++) {
                  var team = teams[teamIndex];
                  ratings.push({
                      teamNumber: team.id,
                      teamName: team.name,
                      averagePoints: Math.floor(Math.random() * 500) + 1
                  });
              }
              */
              $scope.graphData = ratings;
      });
  });
