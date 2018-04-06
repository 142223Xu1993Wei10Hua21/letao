$(function () {

  //1.表单校验
  $("#form").bootstrapValidator({

    //2. 指定校验时的图标显示，
    feedbackIcons: {
      //成功
      valid: 'glyphicon glyphicon-ok',
      //失败
      invalid: 'glyphicon glyphicon-remove',
      //配置中
      validating: 'glyphicon glyphicon-refresh'
    },

    //对字段进行校验
    //校验要求：
    // 1.不能为空
    //2.密码不能为空，必须时6——12位
    fields: {
      username: {
        validators: {
          //非空校验
          notEmpty: {
            //当用户名为空时显示
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      }
    }

  });


  //2.进行登陆请求
  //通过ajax请求进行登陆请求
  $("#form").on('success.form.bv', function (e) {
    // 阻止默认的表单提交
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: "post",
      url: "/employee/employeeLogout",
      dataType: "json",
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          // alert( "密码错误" );
          // updateStatus
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 校验规则, 可以设置提示文本
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  });

  //3.重置功能实现
  $('[type="reset"]').click(function () {
    //除了要重置文本，还要重置校验状态
    $('#form').data("bootstrapValidator").resetFrom();
  });
});

