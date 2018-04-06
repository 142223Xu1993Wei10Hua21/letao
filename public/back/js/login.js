$(function () {

  //表单校验
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
          }
        }
      }
    }

  });

})
;
