angular.module('roboRating.services')
.factory('Teams', function () {
    var teams = [
        {"id":535,"name":"Tobor"},
        {"id":3141,"name":"Bears"},
        {"id":3491,"name":"FIX IT"},
        {"id":3595,"name":"Schrödinger's Hat"},
        {"id":3658,"name":"The BOSONS"},
        {"id":3664,"name":"Girls With Attitude"},
        {"id":4130,"name":"Robotica Santi"},
        {"id":4318,"name":"Green Machine Reloaded"},
        {"id":4444,"name":"RoboCats"},
        {"id":4717,"name":"Mechromancers"},
        {"id":4855,"name":"Batteries in Black"},
        {"id":5009,"name":"Helios"},
        {"id":5064,"name":"Aperture Science"},
        {"id":5070,"name":"N.U.T.S."},
        {"id":5169,"name":"Watt's Up?"},
        {"id":5229,"name":"Dragons"},
        {"id":5380,"name":"Electromedics Red"},
        {"id":5843,"name":"AutoVortex"},
        {"id":5890,"name":"e-lemon-ators"},
        {"id":5899,"name":"6 Bits and a Byte"},
        {"id":5942,"name":"Team Torch"},
        {"id":5943,"name":"Erector Sets Gone Mad"},
        {"id":6051,"name":"Quantum Mechanics"},
        {"id":6055,"name":"Gear Ticks"},
        {"id":6081,"name":"i²robotics"},
        {"id":6123,"name":"Mechanical Marauders"},
        {"id":6134,"name":"Black Frogs"},
        {"id":6209,"name":"ViperBots Venom"},
        {"id":6377,"name":"The Other Guys"},
        {"id":6899,"name":"Blue Bots"},
        {"id":6913,"name":"LARES"},
        {"id":7013,"name":"Hot Wired Robotics"},
        {"id":7117,"name":"The Blockheads"},
        {"id":7149,"name":"EHTPAL ENFORCERS"},
        {"id":7152,"name":"Robot Squad"},
        {"id":7300,"name":"Guzzoline Robotics"},
        {"id":7314,"name":"Sab-BOT-age"},
        {"id":7393,"name":"electron Volts"},
        {"id":7550,"name":"Fig Newtons"},
        {"id":8189,"name":"Warren County 4H Robotics"},
        {"id":8327,"name":"Spartans"},
        {"id":8372,"name":"Trial N' Terror"},
        {"id":8375,"name":"Vulcan Robotics"},
        {"id":8471,"name":"The Ducks"},
        {"id":8528,"name":"Rhyme Know Reason"},
        {"id":8620,"name":"Wormgear Warriors"},
        {"id":8995,"name":"The Mogollon Rim Jaegers"},
        {"id":9048,"name":"Philobots"},
        {"id":9205,"name":"Iron Maidens"},
        {"id":9662,"name":"Misgav"},
        {"id":9794,"name":"Wizards.exe"},
        {"id":9804,"name":"Bomb Squad"},
        {"id":9829,"name":"Makbots"},
        {"id":9915,"name":"RoboThunder"},
        {"id":10030,"name":"7 Sigma"},
        {"id":10479,"name":"Talon Industries"},
        {"id":11041,"name":"Falcontech Robotics"},
        {"id":11043,"name":"The League of Relativly Ordinary Gentlemen"},
        {"id":11047,"name":"Screw it"},
        {"id":11053,"name":"FIFTH ORDER"},
        {"id":11056,"name":"TwisT Team"},
        {"id":11061,"name":"Kingslayer"},
        {"id":11064,"name":"STC Jalapenos"},
        {"id":11071,"name":"NINEST Quenchless Seeker"},
        {"id":11080,"name":"DODOBOTS"}
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
