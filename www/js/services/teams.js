angular.module('roboRating.services')
.factory('Teams', function () {
    var teams = [
      {"id":18, "name": "The Techno Chix"},
      {"id":248, "name": "Fatal Error"},
      {"id":3371, "name": "Bötley Crüe"},
      {"id":3415, "name": "Lancers"},
      {"id":4029, "name": "2 Bits and a Byte"},
      {"id":4096, "name": "T-10 (T minus 10)"},
      {"id":4137, "name": "Islandbots"},
      {"id":4286, "name": "Dragonoids"},
      {"id":4347, "name": "NanoGurus"},
      {"id":4486, "name": "Mad Science"},
      {"id":5017, "name": "RoboEpic"},
      {"id":5163, "name": "Flying Dragon"},
      {"id":5421, "name": "RM'd and Dangerous"},
      {"id":5485, "name": "GorillaBots"},
      {"id":6029, "name": "TEAM ROBOWIZ"},
      {"id":6040, "name": "Canton Robodogs"},
      {"id":6055, "name": "GearTicks"},
      {"id":6341, "name": "IBEX"},
      {"id":6527, "name": "North Robotics"},
      {"id":6899, "name": "Blue Bots"},
      {"id":7117, "name": "The Blockheads"},
      {"id":7164, "name": "Falcon Bots"},
      {"id":7314, "name": "Sab-BOT-age"},
      {"id":7393, "name": "electron Volts"},
      {"id":7486, "name": "Suffern's Team Erebor"},
      {"id":8221, "name": "Cubix³"},
      {"id":8390, "name": "Nerd Herd"},
      {"id":8509, "name": "STEEL Serpents"},
      {"id":8528, "name": "Rhyme Know Reason"},
      {"id":8619, "name": "Cerebrum Bellatorum"},
      {"id":8645, "name": "Robotic Doges"},
      {"id":8702, "name": "Grey Jedi"},
      {"id":9372, "name": "Standard Model"},
      {"id":9845, "name": "Robominions"},
      {"id":9927, "name": "The MidKnight Magic Too!"},
      {"id":10392, "name": "The Rolling Drones"}
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
