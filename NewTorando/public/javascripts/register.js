/**
 * Created by tomerbarshishat on 24/08/2016.
 */

function register() {
    var person = {
        name: $("#userName").val(),
        password:$("#password").val()
    }

    console.log(person.name)
    console.log(person.password)
    $.post("/register",
        {
            name: person.name,
            password: person.password
        },
        function(data, status){
           console.log("Status: " + status);
            window.open('http://localhost:3000/');
            window.document.write(data);
        });
}
