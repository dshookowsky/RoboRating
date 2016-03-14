angular.module('roboRating.directives')

.directive('qrcode', function ($interpolate) {
    return {
        restrict: 'E',
        link: function ($scope, $element, $attrs) {

            var options = {
                text: '',
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: 'L'
            };

            Object.keys(options).forEach(function (key) {
                options[key] = $interpolate($attrs[key] || '')($scope) || options[key];
            });

            options.correctLevel = QRCode.CorrectLevel[options.correctLevel];

            new QRCode($element[0], options);

        }
    };
});
