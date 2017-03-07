angular.module('branchCtrls', [])
.controller('writingCtrl', ['$scope', 'fileReaderService', function ($scope, fileReaderService) {
    $scope.inputs = {
        title : {
            disabled: false,
            value : ''
        },
        abstract : {
            disabled: false,
            value : ''
        }
    };
    $scope.image = null;
    // 确定和修改按钮一系列的执行动作
    $scope.ensureORalter = function ($event, which) {
        var which = eval('$scope.inputs.' + which);
        if(which.disabled == false) {
            which.disabled = true;
            $event.target.innerText = '修改';
        } else {
            which.disabled = false;
            $event.target.innerText = '确定';
        }
    };
    // 删除按钮的执行动作
    $scope.delete = function (which) {
        var which = eval('$scope.inputs.' + which);
        if (which.disabled == false) {
            which.value = '';
        }
    };

    // 一有新的图片文件上传就立即同步数据模型并读取文件
    $scope.fileChanged = function (ele) {
        var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        if (!rFilter.test(ele.files[0].type)) {
            alert("上传文件不是图片类型！");
        } else {
            $scope.image = ele.files[0];
            $scope.readFile();
        }
    };

    // 读取图片文件
    $scope.readFile = function () {
        fileReaderService.readAsDataURL($scope.image, $scope)
        .then( function (result) {
            $scope.image.src = result;
            $scope.photoAreaStyle = {
                "background-color" : "white"
            }
        });
    };
}]);
