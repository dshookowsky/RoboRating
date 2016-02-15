angular.module('roboRating.services', ['ngCordova'])
        .factory('Ratings', function ($q, $cordovaSQLite) {
            var ratingsHash = {};
            return {
                all: function () {
                    var deferred = $q.defer();

                    var array_values = [];

                    if (db) {
                        var query = "SELECT ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete FROM ratings;";
                        $cordovaSQLite.execute(db, query, []).then(function (res) {
                            if (res.rows.length > 0) {
                                for (var index = 0; index < res.rows.length; index++) {
                                    var rating = res.rows.item(index);

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
                                        scoresClimbers: rating.scoresClimbers == true,
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
                                    }
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
                get: function (ratingId) {
                    return ratingsHash[ratingId] || null;
                },
                insert: function (rating) {
                    ratingId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                    rating.ratingId = ratingId;

                    console.log("Inserting new record for " + ratingId);
                    var query = "INSERT INTO ratings (ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);";
                    $cordovaSQLite.execute(db, query, [rating.ratingId, rating.roundNumber, rating.team.name, rating.team.id, rating.alliance, rating.hasAutonomous ? 1 : 0, rating.rescueBeacon ? 1 : 0, rating.autonomousClimbers, rating.autonomousParking, rating.consistency, rating.lowDebris, rating.midDebris, rating.highDebris, rating.teleopParking, rating.scoresClimbers ? 1 : 0, rating.ziplineClimbers, rating.scoresDebris ? 1 : 0, rating.debrisInFloor, rating.endgameParking, rating.allClear ? 1 : 0, rating.totalPoints, rating.overallConsistency, rating.driverControl, rating.climbSpeed, rating.endurance, rating.notes, rating.complete ? 1 : 0]).then(function (res) {
                        console.log("insertId: " + res.insertId);
                    }, function (err) {
                        console.dir(err);
                    });

                    ratingsHash[ratingId] = rating;
                },
                save: function (rating) {
                    ratingsHash[rating.ratingId] = rating;
                    var query = "UPDATE ratings SET roundNumber = ?, teamName = ?, teamNumber = ?, alliance = ?, hasAutonomous = ?, rescueBeacon = ?, autonomousClimbers = ?, autonomousParking = ?, consistency = ?, lowDebris= ?, midDebris = ?, highDebris = ?, teleopParking = ?, scoresClimbers = ?, ziplineClimbers = ?, scoresDebris = ?, debrisInFloor = ?, endgameParking = ?, allClear = ?, totalPoints = ?, overallConsistency = ?, driverControl = ?, climbSpeed = ?, endurance = ?, notes = ?, complete = ? WHERE ratingId = ?;";
                    $cordovaSQLite.execute(db, query, [rating.roundNumber, rating.team.name, rating.team.id, rating.alliance, rating.hasAutonomous ? 1 : 0, rating.rescueBeacon ? 1 : 0, rating.autonomousClimbers, rating.autonomousParking, rating.consistency, rating.lowDebris, rating.midDebris, rating.highDebris, rating.teleopParking, rating.scoresClimbers ? 1 : 0, rating.ziplineClimbers, rating.scoresDebris ? 1 : 0, rating.debrisInFloor, rating.endgameParking, rating.allClear ? 1 : 0, rating.totalPoints, rating.overallConsistency, rating.driverControl, rating.climbSpeed, rating.endurance, rating.notes, rating.complete ? 1 : 0, rating.ratingId]).then(function (res) {
                    }, function (err) {
                        console.dir(err);
                    });
                }
            };
        })

        .factory('Teams', function () {
            var teams = [
                {"id": 118, "name": "Steel Hornets"},
                {"id": 2753, "name": "Team Overdrive"},
                {"id": 3283, "name": "SciBots"},
                {"id": 3305, "name": "SciBots2"},
                {"id": 3795, "name": "Jag Wired"},
                {"id": 4077, "name": "MASH"},
                {"id": 4185, "name": "Silver Soldiers"},
                {"id": 4311, "name": "Watt The Hex?"},
                {"id": 4999, "name": "Imagine It"},
                {"id": 5910, "name": "Sparks"},
                {"id": 6022, "name": "TBD - To Be Determined"},
                {"id": 6191, "name": "Short Circuits"},
                {"id": 6378, "name": "Jaybots"},
                {"id": 7244, "name": "OUT of the BOX"},
                {"id": 7314, "name": "Sab-BOT-age"},
                {"id": 7416, "name": "Silver Spartans"},
                {"id": 7423, "name": "Flaming Phoenix"},
                {"id": 7786, "name": "Blue Streak"},
                {"id": 8221, "name": "Cubix^3"},
                {"id": 8468, "name": "The Iron Struct"},
                {"id": 8645, "name": "Robotic Doges"},
                {"id": 8867, "name": "Broken Image Link"},
                {"id": 8884, "name": "RoboPanthers"},
                {"id": 8992, "name": "University Scholars Program The Eternity Coders (TEC)"},
                {"id": 9242, "name": "GearHounds"},
                {"id": 9791, "name": "Divide by Zero"},
                {"id": 9794, "name": "Wizards.exe"},
                {"id": 9863, "name": "MASHellaneous"},
                {"id": 9872, "name": "(In)Formal Logic"},
                {"id": 9979, "name": "Cougars"},
                {"id": 10098, "name": "2 Eyed Illuminati"},
                {"id": 10333, "name": "TechSpark"},
                {"id": 10375, "name": "Bot Builders"},
                {"id": 10795, "name": "RAMDROIDS"},
                {"id": 10842, "name": "Train of Thought"}
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