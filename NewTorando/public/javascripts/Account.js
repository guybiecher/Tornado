//
// $(function($) {
//     $.get('/loadpic', function (data, status) {
//         console.log("data check")
//         console.log(data.toString())
//         var pic = data.toString()
//         console.log(pic)
//         $("#profile_pic").html( "<img src=" + pic + "  id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//
//
//     });
// });
//
// function update() {
//     var updatePerson = {
//         name: $("#userName").val(),
//         password:$("#password").val(),
//         retypePassword:$("#Confirmpassword").val()
//     }
//
//     if(updatePerson.password != updatePerson.retypePassword){
//         alert("password and the comnfirm isnt match");
//     }
//     console.log(updatePerson.name)
//     console.log(updatePerson.password)
//     $.post('/updateUser',
//         {
//             name: updatePerson.name,
//             password: updatePerson.password
//         },
//         function(data, status){
//             if(data === "Cant update user"){
//                 alert("Cant update user");
//             }else{
//                 console.log("Status: " + status);
//                 window.location.href = 'http://localhost:3000/chat';
//             }
//
//         });
// }
//
//
// function arrowAccount(){
//     console.log("tomerer")
//
//     // $.get('/settings' ,function(data, status){
//     //     console.log("Status: " + status);
//     //     if(data === "Didn't login"){
//     //         alert("momsda")
//     //     }
//
//         window.open('/settings', '_self');
//
// };
//
// function smiley() {
//     modal.style.display = "none";
//
//     $("#profile_pic").html( "<img src= 'images/smiely.gif' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//     var pic = 'images/smiely.gif';
//     $.post('/updateProfilePic', {picPath : pic }, function (data, status) {
//         socket.emit('update profile pic', pic, data);
//
//     });
//
// }
// function dog() {
//     modal.style.display = "none";
//
//     $("#profile_pic").html( "<img src= 'images/dog.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//     var pic = 'images/dog.jpeg';
//     $.post('/updateProfilePic', {picPath : pic }, function (data, status) {
//         socket.emit('update profile pic', pic, data);
//
//
//     });
//
//
// }
//
// function sunglass() {
//     modal.style.display = "none";
//
//     $("#profile_pic").html( "<img src= 'images/sunglass.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//     var pic = 'images/sunglass.jpeg';
//     $.post('/updateProfilePic', {picPath : pic }, function (data, status) {
//         socket.emit('update profile pic', pic, data);
//
//
//     });
//
//
// }
//
// function hloah() {
//     modal.style.display = "none";
//
//     $("#profile_pic").html( "<img src= 'images/hloah.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//     var pic = 'images/hloah.jpeg';
//     $.post('/updateProfilePic', {picPath : pic }, function (data, status) {
//         socket.emit('update profile pic', pic, data);
//     });
//
//
//
//
// }
//
// function teen() {
//     modal.style.display = "none";
//
//     $("#profile_pic").html( "<img src= 'images/teen.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
//     var pic = 'images/teen.jpeg';
//     $.post('/updateProfilePic', {picPath : pic }, function (data, status) {
//         socket.emit('update profile pic', pic, data);
//
//
//     });
//
//
// }