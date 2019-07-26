$(document).ready(function() {
    var cookies = document.cookie.split(";");
    var username = "";
    var userRole = "";
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].includes("username")) {
            var usernameCookie = cookies[i].split("=");
            username = usernameCookie[1];
        }
        if (cookies[i].includes(("userRole"))) {
            var userRoleCookie = cookies[i].split("=");
            userRole = userRoleCookie[1];
        }
    }
    var usernameSection = document.getElementById("usernameHolder");
    var userRoleSection = document.getElementById("userRoleHolder");
    usernameSection.innerHTML = username;
    userRoleSection.innerHTML = userRole;
    if (!username && !userRole ) {
        document.getElementById("UserOn").style.display = "none";
        document.getElementById("navbarUserOn").style.display = "none";
        document.getElementById("UserOff").style.display = "inline";

    }else if(username &&  userRole){
        document.getElementById("UserOff").style.display = "none";
        document.getElementById("UserOn").style.display = "inline";
        document.getElementById("navbarUserOn").style.display = "inline";

    }
    var CourseList = document.getElementById("coursesList");
    var userCourseList = "";
    var url_string = window.location.href;
    var url = new URL(url_string);
    if (window.location.href.includes("course.html")) {
        var idParam = url.searchParams.get("id");
        var resources = document.getElementById("resourcesLink");
        resources.innerHTML = "<a class=\"nav-link\" href=\"resources.html?id=" + idParam + "\">Resources</a>\n";
    }

    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/courses",
        method: "GET",
        headers: {},
        success: function (data, textStatus, response) {
            for (var i = 0; i < data.length; i++) {
                userCourseList += "<a class=\"dropdown-item\" href=\"" + "course.html?id=" + data[i].id + "\">" + data[i].courseName + "</a>"
            }
            CourseList.innerHTML = userCourseList;
        },
        error: function (xhr, status, err) {
            alert("Error");
        }
    });

});


$(function() {
    $("#InstructorLoginForm").on("submit",function(e) {
        e.preventDefault();
        var mail = document.getElementById("user_email").value;
        var pswrd = document.getElementById("user_password").value;
        var form = new FormData();
        form.append("instructorMail", mail);
        form.append("instructorPassword", pswrd);
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/instructors/login",
            method: "POST",
            headers: {},
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data: form,
            success: function (data, textStatus, response) {
                document.cookie = "userRole=Instructors";
                document.cookie = "username=" + mail;
                window.location.href = "index.html";
            },
            error: function (xhr, status, err) {
                alert("Error");
            }
        });
    });
});

$(function() {
    $("#createInstructorForm").on("submit",function(e) {
        e.preventDefault();
        var name = document.getElementById("user_name").value;
        var surname = document.getElementById("user_surname").value;
        var email = document.getElementById("user_email").value;
        var pswrd = document.getElementById("user_pwd").value;
        jsonData = "{"
            + "\"instructorFirstName\":" + "\"" + name + "\"" + ","
            + "\"instructorLastName\":" + "\"" + surname + "\"" + ","
            + "\"instructorMail\":" + "\"" + email + "\"" + ","
            + "\"instructorPassword\":" + "\"" + pswrd + "\"" +
            "}" ;

        console.log(jsonData);
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/instructors/",
            type: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function(data, textStatus, response){
                alert("Instructor was Created");
                document.location.href = "login.html";
            },
            error: function (xhr, status, err) {
                alert("Error Sign Up");
            }
        });
    });
});

function removeCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for(var i = 0; i < multiple.length; i++) {
        var key = multiple[i].split("=");
        document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
    window.location.href = "login.html";
}

(function($) {

    var tabs = $(".nav nav-justified li a");

    tabs.click(function() {
        var content = this.hash.replace('/', '');
        tabs.removeClass("active");
        $(this).addClass("active");
        $("#content").find('.data').hide();
        $(content).fadeIn(200);
    });

})(jQuery);
$(document).ready(function() {
    $("#content").find('.data').hide();
    $("#content").find('#tab-eg115-0').show();
});

$(function() {
    $("#addNewCourseForm").on("submit",function(e){
        e.preventDefault();
        var code = document.getElementById("courseCode").value;
        var name = document.getElementById("courseName").value;
        var year = document.getElementById("courseYear").value;
        var term = document.getElementById("courseTerm").value;
        var jsonData;
        jsonData = "{"
            + "\"courseCode\":" + "\"" + code + "\"" + ","
            + "\"courseName\":" + "\"" + name + "\"" + ","
            + "\"courseSemester\":" + "\"" + year + "/" + term + "\"" + "}" ;
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/courses/",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function (data,textStatus,response) {
                alert("Ders Eklendi.");
                window.location.href = "course.html?id=" + data.id;
            },
            error: function (xhr, status, err) {
                alert("Ders Eklenirken Hata Olustu.")
            }

        });

    });
});

