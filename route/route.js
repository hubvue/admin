const bodyParser = require("body-parser");
const mysql = require("mysql");
const fs = require("fs");
// const excel = require("./constroller/excel");
const urlencodeParser = bodyParser.urlencoded({extended: false});
const connection = mysql.createConnection({host: "localhost", user: "root", password: "123456", database: "message"})
const route = (app) => {
    app.get("/", (req, res) => {
        res.render("login");
    });
    //  打开管理员页面
    app.get("/admin/:id", (req, res) => {
        connection.query("select * from admin where account = ?", req.params.id, (error, resultAdmin) => {
            if (error) {
                console.log(error.message);
            } else {
                connection.query("select * from minister", (error, resultMini) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        connection.query("select * from staff", (error, resultStaff) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                connection.query("select * from assess", (error, resultAssess) => {
                                    if (error) {
                                        console.log(error.message);
                                    } else {
                                        res.render("admin", {
                                            admin: resultAdmin[0],
                                            mini: resultMini,
                                            staff: resultStaff,
                                            assess: resultAssess
                                        });
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    })
    // 打开成员管理页面
    app.get("/index/:id", (req, res) => {
        connection.query("select * from minister where num = ?", req.params.id, (error, resultMini) => {
            if (error) {
                console.log(error.message);
            } else {
                connection.query("select * from staff where department = ?", resultMini[0].department, (error, resultMember) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        res.render("index", {
                            mini: resultMini[0],
                            member: resultMember
                        });
                    }
                })
            }
        })
    })
    // 删除员工信息
    app.delete("/indexMember", urlencodeParser, (req, res) => {
        connection.query("delete from staff where num = ?", req.body.num, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
            }
        })
    })
    // 删除成员信息
    app.delete("/adminMember", urlencodeParser, (req, res) => {
        connection.query("delete from minister where num = ?", req.body.num, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
            }
        })
    })
    //添加员工信息
    app.post("/addMember", urlencodeParser, (req, res) => {
        connection.query("insert into staff(num,name,sex,post,department) values(?,?,?,?,?)", [
            req.body.num, req.body.name, req.body.sex, req.body.post, req.body.department
        ], (error, result) => {
            if (error) {
                res.json({numMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    //添加成员信息
    app.post("/addMembers", urlencodeParser, (req, res) => {
        connection.query("insert into minister(num,name,password,department,title) values(?,?,?,?,?)", [
            req.body.num, req.body.name, req.body.password, req.body.department, req.body.title
        ], (error, result) => {
            if (error) {
                res.json({numMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    //修改员工信息
    app.post("/updateMember", urlencodeParser, (req, res) => {
        connection.query("update staff set num = ?,name = ?, sex = ? , post = ? ,department = ? where num = ?", [
            req.body.num,
            req.body.name,
            req.body.sex,
            req.body.post,
            req.body.department,
            req.body.numOrigin
        ], (error, result) => {
            if (error) {
                res.json({numMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    //修改成员信息
    app.post("/updateMembers", urlencodeParser, (req, res) => {
        connection.query("update minister set num = ?,name = ?, password = ?  ,department = ?, title = ? where num = ?", [
            req.body.num,
            req.body.name,
            req.body.password,
            req.body.department,
            req.body.title,
            req.body.numOrigin
        ], (error, result) => {
            if (error) {
                res.json({numMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    //添加评分标准
    app.post("/insertAssess", urlencodeParser, (req, res) => {
        connection.query("insert into assess(department,message) value(?,?)", [
            req.body.department, req.body.message
        ], (error, result) => {
            if (error) {
                res.json({departmentMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    // 修改评分标准
    app.post("/updateAssess", urlencodeParser, (req, res) => {
        connection.query("update assess set department = ? , message = ? where department = ?", [
            req.body.department, req.body.message, req.body.departmentOrigin
        ], (error, result) => {
            if (error) {
                res.json({departmentMessage: "已存在"})
            } else {
                res.json(result);
            }
        })
    })
    // 删除评分标准
    app.delete("/deleteAssess", urlencodeParser, (req, res) => {
        connection.query("delete from assess where department = ?", req.body.department, (error, result) => {
            if (error) {
                console.log("删除失败")
            } else {
                res.json(result);
            }
        })
    })
    //评分
    app.post("/assess", urlencodeParser, (req, res) => {
        connection.query("update staff set Communication = ? ,  organization = ? where num = ?", [
            req.body.communication, req.body.organization, req.body.num
        ], (error, result) => {
            if (error) {
                console.log("评分有误");
            } else {
                res.json(result);
            }
        })
    })
    //登录
    //成员登录
    app.post("/index", urlencodeParser, (req, res) => {
        connection.query("select * from minister where num = ? and  password = ?", [
            req.body.num, req.body.password
        ], (error, results, fields) => {
            if (error) {
                console.log(error.message);
            } else {
                res.json(results);
            }
        })
    })
    //管理员登录
    app.post("/admin", urlencodeParser, (req, res) => {
        connection.query("select * from admin where account = ? and password = ?", [
            req.body.num, req.body.password
        ], (error, results) => {
            if (error) {
                console.log(error.message);
            } else {
                res.json(results);
            }
        })
    })
    //生成execl表
    const nodeExcel = require("excel-export")
    app.get('/exportExcel', function(req, res, next) {
        connection.query("select * from staff",(error,results) => {
            if(error) {
                console.log(error.message);
            } else {
                var conf = {};
                conf.name = "mysheet";
                conf.cols = [
                    {
                        caption: '工号',
                        type: 'string'
                    }, {
                        caption: '姓名',
                        type: 'string'
                    }, {
                        caption: '性别',
                        type: 'string'
                    }, {
                        caption: '职务',
                        type: 'string'
                    }, {
                        caption: '部门',
                        type: 'string'
                    }, {
                        caption: '交流能力',
                        type: 'string'
                    }, {
                        caption: '组织能力',
                        type: 'string'
                    }
                ];
                let arr = [];
                results.forEach(item => {
                    var arr1 = [];
                    for (var prop in item ) {
                        arr1.push(item[prop])
                    }
                    arr.push(arr1);
                })
                conf.rows = arr;
                var result = nodeExcel.execute(conf);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", "attachment; filename=" + "member.xlsx");
                res.end(result, 'binary');
            }
        })
    });

}
module.exports = route;
