<?php
    // 取得表单输入的用户名和密码数据
    $username = $_GET['username'];
    $password = $_GET['password'];

    // 进行数据库查询，查看用户名是否存在于数据库中，若存在，则验证用户名或密码是否正确
    // 得到$status和$result

    // $status为状态码，可为 true 或 false
    // false 表示 账户不存在 或 用户名或密码错误
    // true 表示 Ok

    // $result为返回的字符串信息
    // 若$status为 false，则赋值为 账户不存在
    // 若$status为 false，则赋值为 用户名或密码错误
    // 若$status为 true，则赋值为 Ok

    // 输出结果
    // echo json_encode(array('status'=>false, 'result'=>'账户不存在'));
    // echo json_encode(array('status'=>false, 'result'=>'用户名或密码错误'));
    echo json_encode(array('status'=>true, 'result'=>'Ok'));

?>
