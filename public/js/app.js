/* global angular*/
angular.module('refidApp', [])
  .controller('regidCtrl', function ($scope, $http) {

    $scope.addData = function (thing, amount, unit) {
        $http.post('/data',{key:thing,amount:amount,unit:unit}).success(function (req, res) {

        })
    }
  })
