angular.module('roboRating.controllers', [])

        .controller('MainCtrl', function ($scope, Ratings) {
            $scope.ratings = Ratings.all();

            $scope.newRating = function () {
                window.location = '#/newRating';
                
                
            };
        })
        
        ;