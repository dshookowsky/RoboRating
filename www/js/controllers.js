angular.module('roboRating.controllers', [])

        .controller('MainCtrl', function ($scope, $cordovaSQLite, Teams, Locations) {
            $scope.teams = Teams.all();
            $scope.locations = Locations.all();

            var db = $cordovaSQLite.openDB({ name: "ratings.db" });

            $scope.save = function () {
                /*
                var createQuery = "CREATE TABLE IF NOT EXISTS ratings (isMatch bit, ratedTeam int, roundNumber int, allianceColor varchar(5), alliancePartner int, opposition1 int, opposition2 int, hasAutonomous bit, rescueBeacon bit, autonomousClimbers int,  autonomousParking varchar(20), consistency int, lowDebris int, midDebris int, highDebris int, teleopParking varchar(20), scoresClimbers bit, ziplineClimbers int, scoresDebris bit, debrisInFloor int, endgameParking varchar(20), allClear bit, totalPoints int, overallConsistency int, driverControl int, climbSpeed int, endurance int, notes varchar(255));";
                $cordovaSQLite.execute(db, createQuery, [], )
                var query = "INSERT INTO ratings (isMatch, ratedTeam, roundNumber, allianceColor, alliancePartner, opposition1, opposition2, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes); VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
                  console.log("insertId: " + res.insertId);
                }, function (err) {
                  console.error(err);
                });
                */
            };
        });