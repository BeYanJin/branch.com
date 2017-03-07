angular.module('branchCtrls', [])
.controller('trackCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("WEB-INF/stores/json/story.json")
        .success( function (data) {
            data.stories.forEach( function(element, index) {
                element.pic = "images/" + element.pic;
            });
            $scope.stories = data.stories;
        });
}]);