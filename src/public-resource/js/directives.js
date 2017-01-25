var branchDirectives = angular.module('branchDirectives', []);

branchDirectives.directive("checkingLogic", function() {
    return {
        scope: {
            checked: '='
        },
        restrict: 'EA',
        controller: function ($scope) {
            this.check = function () {
                $scope.checked = true;
                console.log($scope.checked);
            };
            this.uncheck = function () {
                $scope.checked = false;
                console.log($scope.checked);
            };
            this.toggle = function () {
                $scope.checked = !$scope.checked;
                console.log($scope.checked);
            };
        },
        link: function (scope, element, attrs, ctrl) {
            console.log( "checked: " + scope.checked );
        }
    }
});
branchDirectives.directive("checking", function() {
    return {
        restrict: 'EA',
        require: '^checkingLogic',
        link: function (scope, element, attrs, checkingLogicCtrl) {
            element.bind('click', function () {
                checkingLogicCtrl.check();
            })
        }
    }
});
branchDirectives.directive("unchecking", function() {
    return {
        restrict: 'EA',
        require: '^checkingLogic',
        link: function (scope, element, attrs, checkingLogicCtrl) {
            element.bind('click', function () {
                checkingLogicCtrl.uncheck();
            })
        }
    }
});
branchDirectives.directive("togglling", function() {
    return {
        restrict: 'EA',
        require: '^checkingLogic',
        link: function (scope, element, attrs, checkingLogicCtrl) {
            element.bind('click', function () {
                checkingLogicCtrl.toggle();
            })
        }
    }
});

// 文件上传的指令
branchDirectives.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'AE',
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