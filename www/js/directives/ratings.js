/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('roboRating.directives')
        .directive('rating', function () {
            return {
                restrict: 'E',
                templateUrl: './templates/ratingcard.html'
            };
        })

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



