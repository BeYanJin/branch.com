angular.module('myApp.directives', [])

// 文件上传的指令
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply( function () {
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.readFile();
            });
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