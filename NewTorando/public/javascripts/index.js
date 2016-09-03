var myName = '';
var $targetUser = '';
var socket;
var activeChat = '';
var chatOpen ;
var inChat = new Array(100);

function showChats(){
    $('#header').css('display', 'block');
    chatOpen = true
    hideAll();
    $('#chatSearch_list').empty()

    $('#chat_list').css('display', 'block');

}

function showContacts (){
    $('#header').css('display', 'block');
    chatOpen = false
    hideAll();
    $('#contacts_list').empty()
    reloadContacts()
    $('#contacts_list').css('display', 'block');
}

function showSettings() {
    hideAll();
    $('#header').css('display', 'none');
    $.get('/settings', function (data, status) {
        if (data === "Didn't login") {
            alert("momsda")
        }
        $('#settings').html(data.toString())


    });
    $('#settings').css('display', 'block');

}






function hideAll(){
    $('#contacts_list').css('display', 'none');
    $('#chat_list').css('display', 'none');
    $('#settings').css('display', 'none');
    $('#chat_container').css('display', 'none');
    $('#' + activeChat).css('display', 'none');
}

function showChat() {
    hideAll();
    $('#header').css('display', 'none');
    $('#chat_container').css('display', 'block');
    $('#' + activeChat).css('display', 'block');
}

function openNewChat(userName){
    hideAll();
   console.log(userName + ' openNewChat OK');//debug
    inChat.push(userName)
    var button ='#' + userName + '_btn';
    if($(button).length){
        reopenChat(userName);
    } else {
        $('#chat_list').append('<button id="' + userName + '_btn" onclick="reopenChat(\'' + userName + '\')" class="btns_list">' + userName + '</button>');//last change was here userName+_btn
        openChat(userName);
    }
}

function reopenChat(userName){
    hideAll();
    console.log(userName + ' openNewChat OK');//debug
    activeChat = userName;
    $targetUser = userName;
    $.post('/chat', {user: userName}, function (data, status) {
    });
    $('#' + userName + '_btn').css('color', 'white');
    showChat();
}

function openChat(userName){
    console.log(userName + ' openChat OK');//debug
    hideAll();
    showChat();
    activeChat = userName;
    $targetUser = userName;

    $.post('/chat', {user: userName}, function (data, status) {

    });

    $.get('/chat',{user: userName} , function (data, status) {
        console.log('/chat request:');
        if(status === 'success'){
            $('#chat_container').append('<div style="display: block; height: 150px" class="chat_window" id="' + userName + '"><div class="chat_header"><button id="chat_back_btn" onclick="backToLobby()">Back to lobby</button><img src="#" id="single_chat_profile_pic"><h1 id="chat_title">Chat with ' + userName + '</h1>' + data + '</div></div>')
        } else {
            alert('chat open failed, please try again');
        }
    });
    showChat();
    $('#' + userName).find('#chat_title').text(userName);
}

function openHiddenChat(userName, text){
    console.log(userName + ' openHiddenChat OK');//debug
    $targetUser = userName;
    $.post('/chat', {user: userName}, function (data, status) {
    });

    $.get('/chat', function (data, status) {
        console.log('/chat request:');
        if(status === 'success'){
            $('#chat_container').append('<div style="display: none; height: 150px" class="chat_window" id="' + userName + '">' + data + '</div>')
        } else {
            alert('chat open failed, please try again');
        }
    });

    $('#' + userName).find('#chat_body').append(text + "</br>");
    $('#' + userName).find('#chat_title').text(userName);
}

function openNewHiddenChat(userName, text){
    console.log(userName + ' openNewHiddenChat OK');//debug
    $('#chat_list').append('<button id="' + userName + '_btn" onclick="reopenChat(\'' + userName + '\')" style="color:greenyellow" class="btns_list">' + userName + '</button>');//last change was here userName+_btn
    openHiddenChat(userName, text);
}

