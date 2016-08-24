/**
 * Created by tomerbarshishat on 24/08/2016.
 */

function register() {
    console.log("dadadadadad")
    var person = {
        name: $("#userName").val(),
        password:$("#password").val()
    }

    console.log(person.name)
    console.log(person.password)
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


}

