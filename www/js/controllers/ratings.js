angular.module("roboRating.controllers")
        .controller('RatingCtrl', function ($scope, $ionicHistory, $stateParams, Ratings, Teams, Locations) {
            $scope.teams = Teams.all();
            $scope.locations = Locations.all();

            $scope.rating = Ratings.get($stateParams.ratingId);
            
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
                notes: null                
            };
            
            $scope.insert = function () {
                Ratings.insert($scope.rating);
                $ionicHistory.goBack();
            };            
        })

;

