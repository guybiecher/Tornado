/**
 * Created by tomerbarshishat on 24/08/2016.
 */

var username = $("#userName").valueOf();
var password = $("#password").valueOf();
var Retype_password = $("#Retype_password").valueOf();

if(password =! Retype_password){
    $("#error").html("the password is not match");
}
$("#Register").click(function() {
    var person = {
        name: $("userName").val(),
        password:$("#password").val()
    }

    $.ajax({
        url: '/register',
        type: 'post',
        dataType: 'json',
        succsess: function(data) {
            if (data == "ERROR_1") {
                $("#command").html("The username is invalid");
            } else if (data == "ERROR_2") {
                $("#command").html("The password is invalid");
            }
        },

        data: person


    });


});

