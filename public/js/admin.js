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
            this.$memberAssess = {
                origin : $("#member-assess"),
                target : $(".member-list").eq(2)
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
            );
            switchFun(
                this.$memberEvaluate.origin,
                this.$memberEvaluate.target,
            )
            switchFun(
                this.$memberAssess.origin,
                this.$memberAssess.target,
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
                    url : "/adminMember",
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
            $("#insert-password").on("click",function(){
                $("#insert-member-error").html("");
            })
            $("#insert-title").on("click",function(){
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
                        password : $("#insert-password").val(),
                        title : $("#insert-title").val(),
                        department : $("#insert-department").val(),
                    }
                    if(data.num == "" || data.name == "" || data.password == "" || data.title == "" || data.department == ""){
                        $("#insert-member-error").html("您输入的各项信息不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/addMembers",
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
                        password : $("#insert-password").val(),
                        title : $("#insert-title").val(),
                        department : $("#insert-department").val(),
                    }
                    if(data.num == "" || data.name == "" || data.password == "" || data.title == "" || data.department == ""){
                        $("#insert-member-error").html("您输入的各项信息不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/updateMembers",
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

    class InsertAndUpdateAssess{
        init(){
            this.obj = {
                drag : false,
                department : null,
            };
            this.insertEvent(this.obj);
            this.closeEvent();
            this.closeError();
            this.submitEvent(this.obj);
        }
        //打开添加评分标准
        insertEvent(obj){
            $("#add-assess").on("click", function(){
                obj.drag = false;
                $("#insert-assess").css("display","block");
            })
            // 修改信息
            $(".edit-assess").on("click",function(){
                obj.drag = true;
                $("#insert-assess").css("display","block");
                obj.department = $.trim($(this).parent().parent().children().first().text());
            })

        }
        // 关闭添加成员
        closeEvent(){
            $("#close-assess").on("click",function(){
                $("#insert-assess").css("display","none");
            })
        }
        //错误关闭
        closeError(){
            $("#insert-assess-department").on("click",function(){
                $("#insert-member-assess-error").html("");
            })
        }
        //提交信息
        submitEvent(obj){
            $("#insert-assess-btn").on("click",function(){
                if(obj.drag == false){
                    let dataAssess = {
                        department : $("#insert-assess-department").val(),
                        message : $("#insert-message").val(),
                    }
                    if(dataAssess.department == ""){
                        $("#insert-member-assess-error").html("您输入的部门不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/insertAssess",
                            data : dataAssess,
                            success : function(data) {
                                if(dataAssess.departmentMessage || dataAssess.departmentMessage == "已存在") {
                                    $("#insert-member-assess-error").html("工号已存在");
                                }else {
                                    location.reload(data);
                                }
                            }
                        })
                    }
                } else {
                    let dataAssess = {
                        departmentOrigin : obj.department,
                        department : $("#insert-assess-department").val(),
                        message : $("#insert-message")
                    }
                    if(dataAssess.department == ""){
                        $("#insert-member-error").html("您输入的部门不能为空！");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "/updateAssess",
                            data : dataAssess,
                            success : function(data) {
                                if(dataAssess.departmentMessage || dataAssess.departmentMessage == "已存在") {
                                    $("#insert-member-assess-error").html("工号已存在");
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
    const insertAndUpdateAssess = new InsertAndUpdateAssess();
    insertAndUpdateAssess.init();

















    // 切换函数
    function switchFun(origin,target){
        origin.click(function(){
            $(this).parent().children().css("border","none")
            $(this).css("border-left","3px solid #ff8800");
            target.parent().children().addClass("none");
            target.removeClass("none");
        })
    }
})