$(function($){
    socket = io.connect();
    $.get('/session', function(data, status){
        console.log(data);
        if(status === 'success'){
           socket.emit('new socket', data);
       } else {
           alert(data);
       }
    });
    reloadContacts();
    // $.get('/contacts', function(data, status){
    //     var contactList = $('#contacts_list');
    //     if(status === 'success'){
    //         contactList.append('<ul>');
    //         for(var i in data){
    //             var user = data[i].user;
    //             var str = '<button onclick="openNewChat(\'' + user + '\')" class="btns_list">' + user + '</button>';
    //             contactList.append(str);
    //         }
    //         contactList.append('</ul>')
    //     } else {
    //        alert('Error retreaving contacs, please refresh the page');
    //     }
    // });

    $.get('/getMyName', function (data) {
        myName = data;
    });



    socket.on('new_msg', function(data, src){
        console.log('msg recieved');//debug
        console.log(data);//debug
        console.log(src);//debug
        var chatWindow = $('#' + src);
        console.log(chatWindow);

        if(!chatWindow.length){
            openNewHiddenChat(src, data);
            $('#' + src).find('#chat_body').append(data + "</br>"); //not working
        } else {
            if(chatWindow.css("display") === "block"){
                chatWindow.find('#chat_body').append(data + "</br>");
            } else {
                chatWindow.find('#chat_body').append(data + "</br>");
                $('#' + src + '_btn').css('color', 'greenyellow');
            }
        }

    });
});




/*single chat js code*/

function sendMsg() {
    var target = activeChat;
    var $txtInput = $('#' + target).find('#chat_textbox');
    var $chat = $('#' + target).find('#chat_body');
    var $lang = $('#' + target).find('#language');

    console.log('send message request:');
    console.log(target);
    console.log($txtInput);
    console.log($chat);
    console.log($lang);
    socket.emit('send_msg', $txtInput.val() , $lang.val(), target, myName);
    console.log('msg sent');//debug
    $txtInput.val('');
}

function prevTrans() {
    console.log('trns_prev_panel');
    var target = activeChat;
    var $txtInput = $('#' + target).find('#chat_textbox');
    var $panel = $('#panel_text_container');
    var $lang = $('#' + target).find('#language');

    socket.emit('preview_msg', $txtInput.val() , $lang.val());
    socket.on('incoming_msg_preview', function (text) {
        $panel.text('');
        $panel.text(text);
    })

}

function backToLobby (){
    $('#' + activeChat).css('display', 'none');
    $('#header').css('display', 'block');
    $('#' + activeChat + '_btn').css('color', 'white');
    showChats();

}

function logout() {
    console.log("logout");
    socket.emit('logout', myName);
    $.get('/logout' , function (data,status) {
        window.open('http://localhost:3000/login', '_self')
    })
}


function search() {

    var search = $('#search').val();
    if (!chatOpen){
        $('#contacts_list').empty()
        $.get('/contacts', function(data, status){
            chatOpen = false;
            var contactList = $('#contacts_list');
            if(status === 'success'){
                contactList.append('<ul>')
                for(var i in data){
                    var user = data[i].user;
                    console.log(user)
                    if(user === search){
                        var str = '<button onclick="openNewChat(\'' + user + '\')">' + user + '</button>';
                        contactList.append(str);
                    }

                }
                contactList.append('</ul>')
            } else {
                alert('Error retreaving contacs, please refresh the page');
            }
        });
    }else if(chatOpen){
        hideAll()
        $('#chatSearch_list').empty()
        $.get('/contacts', function(data, status){
            var chatList = $('#chatSearch_list');
            if(status === 'success'){
                chatList.append('<ul>')
                for(var i in inChat){
                    console.log("testt the search")
                    console.log(inChat.toString())
                    var user = inChat[i];
                    console.log("check user and search" + user + "and" + search)
                    if(user === search){
                        var str = '<li><button onclick="reopenChat(\'' + user + '\')">' + user + '</button></li>';
                        chatList.append(str);
                    }

                }
                chatList.append('</ul>')
            } else {
                alert('Error retreaving contacs, please refresh the page');
            }

        });
        $('#chatSearch_list').css('display', 'block');
    }



}


