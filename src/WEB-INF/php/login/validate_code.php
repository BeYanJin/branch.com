<?php
    // 取得表单输入的用户名和密码数据
    $username = $_GET['username'];
    $password = $_GET['password'];
    $code = $_GET['code'];

    // 校验短信验证码是否正确，若正确则将用户名和密码等信息添加到数据库中，若不争确则返回错误提示
    // 得到$status和$result

    // $status为状态码，可为 true 或 false
    // false 表示 验证码填写错误
    // true 表示 验证码填写正确

    // $result为返回的字符串信息
    // 若$status为 false，则赋值为 验证码填写错误
    // 若$status为 true，则赋值为 验证码填写正确

    // 输出结果
    // echo json_encode(array('status'=>false, 'result'=>'验证码填写错误'));
    echo json_encode(array('status'=>true, 'result'=>'验证码填写正确'));
?>
