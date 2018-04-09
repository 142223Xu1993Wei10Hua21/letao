$(function () {
  //渲染左侧
  $.ajax({
    url:"/category/queryTopCategory",
    type:"get",
    success:function (info) {
      //console.log(info);
      var htmlAdd=template("left_tpl",info);
      $(".nav-left ul").html(htmlAdd);
      // 刚进页面默认渲染第一个
      headerId( info.rows[0].id );
    }
  });


  // 给左侧添加事件委托, 点击左侧一级分类, 渲染二级分类
  $(".nav-left ul").on("click","a",function () {
    // 拿到一级分类id
    var id=$(this).data("id");
    //重新渲染
    headerId(id);
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  });



  //根据左侧a获取的id，获取右侧的内容
  function headerId(id) {
    $.ajax({
      url:"/category/querySecondCategory",
      type:"get",
      data:{
        id:id
      },
      success:function (info) {
        console.log(info);
        var htmlAdd=template("right_tpl",info);
        $(".nav-right").html(htmlAdd);
      }

    })
  }
});