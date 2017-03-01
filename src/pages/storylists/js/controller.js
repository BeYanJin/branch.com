angular.module('myApp.controllers', [])

.controller('storylistsCtrl', ['$scope', '$http', function ($scope, $http) {


    $scope.load = function () {
        console.log("到底了，加载更多数据吧！");
    }


    $http.get("stores/json/story.json")
        .success( function (data) {
            data.stories.forEach( function(element, index) {
                element.pic = "public-resource/images/" + element.pic;
            });
            $scope.stories = data.stories;
        });
}]);