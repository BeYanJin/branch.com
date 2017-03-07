angular.module('myApp.directives', [])
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
// 登录与注册按钮
.directive('formChanger', [ function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/login/form-changer.html'
    };
}])
// 登录表单组件
.directive('loginForm', [ function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/login/login-form.html'
    };
}])
// 注册表单组件
.directive('registerForm', [ function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/login/register-form.html'
    };
}])
// 注册表单组件
.directive('registerPopupForm', [ function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/login/register-popup-form.html'
    };
}]);