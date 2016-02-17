var db = null;
var app = angular.module('roboRating', ['ionic', 'ngCordova', 'roboRating.services', 'roboRating.controllers', 'roboRating.directives']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        cache: false,
        resolve: {
            ratings: function () {}
        }
    })
   
    .state('newRating', {
        url: '/newRating',
        controller: 'NewRatingCtrl',
        templateUrl: 'templates/newRating.html'
    })
    
    .state('ratingSlider', {
        url: '/rating/:ratingId',
        controller: 'RatingCtrl',
        templateUrl: 'templates/rating.html'
    });
});

app.run(function($ionicPlatform, $rootScope, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    db = $cordovaSQLite.openDB("roborating.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ratings (ratingid text primary key, roundNumber int, teamName text, teamNumber int, alliance text, hasAutonomous int, rescueBeacon int, autonomousClimbers int, autonomousParking text, consistency int, lowDebris int, midDebris int, highDebris int, teleopParking text, scoresClimbers int, ziplineClimbers int, scoresDebris int, debrisInFloor int, endgameParking text, allClear int, totalPoints int, overallConsistency int, driverControl int, climbSpeed int, endurance int, notes text, complete int)").then(function () {
        $rootScope.$broadcast('database-loaded');        
    });
  });  
});

