var branchDirectives = angular.module('branchDirectives', []);

// 文件上传的指令
branchDirectives.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply( function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.readFile();
            });
        }
    };
}]);

// 获取焦点
branchDirectives.directive('setFocus', ['$timeout', function ($timeout) {
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
}]);