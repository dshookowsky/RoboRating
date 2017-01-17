angular.module('roboRating.services')
.factory('Locations', function () {
  return {
    all: function () {
      return ['None', 'Corner (Partial)', 'Corner (Full)', 'Vortex (Partial)', 'Vortex (Full)'];
    }
  }
})


.factory('CapBallLocations', function () {
    return {
        all: function () {
            return ['Floor', '1-29', '30+', 'Capped' ]
        }
    }
})

.factory('ShotLocations', function () {
    return {
        all: function () {
            return ['Wall', 'Field', 'Center']
        }
    }
})
