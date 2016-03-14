/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('roboRating.directives')
        .directive('rating', function () {
            var controller = function ($scope, $rootScope, $ionicHistory, $stateParams, $cordovaDialogs, $cordovaToast, Ratings, Locations) {
                $scope.locations = Locations.all();
                $scope.shelterClimbers = [0, 1, 2];
                $scope.ziplineClimbers = [0, 1, 2, 3];
                
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
                    //$ionicHistory.goBack();
                    $cordovaToast.showShortCenter("Record Saved");

                };

                $scope.markComplete = function() {
                    $scope.rating.complete = true;
                    Ratings.save($scope.rating);
                };

                $scope.markIncomplete = function () {
                    $scope.rating.complete = false;
                    Ratings.save($scope.rating);
                };
            };

            return {
                restrict: 'E',
                templateUrl: './templates/ratingcard.html',
                controller: controller,
                scope: {
                    rating: "=",
                }
            };
        });
