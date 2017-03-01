angular.module('myApp.directives', [])
.directive("searchBox", function() {
    return {
        restrict: 'EA',
        templateUrl: 'components/search-box/search-box.html'
    }
});