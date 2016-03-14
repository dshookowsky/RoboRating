angular.module('roboRating.services')
.factory('Locations', function () {
  return {
    all: function () {
      return ['None', 'Floor', 'Low', 'Mid', 'High', 'Hang'];
    }
  }
})
