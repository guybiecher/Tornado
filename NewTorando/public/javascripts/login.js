/**
 * Created by tomerbarshishat on 24/08/2016.
 */

function login() {
    var person = {
        name: $("#userName").val(),
        password:$("#password").val()
    }

    console.log(person.name)
    console.log(person.password)
    $.post("/login",
        {
            name: person.name,
            password: person.password
        },
        function(data, status){
            console.log("Status: " + status);
            if(data === "Didn't login"){
                alert("login failed")
            }else{
                window.location.href = 'http://localhost:3000/home';
            }


        });
}

function registerlogin(){
    window.location.href = 'http://localhost:3000/register';
}


