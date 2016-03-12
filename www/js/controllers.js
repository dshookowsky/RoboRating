angular.module('roboRating.controllers', [])

        .controller('MainCtrl', function ($scope, $ionicLoading, $cordovaBarcodeScanner, $cordovaSQLite, $cordovaFile, $cordovaDialogs, Ratings) {

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

            $scope.$on('database-loaded', function () {
                console.log('database-loaded');
                loadRatings();
            });

            $scope.newRating = function () {
                window.location = '#/newRating';
            };
      
            $scope.export = function () {
                if ( db ) {
                    db.close();
                    db = null;
                }
                                
                $cordovaFile.copyFile(cordova.file.applicationStorageDirectory, "databases/roborating.db", cordova.file.externalDataDirectory, "roborating.db").then(
                        function (success) {
                            $cordovaDialogs.alert("Database exported to " + success.nativeURL, "Success");
                            db = $cordovaSQLite.openDB("roborating.db");
                        }, function (error) {
                            $cordovaDialogs.alert("Export failed", "Error");
                            console.dir(error);
                        });
            };

            $scope.report = function () {
                window.location = '#/report';
            },
           
            $scope.scan = function () {
                $cordovaBarcodeScanner.scan({"SCAN_MODE": "QR_CODE_MODE"})
                        .then(function (barcode) {
                            if (barcode && !barcode.cancelled && barcode.format === "QR_CODE" ) {
                                Ratings.save(JSON.parse(barcode.text));
                                Ratings.all().then(function (ratings){
                                    $scope.ratings = ratings;
                                });
                            }
                        },
                        function (error) {
                            console.dir(error);
                        });
            };
        })
        .controller('ReportCtrl', function ($scope, Ratings, $ionicLoading) {
            Ratings.sort().then(function (ratings) {
                    $scope.ratings = ratings;
                    $ionicLoading.hide();
            });
        });