$(function() {
    $("#editCourseForm").on("submit",function(e){
        e.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var idParam = url.searchParams.get("id");
        var code = document.getElementById("courseCode").value;
        var name = document.getElementById("courseName").value;
        var year = document.getElementById("courseYear").value;
        var term = document.getElementById("courseTerm").value;
        var jsonData;
        jsonData = "{"
            + "\"courseCode\":" + "\"" + code + "\"" + ","
            + "\"courseName\":" + "\"" + name + "\"" + ","
            + "\"courseSemester\":" + "\"" + year + "/" + term + "\"" + "}" ;
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/courses/" + idParam,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function (data,textStatus,response) {
                alert("Course Updated!!!");
                window.location.href = "course.html?id=" + data.id;
            },
            error: function (xhr, status, err) {
                alert("Error occured while updating course!!!")
            }

        });

    });
});


$(function() {
    $("#addStudentToCourseForm").on("submit",function(e){
        e.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var idParam = url.searchParams.get("id");
        var sid = document.getElementById("studentSchoolId").value;
        var sname = document.getElementById("studentName").value;
        var slname = document.getElementById("studentLastname").value;
        var jsonData;
        jsonData = "{"
            + "\"studentSchoolId\":" + "\"" + sid + "\"" + ","
            + "\"studentName\":" + "\"" + sname + "\"" + ","
            + "\"studentLastname\":" + "\"" + slname + "\"" + "}" ;
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/courses/" + idParam + "/list",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            data: jsonData,
            success: function (data,textStatus,response) {
                alert("Course Updated!!!");
                window.location.reload(true);
            },
            error: function (xhr, status, err) {
                alert("Error occured while adding student to course!!!")
            }

        });

    });
});

$(function() {
    $("#addNewCommentForm").on("submit",function(e) {
        e.preventDefault();
        var cookies = document.cookie.split(";");
        var username = "";
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("username")) {
                var usernameCookie = cookies[i].split("=");
                username = usernameCookie[1];
            }
        }
        var url_string = window.location.href;
        var url = new URL(url_string);
        var qidParam = url.searchParams.get("qid");
        var idParam = url.searchParams.get("id");
        var jsonData;
        var message = document.getElementById("commentMessage").value;
        jsonData = "{"
            + "\"message\":" + "\"" + message + "\"" + ","
            + "\"author\":" + "\"" + username + "\"" + "}" ;

        console.log(message);
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/questions/" + qidParam + "/answers",
            type: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function(data2, textStatus, response){
                alert("Comment Added");
                document.location.reload(true);
            },
            error: function (xhr, status, err) {
                alert("Error comment add");
            }
        });
    });
});

function deletePost() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var qidParam = url.searchParams.get("qid");
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/questions/" + qidParam,
        method: "DELETE",
        headers: {},
        success: function (data,textStatus,response) {
            //console.log(data.id);
            alert("Post Deleted");
            window.location.href = "index.html";
        },
        error: function (xhr, status, err) {
            alert("Error occured while deleting post");
        }

    })
}

function getStudentList() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var idParam = url.searchParams.get("id");
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/courses/" + idParam + "/list",
        method: "GET",
        headers: {},
        success: function (data,textStatus,response) {
            console.log(data);
            var list = document.getElementById("studentList");
            var temp = "";
            for (var i = 0; i < data.length; i++) {
                temp += "<tr>\n"
                    + " <td>" + data[i].studentSchoolId + "</td>\n"
                    + " <td>" + data[i].studentLastname + "</td>\n"
                    + " <td>" + data[i].studentName + "</td>\n"
                    + " </tr>"
            }
            list.innerHTML = temp;

        },
        error: function (xhr, status, err) {
            alert("Error occured while getting students");
        }

    });
}

