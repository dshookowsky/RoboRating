angular.module('roboRating.services', ['ngCordova'])
        .factory('Ratings', function ($q, $cordovaSQLite) {
            var ratingsHash = {};
            return {                
                all: function () {
                    var deferred = $q.defer();

                    var array_values = [];

                    /* When the app first starts, db may not be initialized.  Return an empty array */
                    if (db) {
                        var query = "SELECT ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete FROM ratings;";
                        $cordovaSQLite.execute(db, query, []).then(function (res) {
                            if (res.rows.length > 0) {
                                for (var index = 0; index < res.rows.length; index++) {
                                    var rating = res.rows.item(index);

                                    /* cast 1 => true / 0 => false */
                                    ratingsHash[rating.ratingid] = {
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
                            }
                            for (var ratingId in ratingsHash) {
                                if (ratingsHash.hasOwnProperty(ratingId)) {
                                    array_values.push(ratingsHash[ratingId]);
                                }
                            }

                            deferred.resolve(array_values);
                        }, function (err) {
                            console.dir(err);
                        });
                    }

                    return deferred.promise;
                },
                delete: function (ratingId, callback) {
                    var query = "DELETE FROM ratings WHERE ratingId = ?;";
                    delete ratingsHash[ratingId];
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
                    return ratingsHash[ratingId] || null;
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

                    ratingsHash[ratingId] = rating;
                },
                save: function (rating) {
                    ratingsHash[rating.ratingId] = rating;
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
                    total += rating.autonomousClimbers ? rating.autonomousClimbers * 10 : 0;
                    switch (rating.autonomousParking) {
                        case "Floor" : total += 5;
                        case "Low" : total += 10;
                        case "Mid" : total += 20;
                        case "High" : total += 40;
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
                        case "Floor" : total += 5;
                        case "Low" : total += 10;
                        case "Mid" : total += 15;
                        case "High" : total += 40;
                        case "Hang" : total += 80;
                    }
                    total += rating.allClear ? 20 : 0;
                    
                    return total;
                },
                sort: function () {
                    var deferred = $q.defer();

                    var array_values = [];

                    /* When the app first starts, db may not be initialized.  Return an empty array */
                    if (db) {
                        var query = "SELECT teamName, teamNumber, SUM(totalPoints) as totalPoints FROM ratings GROUP BY teamName, teamNumber ORDER BY sum(totalPoints) DESC;";
                        $cordovaSQLite.execute(db, query, []).then(function (res) {
                            if (res.rows.length > 0) {
                                for (var index = 0; index < res.rows.length; index++) {
                                    var rating = res.rows.item(index);

                                    array_values.push({
                                        teamName: rating.teamName,
                                        teamNumber: rating.teamNumber,
                                        totalPoints: rating.totalPoints
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
        })

        .factory('Teams', function () {
            var teams = [
                {"id": 61, "name": "Ozone"},
                {"id": 365, "name": "MOE"},
                {"id": 395, "name": "Archmere Robauktics"},
                {"id": 2753, "name": "Team Overdrive"},
                {"id": 2818, "name": "G-FORCE"},
                {"id": 3113, "name": "Some Disassembly Required"},
                {"id": 3305, "name": "SciBot2"},
                {"id": 4149, "name": "Terabytes"},
                {"id": 4185, "name": "Silver Soldiers"},
                {"id": 4433, "name": "Smokin' Motors"},
                {"id": 5029, "name": "PowerStackers"},
                {"id": 5169, "name": "Watt's Up?"},
                {"id": 5421, "name": "RM'd and Dangerous"},
                {"id": 5484, "name": "Enderbots"},
                {"id": 6045, "name": "foobar"},
                {"id": 6054, "name": "int elligence;"},
                {"id": 6378, "name": "Jaybots"},
                {"id": 6552, "name": "N.E.R.D.S."},
                {"id": 6640, "name": "Robotussin"},
                {"id": 6676, "name": "RoboLancers Crimson"},
                {"id": 6964, "name": "Team Igutech"},
                {"id": 7055, "name": "Cruzin Comets Blue"},
                {"id": 7056, "name": "Cruzin Comets White"},
                {"id": 7060, "name": "Team RobotiX"},
                {"id": 7244, "name": "Out of the Box Robotics"},
                {"id": 7314, "name": "Sab-BOT-age"},
                {"id": 7350, "name": "Watt's NXT?"},
                {"id": 8121, "name": "RMageddon"},
                {"id": 8393, "name": "Giant Diencephalic BrainSTEM Robotics Team"},
                {"id": 8468, "name": "The Iron Struct"},
                {"id": 8509, "name": "STEEL Serpents"},
                {"id": 8528, "name": "Rhyme Know Reason"},
                {"id": 8645, "name": "Robotic Doges"},
                {"id": 9854, "name": "Penn Charter Robotics"},
                {"id": 9872, "name": "(In)Formal Logic"},
                {"id": 10771, "name": "Le Pamplemousse"}
            ];

            return {
                all: function () {
                    return teams;
                },
                get: function (teamId) {
                    for (var i = 0; i < teams.length; i++) {
                        if (teams[i].id === parseInt(teamId)) {
                            return teams[i];
                        }
                    }
                    return null;
                }
            };
        })

        .factory('Locations', function () {
            var locations = [
                'None',
                'Floor',
                'Low',
                'Middle',
                'High',
                'Hang'
            ];

            return {
                all: function () {
                    return locations;
                }
            };
        });