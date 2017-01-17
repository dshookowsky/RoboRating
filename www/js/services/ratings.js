angular.module('roboRating.services')
.factory('Ratings', function ($q, $cordovaSQLite) {

    return {
        fields: [
            {
                name: "ratingId",
                type: "text",
                sqlExtra: "primary key" 
            },
            {
                name: "roundNumber",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "teamName",
                type: "text",
                sqlExtra: "" 
            },
            {
                name: "teamNumber",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "alliance",
                type: "text",
                sqlExtra: "" 
            },
            {
                name: "hasAutonomous",
                type: "bool",
                sqlExtra: "" 
            },
            {
                name: "autonBeacons",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "autonParticlesShot",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "autonParticlesScored",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "autonomousParking",
                type: "text",
                sqlExtra: "" 
            },                                                
            {
                name: "autonCapBall",
                type: "bool",
                sqlExtra: "" 
            },
            {
                name: "teleopCornerShots",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "teleopCornerScores ",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "teleopVortexShots",
                type: "int",
                sqlExtra: "" 
            },                                                
            {
                name: "teleopVortexScores",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "teleopBeacons",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "shotLocation",
                type: "text",
                sqlExtra: "" 
            },
            {
                name: "capBallLocation",
                type: "text",
                sqlExtra: "" 
            },                                                            
            {
                name: "finalBeacons",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "totalPoints",
                type: "int",
                sqlExtra: "" 
            },
            {
                name: "notes",
                type: "text",
                sqlExtra: "" 
            },
            {
                name: "complete",
                type: "bool",
                sqlExtra: "" 
            }
        ],

        all: function () {
            var deferred = $q.defer();

            var ratings = [];

            /* When the app first starts, db may not be initialized.  Return an empty array */
            if (db) {
                var query = "SELECT " + this.fields.map(function(a) { return a.name }).join(",") + " FROM ratings;";

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
                                autonBeacons: rating.autonBeacons,
                                autonParticlesShot: rating.autonParticlesShot,
                                autonParticlesScored: rating.autonParticlesScored,
                                autonomousParkingLocation: rating.autonomousParkingLocation,
                                autonCapBall: rating.autonCapBall == true,
                                teleopCornerShots: rating.teleopCornerShots,
                                teleopCornerScores: rating.teleopCornerScores,
                                teleopVortexShots: rating.teleopVortexShots,
                                teleopVortexScores: rating.teleopVortexScores,
                                teleopBeacons: rating.teleopBeacons,
                                shotLocation: rating.shotLocation,
                                capBallLocation: rating.capBallLocation,
                                finalBeacons: rating.finalBeacons,
                                totalPoints: rating.totalPoints,
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

          var query = "SELECT " + this.fields.map(function(a) { return a.name }).join(",") + " FROM ratings WHERE ratingId = ?;";

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
                                autonBeacons: rating.autonBeacons,
                                autonParticlesShot: rating.autonParticlesShot,
                                autonParticlesScored: rating.autonParticlesScored,
                                autonomousParkingLocation: rating.autonomousParkingLocation,
                                autonCapBall: rating.autonCapBall == true,
                                teleopCornerShots: rating.teleopCornerShots,
                                teleopCornerScores: rating.teleopCornerScores,
                                teleopVortexShots: rating.teleopVortexShots,
                                teleopVortexScores: rating.teleopVortexScores,
                                teleopBeacons: rating.teleopBeacons,
                                shotLocation: rating.shotLocation,
                                capBallLocation: rating.capBallLocation,
                                finalBeacons: rating.finalBeacons,
                                totalPoints: rating.totalPoints,
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
            
            rating.teamName = rating.team.name;
            rating.teamNumber = rating.team.id;
            rating.totalPoints = this.score(rating);

            console.log("Inserting new record for " + ratingId);
            var query = "INSERT INTO ratings (" + this.fields.map(function(f) { return f.name }).join(",") + ") VALUES (" + this.fields.map(function () { return '?'}).join(",")  + ")";

            console.log(query);
            var values = [
                rating.ratingId,
                rating.roundNumber,
                rating.teamName,
                rating.teamNumber,
                rating.alliance,
                rating.hasAutonomous ? 1 : 0,
                rating.autonBeacons,
                rating.autonParticlesShot,
                rating.autonParticlesScored,
                rating.autonomousParking,
                rating.autonCapBall ? 1 : 0,
                rating.teleopCornerShots,
                rating.teleopCornerScores,
                rating.teleopVortexShots,
                rating.teleopVortexScores,
                rating.teleopBeacons,
                rating.shotLocation,
                rating.capBallLocation,
                rating.finalBeacons,
                rating.totalPoints,
                rating.notes,
                rating.complete ? 1 : 0
            ];

            try {
            $cordovaSQLite.execute(db, query, values).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.dir(err);
            });
            } catch (ex) { 
                console.log(ex);
            }
        },
        save: function (rating) {
            rating.totalPoints = this.score(rating);

            /*
            var query = "INSERT OR REPLACE INTO ratings (ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);";
            */
            var query = "INSERT OR REPLACE INTO ratings (" + this.fields.map(function(f) { return f.name }).join(",") + ") VALUES (" + this.fields.map(function () { return "?"}).join(",") + ");";


            var values = [
                rating.ratingId,
                rating.roundNumber,
                rating.team.name,
                rating.team.id,
                rating.alliance,
                rating.hasAutonomous ? 1 : 0,
                rating.autonBeacons,
                rating.autonParticlesShot,
                rating.autonParticlesScored,
                rating.autonomousParking,
                rating.autonCapBall ? 1 : 0,
                rating.teleopCornerShots,
                rating.teleopCornerScores,
                rating.teleopVortexShots,
                rating.teleopVortexScores,
                rating.teleopBeacons,
                rating.shotLocation,
                rating.capBallLocation,
                rating.finalBeacons,
                rating.totalPoints,
                rating.notes,
                rating.complete ? 1 : 0
            ];
            /*
            this.fields.map(function(f) { 
                if (rating.hasOwnProperty(f.name)) {
                    if (f.type === "bool") {
                         return rating[f.name] ? 1 : 0;
                    }
                    else {
                        return rating[f.name];
                    }
                }
            })
            */

            $cordovaSQLite.execute(db, query, values).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.dir(err);
            });            
        },

        /* Calculate the total score */
        score: function (rating) {
            var total = 0;

            /* Autonomous */
            total += rating.autonBeacons ? rating.autonBeacons * 30 : 0;
            total += rating.autonCapBall ? 5 : 0;
            total += rating.autonParticlesScored ? rating.autonParticlesScored * 15 : 0;

            switch (rating.autonomousParking) {
                case "Corner (Partial)" : total += 5; break;
                case "Corner (Full)" : total += 10; break;
                case "Vortex (Partial)" : total += 5; break;
                case "Vortex (Full)" : total += 10; break;
            }

            /* Teleop */
            total += rating.teleopCornerScores ? rating.teleopCornerScores * 1 : 0;
            total += rating.teleopVortexScores ? rating.teleopVortexScores * 5 : 0;

            /* Endgame */
            switch (rating.capBallLocation) {
                case "Floor" : total += 0; break;
                case "1-29" : total += 10; break;
                case "30+" : total += 20; break;
                case "Capped" : total += 40; break
            }
            total += rating.finalBeacons ? rating.finalBeacons *  10 : 0;

            return total;
        },
        /*
        Return an array of teams ordered by average points scored
        */
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
