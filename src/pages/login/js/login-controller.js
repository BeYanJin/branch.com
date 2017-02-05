angular.module('branchCtrls', [])
.controller('loginCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    // 当前所在的表单
    $scope.status = {
        login: true
    };
    $scope.turnToLogin = function () {
        // 复制注册表单的用户名输入框的值到登录表单的用户名输入框
        $scope.login.username.value = $scope.register.username.value;
        // 清空登录表单的密码输入框的值
        $scope.login.password.value = "";
        // 登录表单的密码输入框获取焦点
        $scope.login.password.isFocused = true;
        // 转到登录表单
        $scope.status.login = true;
    };
    $scope.login = {
        username: {
            // 输入框的数据模型值
            value: "",
            // 客户端校验的有效性
            valid: false,
            // 服务端远程校验的有效性
            remoteValid: false,
            // 服务端远程校验返回的字符串信息
            remoteErrorInfo: "",
            // 是否显示客户端校验的错误信息
            showError: false,
            // 是否显示服务端远程校验的错误信息
            showRemoteError: false
        },
        password: {
            value: "",
            valid: false,
            showError: false,
            // 是否获取焦点
            isFocused: false
        }
    };
    $scope.register = {
        username: {
            value: "",
            valid: false,
            remoteValid: false,
            remoteErrorInfo: "",
            showError: false,
            showRemoteError: false
        },
        password: {
            value: "",
            valid: false,
            showError: false
        },
        password2: {
            value: "",
            valid: false,
            showError: false
        }
    };




    // 提交登录表单
    $scope.submitLoginForm = function (form) {
        var username = $scope.login.username,
            password = $scope.login.password;

        // 更新各值
        username.value = form.username.$viewValue;
        password.value = form.password.$viewValue;

        // 客户端校验
        // 用户名输入框的有效性（客户端） = 必填 + 邮箱或手机号
        username.valid = !form.username.$error.required &&
                        (!form.username.$error.email ||
                        !form.username.$error.pattern);
        if (!username.valid) {
            username.showError = true;
        }
        // 密码输入框的有效性（客户端）= 必填 + 6-16位
        password.valid = form.password.$valid;
        if (!password.valid) {
            password.showError = true;
        }

        // 若客户端校验均通过，则进行远程校验
        if (username.valid && password.valid) {
            $http({
                method: 'post',
                url: '/php/login/signin.php',
                params: {
                    'username': username.value,
                    'password': password.value
                }
            }).success( function(data) {

                // 用户名输入框的有效性（服务端远程） = 账号存在 + 用户名和密码正确
                username.remoteValid = data.status;
                username.remoteErrorInfo = data.result;

                // 表单是否满足所有验证
                var formValid = username.valid &&
                                username.remoteValid==2 &&
                                password.valid;

                if (formValid) {
                    $location.url('/').replace();
                } else {
                    username.showRemoteError = true;
                }
            })
        }
    };





    // 提交注册表单
    $scope.submitRegisterForm = function (form) {
        var username = $scope.register.username,
            password = $scope.register.password,
            password2 = $scope.register.password2;

        // 更新各值
        username.value = form.username.$viewValue;
        password.value = form.password.$viewValue;
        password2.value = form.password2.$viewValue;

        // 用户名输入框的有效性（客户端） = 必填 + 邮箱或手机号
        username.valid = !form.username.$error.required &&
                        (!form.username.$error.email ||
                        !form.username.$error.pattern);
        if (!username.valid) {
            username.showError = true;
        }
        // 密码输入框的有效性（客户端）= 必填 + 6-16位
        password.valid = form.password.$valid;
        if (!password.valid) {
            password.showError = true;
        }
        // 密码确认输入框的有效性（客户端）= 必填 + 6-16位 + 两次密码相同
        password2.valid = form.password2.$valid &&
                        ($scope.register.password.value ==
                         $scope.register.password2.value);
        if (!password2.valid) {
            password2.showError = true;
        }

        // 若客户端校验均通过，则进行远程校验
        if (username.valid && password.valid && password2.valid) {
            $http({
                method: 'post',
                url: '/php/login/signup.php',
                params: {
                    'username': username.value,
                    'password': password.value
                }
            }).success( function(data) {

                // 用户名输入框的有效性（服务端远程） = 用户名没有被注册
                username.remoteValid = !data.status;
                username.remoteErrorInfo = data.result;

                // 整个表单的有效性
                var formValid = username.valid &&
                            username.remoteValid &&
                            password.valid &&
                            password2.valid;

                if (formValid) {
                    $location.url('/').replace();
                } else {
                    username.showRemoteError = true;
                }

            })
        }
    }
}]);