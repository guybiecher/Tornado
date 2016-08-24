/**
 * Created by tomerbarshishat on 24/08/2016.
 */
var username = $("#userName").valueOf();
var password = $("#password").valueOf();


$("#login_button").click(function() {
    var user = {
        name: $("userName").val(),
        password:$("#password").val()
    }

    $.ajax({
        url: '/login',
        type: 'post',
        dataType: 'json',
        succsess: function(data) {
            if (data == "ERROR_1") {
                $("#command").html("The username\\password is incorrect");
            }
        },

        data: user


    });


});