$(function() {
    $("#updatePostForm").on("submit",function(e) {
        e.preventDefault();
        var cookies = document.cookie.split(";");
        var username = "";
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("username")) {
                var usernameCookie = cookies[i].split("=");
                username = usernameCookie[1];
            }
        }
        var jsonData;
        var title = document.getElementById("newPostTitle").value;
        var details = document.getElementById("newPostMessage").value;
        var url_string = window.location.href;
        var url = new URL(url_string);
        var qidParam = url.searchParams.get("qid");
        jsonData = "{"
            + "\"title\":" + "\"" + title + "\"" + ","
            + "\"message\":" + "\"" + details + "\"" + ","
            + "\"author\":" + "\"" + username + "\"" + "}";
        console.log("sasasa");
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/questions/" + qidParam,
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function (data, textStatus, response) {
                //console.log(data.id);
                alert("Post Updated");
                window.location.reload(true);
            },
            error: function (xhr, status, err) {
                alert("Error occured while updating post");
            }

        })
    });
});

function updateComment(answerId) {
    e.preventDefault();
    var cookies = document.cookie.split(";");
    var username = "";
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].includes("username")) {
            var usernameCookie = cookies[i].split("=");
            username = usernameCookie[1];
        }
    }
    var jsonData;
    var details = document.getElementById("newCommentMessage").value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var qidParam = url.searchParams.get("qid");
    jsonData = "{"
        + "\"message\":" + "\"" + details + "\"" + ","
        + "\"author\":" + "\"" + username + "\"" + "}";
    console.log("sasasa");
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/questions/" + qidParam + "/answers/" + answerId,
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        processData: false,
        data: jsonData,
        success: function (data, textStatus, response) {
            //console.log(data.id);
            alert("Post Updated");
            window.location.reload(true);
        },
        error: function (xhr, status, err) {
            alert("Error occured while updating post");
        }

    })
}

function deleteComment(answerId) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var qidParam = url.searchParams.get("qid");
    console.log(answerId);
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/questions/" + qidParam + "/answers/" + answerId,
        method: "DELETE",
        headers: {},
        success: function (data,textStatus,response) {
            //console.log(data.id);
            alert("Comment Deleted");
            window.location.reload(true);
        },
        error: function (xhr, status, err) {
            alert("Error occured while deleting comment");
        }

    })
}

$(function() {
    $("#addNewPostForm").on("submit",function(e){
        var cookies = document.cookie.split(";");
        var username = "";
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].includes("username")) {
                var usernameCookie = cookies[i].split("=");
                username = usernameCookie[1];
            }
        }
        var url_string = window.location.href;
        var url = new URL(url_string);
        var idParam = url.searchParams.get("id");
        e.preventDefault();
        //console.log("deneme.");
        var jsonData;
        var title = document.getElementById("postTitle").value;
        var details = document.getElementById("postMessage").value;
        jsonData = "{"
            + "\"title\":" + "\"" + title + "\"" + ","
            + "\"message\":" + "\"" + details + "\"" + ","
            + "\"author\":" + "\"" + username + "\"" + "}" ;
        //console.log("sa");
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/courses/" + idParam + "/questions",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function (data,textStatus,response) {
                //console.log(data.id);
                alert("Post Added");
                window.location.href = "course.html?id=" + idParam;
            },
            error: function (xhr, status, err) {
                alert("Error occured while creating post")
            }

        });

    });
});


$(function() {
    $("#addResourcesForm").on("submit",function(e){
        e.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var idParam = url.searchParams.get("id");
        var file = document.getElementById("resourcesFile").files.item(0);
        var tag = document.getElementById("resourcesTag").value;
        var jsonData;
        jsonData = "{"
            + "\"filename\":" + "\"" + file.name + "\"" + ","
            + "\"tag\":" + "\"" + tag + "\"" + "}" ;
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/courses/" + idParam + "/resources",
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function (data,textStatus,response) {
                //console.log(data.id);
                uploadFile();

            },
            error: function (xhr, status, err) {
                alert("Dosya Eklenirken Hata Olustu.")
            }
        });
    });
});

function uploadFile() {
    var file = document.getElementById("resourcesFile");
    var form = new FormData();
    console.log(file);
    form.append("uploadfile", file.files.item(0));
    form.append("keyname", file.files.item(0).name);
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/api/file/upload",
        method: "POST",
        headers: {},
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        success: function (data,textStatus,response) {
            //console.log(data.id);
            alert("Resources Added.");
            window.location.reload();
        },
        error: function (xhr, status, err) {
            alert("Dosya Eklenirken Hata Olustu.")
        }
    });
}

function deleteCourse() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var idParam = url.searchParams.get("id");
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/courses/" + idParam,
        method: "DELETE",
        headers: {},
        success: function (data,textStatus,response) {
            //console.log(data.id);
            alert("Course was deleted!");
            window.location.href = "index.html";
        },
        error: function (xhr, status, err) {
            alert("Error occured While Course is deleting!");
        }
    });
}


