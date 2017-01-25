angular.module('branchCtrls', [])
.controller('storylistsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.post("stores/json/story.json")
        .success( function (data) {
            data.stories.forEach( function(element, index) {
                element.pic = "public-resource/images/" + element.pic;
            });
            $scope.stories = data.stories;
        });
}]);