function reloadContacts() {
    console.log("ttttttttt")
    $.get('/contacts', function(data, status){
        console.log("fffff")
        var contactList = $('#contacts_list');
        if(status === 'success'){
            contactList.append('<ul>')
            for(var i in data){
                var user = data[i].user;
                var str = '<li><button onclick="openNewChat(\'' + user + '\')">' + user + '</button></li>';
                contactList.append(str);
            }
            contactList.append('</ul>')
        } else {
            alert('Error retreaving contacs, please refresh the page');
        }
    });
}



function Account(){
    $.get('/loadpic', function (data, status) {
        console.log("data check")
        console.log(data.toString())
        var pic = data.toString()
        console.log(pic)
        $("#profile_pic").html( "<img src=" + pic + "  id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");


    });
    hideAll()
    console.log("tomerer")

        $.get('/account', function (data, status) {
            console.log("Status: " + status);
            console.log("tryyyy");
            var temp = data;
            console.log(data.toString());
            $('#settings').html(data.toString())
            if (data === "Didn't login") {
                alert("momsda")
            }
        });
    $('#account').css('display', 'block');

};


function Translate(){
    console.log("tomererTTTTT")

    $.get('/translate' ,function(data, status){
        console.log("Status: " + status);
        console.log("tomererTTTTTINTO")

        if(data === "Didn't login"){
            alert("momsda")
        }

        $('#settings').html(data.toString());
    });
};



function About(){
    hideAll()
    console.log("tomerer")

    $.get('/about' ,function(data, status){
        console.log("Status: " + status);
        if(data === "Didn't login"){
            alert("momsda")
        }
        $('#settings').html(data.toString())
        $('#settings').css('display', 'block');
    });

};

function arrowSettings() {
    $('#header').css('display', 'block');
    hideAll()

    showChats();
}





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



    function arrow() {
        hideAll()
        $('#account').css('display', 'none');
        $('#settings').css('display', 'block');
        $.get('/settings', function (data, status) {
            if (data === "Didn't login") {
                alert("momsda")
            }
            $('#settings').html(data.toString())
        });

        $('#settings').css('display', 'block');



    }

    function smiley() {
        modal.style.display = "none";

        $("#profile_pic").html("<img src= 'images/smiely.gif' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
        var pic = 'images/smiely.gif';
        $.post('/updateProfilePic', {picPath: pic}, function (data, status) {
            socket.emit('update profile pic', pic, data);

        });

    }

    function dog() {
        modal.style.display = "none";

        $("#profile_pic").html("<img src= 'images/dog.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
        var pic = 'images/dog.jpeg';
        $.post('/updateProfilePic', {picPath: pic}, function (data, status) {
            socket.emit('update profile pic', pic, data);


        });


    }

    function sunglass() {
        modal.style.display = "none";

        $("#profile_pic").html("<img src= 'images/sunglass.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
        var pic = 'images/sunglass.jpeg';
        $.post('/updateProfilePic', {picPath: pic}, function (data, status) {
            socket.emit('update profile pic', pic, data);


        });


    }

    function hloah() {
        modal.style.display = "none";

        $("#profile_pic").html("<img src= 'images/hloah.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
        var pic = 'images/hloah.jpeg';
        $.post('/updateProfilePic', {picPath: pic}, function (data, status) {
            socket.emit('update profile pic', pic, data);
        });


    }

    function teen() {
        modal.style.display = "none";

        $("#profile_pic").html("<img src= 'images/teen.jpeg' id='logout_icon' style='border-radius:50%; width:50px; height:50px; float:left'>");
        var pic = 'images/teen.jpeg';
        $.post('/updateProfilePic', {picPath: pic}, function (data, status) {
            socket.emit('update profile pic', pic, data);


        });
    }



function updatelupdatelanguage() {

    var $lang = $('#language');
    var $onOffBtn = $('#onOffBtn');
    console.log($lang.val());
    console.log($onOffBtn.val());
    $.post('/updatelanguage',
        {
            language : $lang.val(),
            onOffBtn : $onOffBtn.val()
        }),
        function (data) {
            if(data === "Cant get language"){
                alert("Language update failed. Please choose another language")
            } else {
                var socket = io.connect();
                socket.emit('update language', $lang, $onOffBtn, data);
                socket.end();
                alert("language updated")
            }
        }
}

