angular.module('branchCtrls', [])
.controller('readingCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("WEB-INF/stores/json/story.json")
        .success( function (data) {
            $scope.stories = data.stories;
        });
}]);