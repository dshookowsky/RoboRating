angular.module('roboRating.services')
.factory('Ratings', function ($q, $cordovaSQLite) {

    return {
        all: function () {
            var deferred = $q.defer();

            var ratings = [];

            /* When the app first starts, db may not be initialized.  Return an empty array */
            if (db) {
                var query = "SELECT ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete FROM ratings;";
                $cordovaSQLite.execute(db, query, []).then(function (res) {
                    if (res.rows.length > 0) {
                        for (var index = 0; index < res.rows.length; index++) {
                            var rating = res.rows.item(index);

                            /* cast 1 => true / 0 => false */
                            ratings.push({
                                ratingId: rating.ratingid,
                                roundNumber: rating.roundNumber,
                                team: {id: rating.teamNumber, name: rating.teamName},
                                alliance: rating.alliance,
                                hasAutonomous: rating.hasAutonomous == true,
                                rescueBeacon: rating.rescueBeacon == true,
                                autonomousClimbers: rating.autonomousClimbers,
                                autonomousParking: rating.autonomousParking,
                                consistency: rating.consistency,
                                lowDebris: rating.lowDebris,
                                midDebris: rating.midDebris,
                                highDebris: rating.highDebris,
                                teleopParking: rating.teleopParking,
                                scoresClimbers: rating.scoresClimbers,
                                ziplineClimbers: rating.ziplineClimbers,
                                scoresDebris: rating.scoresDebris == true,
                                debrisInFloor: rating.debrisInFloor,
                                endgameParking: rating.endgameParking,
                                allClear: rating.allClear == true,
                                totalPoints: rating.totalPoints,
                                overallConsistency: rating.overallConsistency,
                                driverControl: rating.driverControl,
                                climbSpeed: rating.climbSpeed,
                                endurance: rating.endurance,
                                notes: rating.notes,
                                complete: rating.complete == true
                            });
                        }
                    }

                    deferred.resolve(ratings);
                }, function (err) {
                    console.dir(err);
                });
            }

            return deferred.promise;
        },
        delete: function (ratingId, callback) {
            var query = "DELETE FROM ratings WHERE ratingId = ?;";

            $cordovaSQLite.execute(db, query, [ratingId]).then(
                    function (res) {
                        console.dir(res);
                        callback();
                    },
                    function (error) {
                        console.dir(error);
                    }
            );
        },
        get: function (ratingId) {
          var deferred = $q.defer();

          var query = "SELECT ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete FROM ratings where ratingId = ?;";

          var rating = null;

          $cordovaSQLite.execute(db, query, [ratingId]).then(function (res) {
              if (res.rows.length > 0) {
                      var rating = res.rows.item(0);

                      /* cast 1 => true / 0 => false */
                      rating = {
                          ratingId: rating.ratingid,
                          roundNumber: rating.roundNumber,
                          team: {id: rating.teamNumber, name: rating.teamName},
                          alliance: rating.alliance,
                          hasAutonomous: rating.hasAutonomous == true,
                          rescueBeacon: rating.rescueBeacon == true,
                          autonomousClimbers: rating.autonomousClimbers,
                          autonomousParking: rating.autonomousParking,
                          consistency: rating.consistency,
                          lowDebris: rating.lowDebris,
                          midDebris: rating.midDebris,
                          highDebris: rating.highDebris,
                          teleopParking: rating.teleopParking,
                          scoresClimbers: rating.scoresClimbers,
                          ziplineClimbers: rating.ziplineClimbers,
                          scoresDebris: rating.scoresDebris == true,
                          debrisInFloor: rating.debrisInFloor,
                          endgameParking: rating.endgameParking,
                          allClear: rating.allClear == true,
                          totalPoints: rating.totalPoints,
                          overallConsistency: rating.overallConsistency,
                          driverControl: rating.driverControl,
                          climbSpeed: rating.climbSpeed,
                          endurance: rating.endurance,
                          notes: rating.notes,
                          complete: rating.complete == true
                      };
                  }
                  deferred.resolve(rating);
          }, function (err) {
              console.dir(err);
          });

          return deferred.promise;
        },
        insert: function (rating) {
            /* create a uuid - there's a small non-zero chance of collision */
            ratingId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            rating.ratingId = ratingId;
            rating.totalPoints = this.score(rating);

            console.log("Inserting new record for " + ratingId);
            var query = "INSERT INTO ratings (ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);";
            $cordovaSQLite.execute(db, query, [rating.ratingId, rating.roundNumber, rating.team.name, rating.team.id, rating.alliance, rating.hasAutonomous ? 1 : 0, rating.rescueBeacon ? 1 : 0, rating.autonomousClimbers, rating.autonomousParking, rating.consistency, rating.lowDebris, rating.midDebris, rating.highDebris, rating.teleopParking, rating.scoresClimbers, rating.ziplineClimbers, rating.scoresDebris ? 1 : 0, rating.debrisInFloor, rating.endgameParking, rating.allClear ? 1 : 0, rating.totalPoints, rating.overallConsistency, rating.driverControl, rating.climbSpeed, rating.endurance, rating.notes, rating.complete ? 1 : 0]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.dir(err);
            });
        },
        save: function (rating) {
            rating.totalPoints = this.score(rating);
            var query = "INSERT OR REPLACE INTO ratings (ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);";
            $cordovaSQLite.execute(db, query, [rating.ratingId, rating.roundNumber, rating.team.name, rating.team.id, rating.alliance, rating.hasAutonomous ? 1 : 0, rating.rescueBeacon ? 1 : 0, rating.autonomousClimbers, rating.autonomousParking, rating.consistency, rating.lowDebris, rating.midDebris, rating.highDebris, rating.teleopParking, rating.scoresClimbers, rating.ziplineClimbers, rating.scoresDebris ? 1 : 0, rating.debrisInFloor, rating.endgameParking, rating.allClear ? 1 : 0, rating.totalPoints, rating.overallConsistency, rating.driverControl, rating.climbSpeed, rating.endurance, rating.notes, rating.complete ? 1 : 0]).then(function (res) {
            }, function (err) {
                console.dir(err);
            });
        },
        score: function (rating) {
            var total = 0;

            /* Autonomous */
            total += rating.rescueBeacon ? 20 : 0;

            //* count each climber 2x in Autonomous
            total += rating.autonomousClimbers ? rating.autonomousClimbers * 20 : 0;

            switch (rating.autonomousParking) {
                case "Floor" : total += 5; break;
                case "Low" : total += 10; break;
                case "Mid" : total += 20; break;
                case "High" : total += 40; break;
            }

            /* Teleop */
            total += rating.debrisInFloor ? rating.debrisInFloor * 1 : 0;
            total += rating.lowDebris ? rating.lowDebris * 5 : 0;
            total += rating.midDebris ? rating.midDebris * 10 : 0;
            total += rating.highDebris ? rating.highDebris * 15 : 0;

            total += rating.scoresClimbers ? rating.scoresClimbers * 10 : 0;
            total += rating.ziplineClimbers ? rating.ziplineClimbers * 20 : 0;

            /* Endgame */
            switch (rating.endgameParking) {
                case "Floor" : total += 5; break;
                case "Low" : total += 10; break;
                case "Mid" : total += 15; break;
                case "High" : total += 40; break;
                case "Hang" : total += 80; break;
            }
            total += rating.allClear ? 20 : 0;

            return total;
        },
        sort: function () {
            var deferred = $q.defer();

            var array_values = [];

            /* When the app first starts, db may not be initialized.  Return an empty array */
            if (db) {
                var query = "SELECT teamName, teamNumber, SUM(totalPoints)/count(totalPoints) as averagePoints FROM ratings GROUP BY teamName, teamNumber ORDER BY SUM(totalPoints)/count(totalPoints) DESC;";
                $cordovaSQLite.execute(db, query, []).then(function (res) {
                    if (res.rows.length > 0) {
                        for (var index = 0; index < res.rows.length; index++) {
                            var rating = res.rows.item(index);

                            array_values.push({
                                teamName: rating.teamName,
                                teamNumber: rating.teamNumber,
                                averagePoints: rating.averagePoints
                            })
                        }
                    }

                    deferred.resolve(array_values);
                }, function (err) {
                    console.dir(err);
                });
            }

            return deferred.promise;
        }
    };
});
