angular.module('roboRating.controllers')
.controller('NewRatingCtrl', function($scope, $ionicHistory, Ratings, Teams, Locations) {
    $scope.teams = Teams.all();
    $scope.locations = Locations.all();

    var round = {
        number: null,
        ratings: []
    };

    for (var index=0; index < 4; index++) {
        round.ratings.push({
            ratingId: null,
            roundNumber: null,
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
        });
    }
    $scope.round = round;

    $scope.insert = function () {
        var roundNumber = $scope.round.number;

        for (var index=0; index < 4; index++) {
            var rating = $scope.round.ratings[index];

            if (rating.team.id && roundNumber != null) {
                rating.roundNumber = roundNumber;
                Ratings.insert(rating);
            }
        }
        $ionicHistory.goBack();
    };
});
