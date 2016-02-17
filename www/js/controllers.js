angular.module('roboRating.controllers', [])

        .controller('MainCtrl', function ($scope, $ionicLoading, $cordovaBarcodeScanner, Ratings) {

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

            /*
            $scope.$on('$ionicView.enter', function () {
                loadRatings();
            });
            */
            
            $scope.$on('database-loaded', function () {
                console.log('database-loaded');
                loadRatings();
            });

            $scope.newRating = function () {
                window.location = '#/newRating';
            };

            $scope.scan = function () {
                $cordovaBarcodeScanner.scan({"SCAN_MODE": "QR_CODE_MODE"})
                        .then(function (barcode) {
                            if (barcode && !barcode.cancelled && barcode.format === "QR_CODE" ) {
                                Ratings.save(JSON.parse(barcode.text));
                                Ratings.all().then(function (ratings){
                                    $scope.ratings = ratings;
                                })
                            }
                        },
                        function (error) {
                            console.dir(error);
                        });
            };
        })

        ;