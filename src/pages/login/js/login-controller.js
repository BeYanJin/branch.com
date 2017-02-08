angular.module('branchCtrls', [])
.controller('loginCtrl', ['$scope', '$location', '$http', '$interval', function ($scope, $location, $http, $interval) {


    /**
    *  表示当前视图显示的表单是哪一个表单
    *  formChanger.login = true : 显示登录表单，隐藏注册表单
       formChanger.login = false : 显示注册表单，隐藏登录表单
    *  formChanger.registerPopup = true : 显示手机验证弹出层
       formChanger.registerPopup = false : 隐藏手机验证弹出层
    */
    $scope.formChanger = {
        login: true,
        registerPopup: false,
        /**
        *  文本按钮被点击后执行的动作
        *  切换到对应表单， 清楚切换前表单显示的错误信息
        */
        textbtnBeClicked : function () {
            if (this.login) {
                // 若当前视图处于登录表单，切换前表单为注册表单
                var self = $scope.register;
                self.password2.showError = false;
                this.login = false;
                $scope.login.password.isFocused = false;
            } else {
                // 若当前视图处于注册表单，切换前表单为登录表单
                var self = $scope.login;
                this.login = true;
            }
            // 清楚显示的错误信息
            self.username.showError = false;
            self.password.showError = false;
        },
        /**
        *  注册表单的提交按钮被点击后执行的动作
        *  显示弹出层，隐藏注册表单的提交按钮
        */
        regbtnBeClicked : function () {
            this.registerPopup = true;
        },
        /**
        *  当用户名（注册表单的用户名输入框的值）已被注册时，点击注册表单的提交
           按钮会出现直接登录的文本，点击该文本时会执行该方法
        *  执行该方法后，当前视图显示的表单变为登录表单，登录表单中的用户名输
           入框的值会变为该已被注册的用户名。登录表单的密码输入框会获得焦点，
           值被清空
        */
        turnToLogin : function () {
            var login = $scope.login,
                register = $scope.register;
            // 复制注册表单的用户名输入框的值到登录表单的用户名输入框
            login.username.value = register.username.value;
            // 清空登录表单的密码输入框的值
            login.password.value = "";
            // 登录表单的密码输入框获取焦点
            login.password.isFocused = true;
            // 转到登录表单
            this.login = true;
        }
    };



    /**
    *  inputs对象给所有输入框提供公共资源(属性和方法)
    */
    $scope.inputs = {
        beFocused: function () {
            this.showError = false;
        }
    };


    /**
    *  inputs对象给所有输入框提供公共资源(属性和方法)
    */
    $scope.forms = {
        /**
        *  客户端校验
        *  检验表单的填写是否满足以下验证，包括：
        *  必填: required
        *  最小长度和最大长度: ng-minlength 和 ng-maxlength
        *  若是提交的是注册表单，则还包括: 两次密码是否相同
        */
        clientValidate: function (form) {

            /**
            *  如果当前提交的是登录或注册表单
            */
            if (this == $scope.login || this == $scope.register) {

                // 更新各值
                this.username.value = form.username.$viewValue;
                this.password.value = form.password.$viewValue;

                this.username.isTelephone = !form.username.$error.pattern;
                this.username.isEmail = !form.username.$error.email;

                // 用户名输入框的有效性（客户端） = 必填 + 邮箱或手机号
                this.username.valid = !form.username.$error.required &&
                                      (this.username.isTelephone ||
                                      this.username.isEmail);
                // 密码输入框的有效性（客户端）= 必填 + 6-16位
                this.password.valid = form.password.$valid;

                this.username.showError = !this.username.valid;
                this.password.showError = !this.password.valid;

                /**
                *  如果当前提交的是注册表单，则包括密码确认框
                */
                if (this == $scope.register) {

                    // 更新各值
                    this.password2.value = form.password2.$viewValue;

                    // 密码确认输入框的有效性（客户端）= 必填 + 6-16位 + 两次密码相同
                    this.password2.valid = form.password2.$valid &&
                                           (this.password.value ==
                                            this.password2.value);
                    this.password2.showError = !this.password2.valid;
                }
            } else {

                /**
                *  注册表单弹出层  this == $scope.registerPopup
                */
            }
        },
        /**
        *  服务端远程校验
        *  检验表单的填写是否满足以下验证，包括：
        *  用户名是否存在
        *  用户名与密码是否正确对应
        */
        remoteValidate: function (form, url , callback) {

            // 获取上下文
            var self = this;
            /**
            *  如果当前提交的是登录或注册表单
            */
            if (this == $scope.login || this == $scope.register) {

                // 若客户端校验均通过，则进行远程校验
                if (this.username.valid && this.password.valid) {

                    // 发送请求
                    $http({
                        method: 'post',
                        url: url,
                        params: {
                            'username': self.username.value,
                            'password': self.password.value
                        }
                    }).success( function(data) {

                        self.username.remoteErrorInfo = data.result;

                        // 表单是否满足所有验证，执行对应操作
                        if (self == $scope.register) {
                            // 注册表单
                            // 用户名输入框的有效性 = 用户名未被注册
                            self.username.isRegistered = data.status;
                            // 若用户名已被注册，则显示错误（提示）
                            self.username.showError = data.status;
                            // 整个表单的有效性
                            self.valid = self.username.valid &&
                                         !self.username.isRegistered &&
                                         self.password.valid && self.password2.valid;
                        } else {
                            // 登录表单
                            // 用户名输入框的有效性 = 账号存在 + 用户名和密码正确
                            self.username.remoteValid = data.status;
                            // 若有错误则显示
                            self.username.showError = !data.status;
                            // 整个表单的有效性
                            self.valid = self.username.valid &&
                                         self.username.remoteValid &&
                                         self.password.valid;
                        }
                        // 调用回调函数
                        callback && callback.apply(self, []);
                    });
                }
            } else {
                /**
                *  注册表单弹出层  self == $scope.registerPopup
                */
                // 发送请求
                $http({
                    method: 'post',
                    url: url,
                    params: {
                        'username': $scope.register.username.value,
                        'password': $scope.register.password.value,
                        'code': self.code
                    }
                }).success( function(data) {
                    console.log(data);
                    // 短信验证码输入框的有效性 = 对应正确
                    self.valid = data.status;
                    // 若有错误则显示
                    self.showError = !data.status;

                    // 调用回调函数
                    callback && callback.apply(self, []);
                });
            }
        },
        /**
        *  表单校验
        */
        validate: function (form, url , callback) {
            $scope.forms.clientValidate.apply(this, [form]);
            $scope.forms.remoteValidate.apply(this, [form, url, callback]);
        }
    };


    /**
    *  login对象记录了登录表单(loginForm)的各种信息和数据的处理逻辑
    */
    $scope.login = {
        // 整个登录表单的有效性
        valid: false,
        // 用户名输入框
        username: {
            // 输入框的数据模型值
            value: "",
            // 客户端校验的有效性
            valid: false,
            // 是否显示错误信息
            showError: false,
            // 是否为手机号
            isTelephone: false,
            // 是否为邮箱
            isEmail: false,
            // 服务端远程校验的有效性
            remoteValid: false,
            // 服务端远程校验返回的字符串信息
            remoteErrorInfo: "",
            /**
            *  当输入框得到焦点时执行该方法
            */
            beFocused: function () {
                $scope.inputs.beFocused.apply(this, []);
            }
        },
        // 密码输入框
        password: {
            value: "",
            valid: false,
            showError: false,
            // 当下面的turnToLogin方法被执行时，该值被置为 true；当点击注册文本按钮时，该值被置为 false
            isFocused: false,
            /**
            *  当输入框得到焦点时执行该方法
            */
            beFocused: function () {
                $scope.inputs.beFocused.apply(this, []);
            }
        },
        /**
        *  提交登录表单时执行该方法
        */
        submitted: function (form) {

            // 表单校验
            $scope.forms.validate.apply(this, [form, "/php/login/signin.php", function () {

                // 回调函数操作
                if (this.valid) {
                    $location.url('/').replace();
                }
            }]);
        }
    };





    /**
    *  register对象记录了注册表单(registerForm)的各种信息和数据的处理逻辑
    */
    $scope.register = {
        valid: false,
        username: {
            value: "",
            valid: false,
            isTelephone: false,
            isEmail: false,
            isRegistered: false,
            remoteErrorInfo: "",
            showError: false,
            beFocused: function () {
                $scope.inputs.beFocused.apply(this, []);
            }
        },
        password: {
            value: "",
            valid: false,
            showError: false,
            beFocused: function () {
                $scope.inputs.beFocused.apply(this, []);
            }
        },
        // 确认密码输入框
        password2: {
            value: "",
            valid: false,
            showError: false,
            beFocused: function () {
                $scope.inputs.beFocused.apply(this, []);
            }
        },
        /**
        *  提交注册表单时执行该方法
        */
        submitted: function (form) {

            // 表单校验
            $scope.forms.validate.apply(this, [form, "/php/login/signup.php", function () {

                // 回调函数操作
                if (this.valid) {
                    if (this.username.isEmail) {
                        alert("格式为邮箱，发送激活信件到对应邮箱中");
                    } else {
                        $scope.formChanger.regbtnBeClicked();
                        console.log("格式为手机号，弹出手机短信验证浮窗，发送短信验证码进行验证");
                    }
                } else {
                }
            }]);
        }
    };




    /**
    *  registerPopup对象记录了手机短信验证弹出层(registerPopup)的各种信息
       和数据的处理逻辑
    */
    $scope.registerPopup = {
        // 是否已点击获取短信验证码的按钮
        gettedMes: false,
        countting: false,
        // 验证码
        code: "",
        // 验证码有效性
        valid: false,
        // 显示错误信息
        showError: false,
        // 验证码输入框是否获得焦点
        isFocused: false,
        // 倒计时的初始总秒数
        seconds: 60,
        /**
        *  倒计时
        */
        codeInputBeFocused: function () {
            $scope.inputs.beFocused.apply(this, []);
        },
        /**
        *  倒计时
        */
        esc: function () {
            $scope.formChanger.registerPopup = false;
            this.isFocused = false;
        },
        /**
        *  倒计时
        */
        startCountDown: function () {
            // 显示xx秒后重发的div
            this.gettedMes = true;
            this.countting = true;
            // 验证码输入框获得焦点
            this.isFocused = true;
            var self = this;
            var interval = $interval( function () {
                if (self.seconds != 0) {
                    self.seconds -= 1;
                    if (self.seconds < 10) {
                        self.seconds = "0" + self.seconds;
                    }
                } else {
                    self.countting = false;
                    self.seconds = 60;
                    $interval.cancel(interval);
                }
            }, 1000);
        },
        /**
        *  提交手机验证表单时执行该方法
        */
        submitted: function (form) {

            // 表单校验
            $scope.forms.validate.apply(this, [form, "/php/login/sendmes.php", function () {

                // 回调函数操作
                if (this.valid) {
                    $location.url('/').replace();
                } else {
                    console.log('test');
                }
            }]);
        }
    };


}]);