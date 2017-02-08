angular.module('branchDirectives', [])
// 获取焦点
.directive('setFocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            isFocused: '='
        },
        link: function (scope, element, attrs) {
            // 监听$scope.login.password.isFocus的值，若有变化则使密码输入框获得焦点
            scope.$watch("isFocused", function (newValue, oldValue, scope) {
                if (scope.isFocused) {
                    $timeout( function () {
                        //获取焦点
                        element[0].focus();
                    });
                }
            }, true);;
        }
    };
}])
// 检测浏览器是否支持html5的placeholder属性
.directive('hasPlaceholder', [ function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            var input = document.createElement('input');
            if ("placeholder" in input) {
                element.remove();
            }
        }
    };
}]);

