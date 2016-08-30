/**
 * Created by tomerbarshishat on 27/08/2016.
 */


function Account(){
    console.log("tomerer")
    $(document).ready(function() {
        $.get('/account', function (data, status) {
            console.log("Status: " + status);
            console.log(data);
            window.open('/account', '_self')
            if (data === "Didn't login") {
                alert("momsda")
            }



        });
    });
};

function Translate(){
    console.log("tomererTTTTT")

    $.get('/translate' ,function(data, status){
        console.log("Status: " + status);
        console.log("tomererTTTTTINTO")

        if(data === "Didn't login"){
            alert("momsda")
        }

        window.open('/translate',"_parent")
    });
};



function About(){
    console.log("tomerer")

    $.get('/account' ,function(data, status){
        console.log("Status: " + status);
        if(data === "Didn't login"){
            alert("momsda")
        }

        window.open('/About', '_self')
    });
};