angular.module('roboRating.controllers')
.controller('NewRatingCtrl', function($scope, $ionicHistory, Ratings, Teams, Locations) {
      $scope.teams = Teams.all();
      $scope.locations = Locations.all();

      $scope.rating = {
          ratingId: null,
          roundNumbe: null,
          team: {},
          alliance: "Blue",
          hasAutonomous: false,
          rescueBeacon: false,
          autonomousClimbers: null,
          autonomousParking: null,
          consistency: null,
          lowDebris: null,
          midDebris: null,
          highDebris: null,
          teleopParking: null,
          scoresClimbers: null,
          ziplineClimbers: null,
          scoresDebris: false,
          debrisInFloor: null,
          endgameParking: null,
          allClear: false,
          totalPoints: null,
          overallConsistency: null,
          driverControl: null,
          climbSpeed: null,
          endurance: null,
          notes: null,
          complete: false
      };

      $scope.insert = function () {
          Ratings.insert($scope.rating);
          $ionicHistory.goBack();
      };
  });
