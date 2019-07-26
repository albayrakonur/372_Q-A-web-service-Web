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
    console.log(username);
    if (!username && !userRole) {
        console.log("oturum kapalı");
        document.getElementById("UserOn").style.display = "none";
        document.getElementById("navbarUserOn").style.display = "none";
        document.getElementById("UserOff").style.display = "inline";

    }else if(username && userRole){
        console.log("oturum acik");
        document.getElementById("UserOff").style.display = "none";
        document.getElementById("UserOn").style.display = "inline";
        document.getElementById("navbarUserOn").style.display = "inline";

    }

});


$(function() {
    $("#InstructorLoginForm").on("submit",function(e) {
        e.preventDefault();
        var mail = document.getElementById("user_email").value;
        var pswrd = document.getElementById("user_password").value;
        var form = new FormData();
        form.append("instructorMail", mail);
        form.append("instructorPassword", pswrd);
        console.log(mail + ", " + pswrd);
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
        console.log(name);
        var surname = document.getElementById("user_surname").value;
        console.log(surname);
        var email = document.getElementById("user_email").value;
        console.log(email);
        var pswrd = document.getElementById("user_pwd").value;
        console.log(pswrd);
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

$(function() {
    $("#addNewCourseForm").on("submit",function(e){
        e.preventDefault();
        var code = document.getElementById("courseCode").value;
        var name = document.getElementById("courseName").value;
        var year = document.getElementById("courseYear").value;
        var term = document.getElementById("courseTerm").value;
        console.log(year);
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
                //console.log(data.id);
                alert("Ders Eklendi.");
                window.location.href = "course.html?id=" + data.id;
            },
            error: function (xhr, status, err) {
                alert("Ders Eklenirken Hata Olustu.")
            }

        });

    });
});


