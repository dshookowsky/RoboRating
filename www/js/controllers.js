angular.module('roboRating.controllers', [])

        .controller('MainCtrl', function ($scope, $ionicLoading, Ratings) {
            
            var loadRatings = function () {
                $scope.loadingIndicator = $ionicLoading.show({
                    content: 'Loading Data',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200,
                    showDelay: 500
                });

                Ratings.all().then(function (ratings) {
                    $scope.ratings = ratings;
                    $ionicLoading.hide();
                });                
            };
            loadRatings();

            $scope.$on('$ionicView.enter', function () {
                loadRatings();
            });
            
            $scope.$on('database-loaded', function () {
                console.log('database-loaded');
                loadRatings();
            });
            
            
            $scope.newRating = function () {
                window.location = '#/newRating';
                
                
            };
        })
        
        ;