angular.module('branchCtrls', [])
.controller('loginCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.status = {
        login : true
    };
    $scope.user = {
        login : {
            username : "",
            password : "",
            u_errorDisp : false,
            p_errorDisp : false
        },
        register : {
            username : "",
            password : "",
            password2 : "",
            u_errorDisp: false,
            p_errorDisp: false,
            p2_ErrorDisp : false
        }
    };
/*
    $scope.checkMobile = function (info) {
        var myreg = /^1[34578]\d{9}$/;
        return myreg.test(info);
    }
*/
/*
    $scope.checkEMail = function (info) {
        var myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return myreg.test(info);
    }
*/
    // 提交登录表单
    $scope.submitLoginForm = function (form) {
        var login = $scope.user.login,
            uFormValid = !form.username.$error.required &&
                        (!form.username.$error.email || !form.username.$error.pattern),
            pFormValid = form.password.$valid,
            formValid = uFormValid && pFormValid;
        if (formValid) {
            console.log("登录表单提交成功！");
            $location.url('/').replace();
        } else {
            console.log("登录表单提交失败！");
            if (!uFormValid) {
                login.u_errorDisp = true;
            }
            if (!pFormValid) {
                login.p_errorDisp = true;
            }
        }
    }
    // 提交注册表单
    $scope.submitRegisterForm = function (form) {
        var register = $scope.user.register,
            uFormValid = !form.username.$error.required &&
                        (!form.username.$error.email || !form.username.$error.pattern),
            pFormValid = form.password.$valid,
            p2FormValid = form.password2.$valid &&
                        (register.password == register.password2),
            formValid = uFormValid && pFormValid && p2FormValid;
        if (formValid) {
            console.log("注册表单提交成功！");
            $location.url('/').replace();
        } else {
            console.log("注册表单提交失败！");
            if (!uFormValid) {
                register.u_errorDisp = true;
            }
            if (!pFormValid) {
                register.p_errorDisp = true;
            }
            if (!p2FormValid) {
                register.p2_ErrorDisp = true;
            }
        }
    }
}]);