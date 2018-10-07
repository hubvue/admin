$(function(){
    $("#num").on("click",function(){
        $("#login-error").html("");
    })
    $("#password").on("click",function(){
        $("#login-error").html("");
    })
    $("#btn").on("click",function(){
        let dataMessage = {
            num : $("#num").val(),
            password : $("#password").val(),
        }
        if(dataMessage.num == "" || dataMessage.password == "") {
            $("#login-error").html("您输入的账号或密码不能为空！");
        }else {
            if( $(".select").val() === "管理员") {
                $.ajax({
                    type : "POST",
                    url : "/admin",
                    data : dataMessage,
                    success : function(data) {
                        if(data.length == 0) {
                            $("#login-error").html("您的账号或密码输入错误！");
                        } else {
                            window.location.href=`/admin/${data[0].account}`;
                        }
                    }
                })
            } else if( $(".select").val() === "成员") {
                $.ajax({
                    type : "POST",
                    url : "/index",
                    data : dataMessage,
                    success : function(data) {
                        if(data.length == 0) {
                            $("#login-error").html("您的账号或密码输入错误！");
                        } else {
                            window.location.href=`/index/${data[0].num}`;
                        }
                    }
                })
            }
        }

    })
})
