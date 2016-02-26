angular.module("roboRating.controllers")
        .controller('RatingCtrl', function ($scope, $rootScope, $ionicHistory, $stateParams, $cordovaDialogs, Ratings, Teams, Locations) {
            $scope.teams = Teams.all();
            $scope.locations = Locations.all();

            $scope.rating = Ratings.get($stateParams.ratingId);
            
            $scope.deleteRecord = function () {
                $cordovaDialogs.confirm("Delete this record?", "Delete", ["OK", "Cancel"]).then(
                        function (buttonIndex) {
                            if (buttonIndex === 1) {
                                Ratings.delete($scope.rating.ratingId, function () {                                    
                                    $ionicHistory.goBack();                                    
                                });
                            }
                        });
            };
            
            $scope.edit = function () {
                Ratings.save($scope.rating);
                $ionicHistory.goBack();
            };
            
            $scope.markComplete = function() {
                $scope.rating.complete = true; 
                Ratings.save($scope.rating);
            };
           
            $scope.markIncomplete = function () {
                $scope.rating.complete = false;
                Ratings.save($scope.rating);
            };                       
        })
                
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
        })

;

