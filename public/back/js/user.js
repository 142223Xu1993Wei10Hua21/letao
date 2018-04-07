$(function () {

  // 当前页
  var currentPage = 1;
  // 一页多少条
  var pageSize = 5;
  // 1. 一进入页面, 进行渲染
  render();

  function render() {
    $.ajax({
      url: "/user/queryUser",
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info.rows);
        var htmlStr = template("tpl", info);
        $('.lt_content tbody').html(htmlStr);


        // 配置分页
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),

          // 当页面被点击时触发
          onPageClicked: function (a, b, c, page) {
            // page 当前点击的页码
            currentPage = page;
            // 调用 render 重新渲染页面
            render();
          }
        });
      }
    });
  }


  //2.通过事件委托，给按钮点击事件
  $('.lt_content tbody').on("click", ".btn", function () {
    console.log("hehe");
    //弹出模态框
    $("#userModal").modal("show");
    //获取对应的 用户id
    var id = $(this).parent().data("id");
    // 获取将来需要将用户置成什么状态
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    console.log(id);
    console.log(isDelete);

    //先解除绑定，再绑定事件，可以保证只有一个事件绑定再按钮上
    $('#submitBtn').off("click").on("click", function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (info) {
          console.log(info);
          if (info.success) {
            //关闭模态框
            $("#userModal").modal("hide");


            //重新渲染
            render();
          }
        }
      })


    })
  })

});