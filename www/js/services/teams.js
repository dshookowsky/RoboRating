angular.module('roboRating.services')
.factory('Teams', function () {
    var teams = [
        {"id":61, "name": "Ozone"},
        {"id":3283, "name": "SciBot1"},
        {"id":3305, "name": "Scibot2"},
        {"id":4185, "name": "Silver Soldiers"},
        {"id":4856, "name": "Minnie MASH"},
        {"id":4999, "name": "Imagine It"},
        {"id":5421, "name": "RM'd and Dangerous"},
        {"id":5910, "name": "Sparks"},
        {"id":6045, "name": "Ohm Boys"},
        {"id":6378, "name": "Jaybots"},
        {"id":7314, "name": "Sab-BOT-age"},
        {"id":7416, "name": "Silver Spartans"},
        {"id":7786, "name": "Blue Streaks"},
        {"id":8221, "name": "Cubix^3"},
        {"id":8468, "name": "The Javengers"},
        {"id":8509, "name": "STEEL Serpents"},
        {"id":8645, "name": "Robotic Doges"},
        {"id":9242, "name": "GearHounds"},
        {"id":9618, "name": "Cyber Spartans"},
        {"id":9863, "name": "MASHellaneous"},
        {"id":9872, "name": "(In)Formal Logic"},
        {"id":9979, "name": "Cougars"},
        {"id":10083, "name": "Mars Robotics"},
        {"id":10098, "name": "2 Eyed Illuminati"},
        {"id":10333, "name": "TechSpark"},
        {"id":10353, "name": "Metal Works"},
        {"id":10490, "name": "Fiddling Fixers"},
        {"id":10771, "name": "Le Pamplemousse"},
        {"id":11208, "name": "KARDIA Robotics"},
        {"id":11210, "name": "Infinity Robotechs"},
        {"id":11349, "name": "Machinists"},
        {"id":11440, "name": "Ohmega"},
        {"id":11554, "name": "Bot of Gold"},
        {"id":11830, "name": "Red Lion Robotics"},
        {"id":12007, "name": "Jayborgs"},
        {"id":12229, "name": "MASHmallows"}
    ];

    return {
        all: function () {
            return teams;
        },
        get: function (teamId) {
            for (var i = 0; i < teams.length; i++) {
                if (teams[i].id === parseInt(teamId)) {
                    return teams[i];
                }
            }
            return null;
        }
    };
});
