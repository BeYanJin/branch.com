angular.module('branchCtrls', [])
.controller('readingCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("stores/json/story.json")
        .success( function (data) {
            $scope.stories = data.stories;
        });
}]);