function update() {
    var updatePerson = {
        name: $("#userName").val(),
        password:$("#password").val(),
        retypePassword:$("#Confirmpassword").val()
    }

    if(updatePerson.password != updatePerson.retypePassword){
        alert("password and the comnfirm isnt match");
    }
    console.log(updatePerson.name)
    console.log(updatePerson.password)
    $.post('/updateUser',
        {
            name: updatePerson.name,
            password: updatePerson.password
        },
        function(data, status){
            if(data === "Cant update user"){
                alert("Cant update user");
            }else{
                console.log("Status: " + status);
                window.location.href = 'http://localhost:3000/chat';
            }

        });
}


function arrowAccount(){
    console.log("tomerer")

    // $.get('/settings' ,function(data, status){
    //     console.log("Status: " + status);
    //     if(data === "Didn't login"){
    //         alert("momsda")
    //     }

        window.open('/settings', '_self');

};

function smiley() {
    alert("dasdadas")
    var temp =  $("#profile_pic")
    alert(temp)
    document.getElementById('profile_pic').html('<img src="images/dog.jpeg" id="logout_icon" style="border-radius:50%; width:50px; height:50px; float:left" >')

    $.post('/updateProfilePic', {picPath : "/Users/tomerbarshishat/WebstormProjects/Tornado/NewTorando/public/images/smiley.gif" }, function (data, status){

    });
}
function dog() {
    alert("ok");

    var pic = "dog.jpeg"
    $.post('/updateProfilePic', {picPath : pic }, function (data, status) {


    });
}