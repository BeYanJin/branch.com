angular.module('branchCtrls', [])
.controller('collectionCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("stores/json/story.json")
        .success( function (data) {
            data.stories.forEach( function(element, index) {
                element.pic = "public-resource/images/" + element.pic;
            });
            $scope.stories = data.stories;
        });
}]);