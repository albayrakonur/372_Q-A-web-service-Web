$( document ).ready(function() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var idParam = url.searchParams.get("id");
    var courseList = document.getElementById("coursesList");
    var list = "";
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://mergen-etu.herokuapp.com/courses/",
        type: "GET",
        headers: {},
        success: function(data, textStatus, response){
            for (var i = 0; i < data.length; i++) {
                list += "<a class=\"dropdown-item\" href=\"" + "course.html?id=" + data[i].id + "\">" + data[i].courseName + "</a>"
            }
            courseList.innerHTML = list;
        },
        error: function (xhr, status, err) {
            alert("error");
        }
    });

    var resources = document.getElementById("nav_Resources");
    resources.innerHTML = "<a class=\"nav-link\" href=\"resources.html?id=" + idParam + "\">Resources</a>"
});

$(function() {
    $("#addNewPostForm").on("submit",function(e){
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
            + "\"author\":" + "\"" + "Enes" + "\"" + "}" ;
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
                alert("Gonderi Eklendi.");
                window.location.href = "course.html?id=" + idParam;
            },
            error: function (xhr, status, err) {
                alert("Gonderi Eklenirken Hata Olustu.")
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
    $("#addNewCommentForm").on("submit",function(e) {
        e.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var qidParam = url.searchParams.get("qid");
        var idParam = url.searchParams.get("id");
        var jsonData;
        var message = document.getElementById("commentMessage").value;
        jsonData = "{"
            + "\"message\":" + "\"" + message + "\"" + ","
            + "\"author\":" + "\"" + "Onur Albayrak" + "\"" + "}" ;

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

$(function() {
    $("#createStudentForm").on("submit",function(e) {
        e.preventDefault();
        console.log("saa");
        var name = document.getElementById("user_name").value;
        console.log(name);
        var surname = document.getElementById("user_surname").value;
        console.log(surname);
        var email = document.getElementById("user_email").value;
        console.log(email);
        var schoolId = document.getElementById("user_schoolID").value;
        console.log(schoolId);
        var pswrd = document.getElementById("user_pwd").value;
        console.log(pswrd);
        jsonData = "{"
            + "\"schoolId\":" + "\"" + schoolId + "\"" + ","
            + "\"studentFirstName\":" + "\"" + name + "\"" + ","
            + "\"studentLastName\":" + "\"" + surname + "\"" + ","
            + "\"studentMail\":" + "\"" + email + "\"" + ","
            + "\"studentPassword\":" + "\"" + pswrd + "\"" +
            "}" ;

        console.log(jsonData);
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/students/",
            type: "POST",
            headers: {
                "content-type": "application/json"
            },
            processData: false,
            data: jsonData,
            success: function(data, textStatus, response){
                alert("Student was Created");
                document.location.href = "login.html";
            },
            error: function (xhr, status, err) {
                alert("Error Sign Up");
            }
        });
    });
});

$(function() {
    $("#studentLoginForm").on("submit",function(e) {
        e.preventDefault();
        var mail = document.getElementById("user_email").value;
        var pswrd = document.getElementById("user_password").value;
        var form = new FormData();
        form.append("studentMail", mail);
        form.append("studentPassword", pswrd);
        console.log(pswrd + " " + mail);
        $.ajax({
            async: true,
            crossDomain: true,
            url: "https://mergen-etu.herokuapp.com/students/login",
            method: "POST",
            headers: {},
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data: form,
            success: function (data, textStatus, response) {
                document.cookie = "userRole=Student";
                document.cookie = "username=" + mail;
                window.location.href = "index.html";
            },
            error: function (xhr, status, err) {
                alert("Error");
            }
        });
    });
});
