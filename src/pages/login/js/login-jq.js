$(document).ready( function() {
    $("form").validate({
        rules: {
            username: {
                required: true,
                rangelength: [6, 16],
                remote: {
                    url: "json/account.json",
                    type: "get",
                    data: {
                        loginTime: function () {
                            var date = new Date();
                            var year = date.getFullYear();
                            var month = date.getMonth() < 10? "0"+(date.getMonth()+1) : (date.getMonth()+1);
                            var day = date.getDate() < 10? "0"+date.getDate(): date.getDate();
                            var hour = date.getHours() < 10? "0"+date.getHours(): date.getHours();
                            var minute = date.getMinutes() < 10? "0"+date.getMinutes(): date.getMinutes();
                            var second = date.getSeconds() < 10? "0"+date.getSeconds(): date.getSeconds();
                            return str = year+"-"+ month+"-"+day+ " " +hour+":"+minute+":"+second;
                        }
                    }
                }
            },
            password: {
                required: true,
                rangelength: [6, 16]
            }
        },

        messages: {
            username: {
                required: "请填写账号名",
                rangelength: "请输入6-16位账号名",
                remote: "账号名不存在"
            },
            password: {
                required: "请填写密码",
                rangelength: "请输入6-16位密码"
            }
        },

        // 敲击键盘时不验证
        onkeyup : false,

        // 获得焦点时不验证
        onfocusout : false,

        // 提交表单后，未通过验证的表单不会获得焦点
        focusInvalid: false,

        // 设定错误信息放置位置
        errorPlacement: function(error, element) {
            if (element.attr("name") == "username") {
                var ulabel = $(".username label");
                ulabel.text($(error).text());
                ulabel.animate({right:'20px'}, 300, function () {
                    $(this).addClass("in");
                });
            }
            if (element.attr("name") == "password") {
                var plabel = $(".password label");
                plabel.text($(error).text());
                plabel.animate({right:'20px'}, 300, function () {
                    $(this).addClass("in");
                });
            }
        }
    });

    $(".username input").focus( function () {
        var ulabel = $(".username label");
        ulabel.removeClass("in").animate( {right:'-20px'}, 250, function () {
            $(this).text("");
        });
    });

    $(".password input").focus( function () {
        var plabel = $(".password label");
        plabel.removeClass("in").animate( {right:'-20px'}, 250, function () {
            $(this).text("");
        });
    });
});
