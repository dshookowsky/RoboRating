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
            autonBeacons: null,
            autonParticlesShot: null,
            autonParticlesScored: null,
            autonomousParking: null,
            autonCapBall: null,
            teleopCornerShots: null,
            teleopCornerScores: null,
            teleopVortexShots: null,
            teleopVortexScores: null,
            teleopBeacons: null,
            shotLocation: null,
            capBallLocation: null,
            finalBeacons: null,
            totalPoints: null,
            notes: null,
            complete: false
        });
    }
    $scope.round = round;

    $scope.insert = function () {
        var roundNumber = $scope.round.number;

        if (roundNumber) {
            for (var index=0; index < 4; index++) {
                var rating = $scope.round.ratings[index];

                if (rating.team.id && roundNumber != null) {
                    rating.roundNumber = roundNumber;
                    Ratings.insert(rating);
                }
            }
            $ionicHistory.goBack();
        } else {
            alert('Missing round number');
        }
    };
});
