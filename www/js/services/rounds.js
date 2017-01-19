angular.module('roboRating.services')
  .factory('Rounds', function ($q, $cordovaSQLite, Ratings) {
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

        var query = "SELECT " + Ratings.fields.map(function (f) { return f.name}).join(",") + " FROM ratings where roundNumber = ? ORDER BY teamNumber;";

        var ratings = [];
        $cordovaSQLite.execute(db, query, [roundNumber]).then(function (res) {
            if (res.rows.length > 0) {
                for (var index = 0; index < res.rows.length; index++) {
                    var rating = res.rows.item(index);

                    /* cast 1 => true / 0 => false */
                    ratings.push({
                        ratingId: rating.ratingId,
                        roundNumber: rating.roundNumber,
                        team: {id: rating.teamNumber, name: rating.teamName},
                        alliance: rating.alliance,
                        hasAutonomous: rating.hasAutonomous == true,
                        autonBeacons: rating.autonBeacons,
                        autonParticlesShot: rating.autonParticlesShot,
                        autonParticlesScored: rating.autonParticlesScored,
                        autonomousParking: rating.autonomousParking,
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
