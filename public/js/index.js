$(function(){
    //导航切换评价与管理页面
    class ObjSwitch {
        constructor(){};
        config(){
            this.$memverManage = {
                origin : $("#member-manage"),
                target : $(".member-list").eq(0)
            };
            this.$memberEvaluate = {
                origin : $("#member-evaluate"),
                target : $(".member-list").eq(1)
            }
        }
        init(){
            this.config();
            this.mothod();
        }
        mothod(){
            switchFun(
                this.$memverManage.origin,
                this.$memverManage.target,
                 this.$memberEvaluate.origin,
                this.$memberEvaluate.target
            );
            switchFun(
                this.$memberEvaluate.origin,
                this.$memberEvaluate.target,
                this.$memverManage.origin,
                this.$memverManage.target
            )
        }
    }
    const objSwitch = new ObjSwitch();
    objSwitch.init();
    // 删除成员
    class DeleteMember{
        constructor(){};
        init(){
            this.deleteEvent();
        }
        deleteEvent(){
            $(".delete").on("click",function(){
                let data = {
                    num : $.trim($(this).parent().parent().children().first().text()),
                }
                console.log(data);
                $.ajax({
                    type : "DELETE",
                    url : "/indexMember",
                    data : data,
                    success : function(data){
                        location.reload();
                    }
                })
            })
        }
    }
    const deleteMember = new DeleteMember();
    deleteMember.init();
    // 添加成员
    class InsertAndUpdateMember{
        init(){
            this.obj = {
                drag : false,
                num : null,
            };
            this.insertEvent(this.obj);
            this.closeEvent();
            this.closeError();
            this.submitEvent(this.obj);
        }
        //打开添加成员按钮
        insertEvent(obj){
            $("#add-member").on("click", function(){
                obj.drag = false;
                $("#insert").css("display","block");
            })
            // 修改信息
            $(".edit").on("click",function(){
                obj.drag = true;
                $("#insert").css("display","block");
                obj.num = $.trim($(this).parent().parent().children().first().text());
            })

        }
        // 关闭添加成员
        closeEvent(){
            $("#close").on("click",function(){
                $("#insert").css("display","none");
            })
        }
        //错误关闭
        closeError(){
            $("#insert-num").on("click",function(){
                $("#insert-member-error").html("");
            })
            $("#insert-name").on("click",function(){
                $("#insert-member-error").html("");
            })
            $("#insert-sex").on("click",function(){
                $("#insert-member-error").html("");
            })
            $("#insert-post").on("click",function(){
                $("#insert-member-error").html("");
            })
            $("#insert-department").on("click",function(){
                $("#insert-member-error").html("");
            })
        }
        //提交信息
        submitEvent(obj){
            $("#insert-btn").on("click",function(){
                if(obj.drag == false){
                    let data = {
                        num : $("#insert-num").val(),
                        name : $("#insert-name").val(),
                        sex : $("#insert-sex").val(),
                        post : $("#insert-post").val(),
                        department : $("#insert-department").val(),
                    }
                    if(data.num == "" || data.name == "" || data.sex == "" || data.post == "" || data.department == ""){
                        $("#insert-member-error").html("您输入的各项信息不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/addMember",
                            data : data,
                            success : function(data) {
                                if(data.numMessage || data.numMessage == "已存在") {
                                    $("#insert-member-error").html("工号已存在");
                                }else {
                                    location.reload();
                                }
                            }
                        })
                    }
                } else {
                    let data = {
                        numOrigin : obj.num,
                        num : $("#insert-num").val(),
                        name : $("#insert-name").val(),
                        sex : $("#insert-sex").val(),
                        post : $("#insert-post").val(),
                        department : $("#insert-department").val(),
                    }
                    if(data.num == "" || data.name == "" || data.sex == "" || data.post == "" || data.department == ""){
                        $("#insert-member-error").html("您输入的各项信息不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/updateMember",
                            data : data,
                            success : function(data) {
                                if(data.numMessage || data.numMessage == "已存在") {
                                    $("#insert-member-error").html("工号已存在");
                                }else {
                                    location.reload();
                                }
                            }
                        })
                    }
                }
            })
        }
    }
    const insertAndUpdateMember = new InsertAndUpdateMember();
    insertAndUpdateMember.init();


    $(".assess").on("click",function(){
        $(this).parent().parent().next().slideDown(100);
    });
    $(".submit-assess-btn").on("click",function(){
        $(this).parent().parent().parent().slideUp(100);
        const $selt = $(this);
        let dataAssess = {
            num : $.trim($(this).parent().parent().parent().prev().first().first().children().eq(0).text()),
            communication : $(this).parent().parent().parent().find(":checked").eq(0).val(),
            organization : $(this).parent().parent().parent().find(":checked").eq(1).val(),
        };
        console.log(dataAssess);
        if($(this).parent().parent().parent().prev().find("a").text() == "评分"){
            $.ajax({
                type : "POST",
                url : "/assess",
                data : dataAssess,
                success : function(data){
                    $selt.parent().parent().parent().prev().find("a").text("查看评分");
                }
            })
        }
    })
















    // 切换函数
    function switchFun(origin,target,originNone,targetNone){
        origin.click(function(){
            originNone.css("border","none");
            $(this).css("border-left","3px solid #ff8800");
            target.removeClass("none");
            targetNone.removeClass("none");
            targetNone.addClass("none");
        })
    }
})
