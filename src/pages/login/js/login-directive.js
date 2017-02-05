/*// 获取焦点
branchDirectives.directive('setFocus', [ function () {
    return {
        restrict: 'AE',
        scope: false,
        link: function (scope, element, attrs) {
            // 监听$scope.login.password.isFocus的值，若有变化则使密码输入框获得焦点
            scope.$watch("login.password.isFocus", function (newValue, oldValue, scope) {
                if (scope.login.password.isFocus) {
                    //获取焦点
                    element[0].focus();
                }
            }, true);;
        }
    };
}]);*/