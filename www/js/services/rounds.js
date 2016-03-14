angular.module('roboRating.services')
  .factory('Rounds', function ($q, $cordovaSQLite) {
    return {
      /**
      @function all
      Return all round numbers that have been entered into the database
      */
      all: function () {
        var deferred = $q.defer();

        var rounds = [];

        if (db) {
          var query = "SELECT roundNumber, sum(complete) as complete, count(complete) as rated from ratings group by roundNumber;"

          $cordovaSQLite.execute(db, query, []).then(function (res) {
            for (var roundIndex = 0; roundIndex < res.rows.length; roundIndex++) {
              var row = res.rows.item(roundIndex);

              rounds.push({
                roundNumber: row.roundNumber,
                complete: row.complete === row.rated
              });
            }
            deferred.resolve(rounds);
          })
        }

        return deferred.promise;
      },

      get: function (roundNumber) {
        var deferred = $q.defer();

        var query = "SELECT ratingId, roundNumber, teamName, teamNumber, alliance, hasAutonomous, rescueBeacon, autonomousClimbers, autonomousParking, consistency, lowDebris, midDebris, highDebris, teleopParking, scoresClimbers, ziplineClimbers, scoresDebris, debrisInFloor, endgameParking, allClear, totalPoints, overallConsistency, driverControl, climbSpeed, endurance, notes, complete FROM ratings where roundNumber = ? ORDER BY teamNumber;";

        var ratings = [];
        $cordovaSQLite.execute(db, query, [roundNumber]).then(function (res) {
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

            deferred.resolve({
              roundNumber: roundNumber,
              ratings: ratings
            });
        }, function (err) {
            console.dir(err);
        });

        return deferred.promise;
      }
  }
});
