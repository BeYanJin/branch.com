angular.module('myApp.directives', [])
// 获取焦点
.directive('radiosCell', [ function () {
    return {
        restrict: 'EA',
        scope: {
            setTitle: '='
        },
        templateUrl: "pages/login/templates/form-changer.html"

    };
}])