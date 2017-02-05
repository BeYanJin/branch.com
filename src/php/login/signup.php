<?php
    // 取得表单输入的用户名和密码数据
    $username = $_GET['username'];
    $password = $_GET['password'];

    // 进行数据库查询，查看用户名是否存在于数据库中，若不存在，则在数据库中添加账号信息
    // 得到$status和$result

    // $status为状态码，可为 true 或 false
    // true 表示 该账号已注册
    // false 表示 Ok

    // $result为返回的字符串信息
    // 若$status为 true，则赋值为 该账号已注册
    // 若$status为 false，则赋值为 Ok

    // 输出结果
    echo json_encode(array('status'=>true, 'result'=>'该账号已注册'));
    // echo json_encode(array('status'=>false, 'result'=>'Ok'));

?>
