angular.module('roboRating.services', [])
        .factory('Teams', function () {
            var teams = [
                {"id": 118, "name": "Steel Hornets"},
                {"id": 2753, "name": "Team Overdrive"},
                {"id": 3283, "name": "SciBots"},
                {"id": 3305, "name": "SciBots2"},
                {"id": 3795, "name": "Jag Wired"},
                {"id": 4077, "name": "MASH"},
                {"id": 4185, "name": "Silver Soldiers"},
                {"id": 4311, "name": "Watt The Hex?"},
                {"id": 4999, "name": "Imagine It"},
                {"id": 5910, "name": "Sparks"},
                {"id": 6022, "name": "TBD - To Be Determined"},
                {"id": 6191, "name": "Short Circuits"},
                {"id": 6378, "name": "Jaybots"},
                {"id": 7244, "name": "OUT of the BOX"},
                {"id": 7314, "name": "Sab-BOT-age"},
                {"id": 7416, "name": "Silver Spartans"},
                {"id": 7423, "name": "Flaming Phoenix"},
                {"id": 7786, "name": "Blue Streak"},
                {"id": 8221, "name": "Cubix^3"},
                {"id": 8468, "name": "The Iron Struct"},
                {"id": 8645, "name": "Robotic Doges"},
                {"id": 8867, "name": "Broken Image Link"},
                {"id": 8884, "name": "RoboPanthers"},
                {"id": 8992, "name": "University Scholars Program The Eternity Coders (TEC)"},
                {"id": 9242, "name": "GearHounds"},
                {"id": 9791, "name": "Divide by Zero"},
                {"id": 9794, "name": "Wizards.exe"},
                {"id": 9863, "name": "MASHellaneous"},
                {"id": 9872, "name": "(In)Formal Logic"},
                {"id": 9979, "name": "Cougars"},
                {"id": 10098, "name": "2 Eyed Illuminati"},
                {"id": 10333, "name": "TechSpark"},
                {"id": 10375, "name": "Bot Builders"},
                {"id": 10795, "name": "RAMDROIDS"},
                {"id": 10842, "name": "Train of Thought"}
            ];

            return {
                all: function () {
                    return teams;
                },
                get: function (teamId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (teams[i].id === parseInt(teamId)) {
                            return teams[i];
                        }
                    }
                    return null;
                }
            };
        })
        
        .factory('Locations', function () {
            var locations = [
                'None',
                'Floor',
                'Low',
                'Middle',
                'High',
                'Hang'
            ];
            
            return {
                all: function () {
                    return locations;
                }
            };
        });