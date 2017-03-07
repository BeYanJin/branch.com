angular.module('myApp.directives', [])
.directive("searchBox", function() {
    return {
        restrict: 'EA',
        templateUrl: 'views/search-box.html'
    }
});