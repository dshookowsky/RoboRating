var db = null;
var app = angular.module('roboRating', ['ionic', 'ngCordova', 'roboRating.services', 'roboRating.controllers', 'roboRating.directives']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        cache: false
    })

    .state('newRating', {
        url: '/newRating',
        controller: 'NewRatingCtrl',
        templateUrl: 'templates/newRating.html'
    })

    .state('report', {
        url: '/report',
        controller: 'ReportCtrl',
        templateUrl: 'templates/report.html'
    })
    .state('round', {
      url: '/round/:roundNumber',
      controller: 'RoundCtrl',
      cache: false,
      templateUrl: 'templates/round.html'
    })
    ;
});

app.run(function($ionicPlatform, $rootScope, $cordovaSQLite, Ratings) {
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

    /*
    var query = "CREATE TABLE IF NOT EXISTS ratings (ratingid text primary key,roundNumber int,teamName text,teamNumber int,alliance text,hasAutonomous int,autonBeacons int,autonParticlesShot int,autonParticlesScored int,autonomousParking text,autonCapBall int,teleopCornerShots int,teleopCornerScores int,teleopVortexShots int,teleopVortexScores int,teleopBeacons int,shotLocation text,capBallLocation text,finalBeacons int,totalPoints int, notes text,complete int);";
    */
    
    var query = "CREATE TABLE IF NOT EXISTS ratings (" + Ratings.fields.map(function (a) { return a.name + ' ' + (a.type == "bool" ? "int" : a.type) + ' ' + a.sqlExtra }).join(",") + ");";

    console.log(query);

    db = $cordovaSQLite.openDB({name: 'roborating.db', location: 'default'});
    $cordovaSQLite.execute(db, query).then(function () {
        console.log('query executed')
        $rootScope.$broadcast('database-loaded');
    });
  });
});
