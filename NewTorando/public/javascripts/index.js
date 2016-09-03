var myName = '';
var $targetUser = '';
var socket;
var activeChat = '';
var chatOpen ;
var inChat = new Array(100);

function showChats(){
    chatOpen = true
    hideAll();
    $('#chatSearch_list').empty()
    $('#chat_list').css('display', 'block');

}

function showContacts (){
    chatOpen = false
    hideAll();
    $('#contacts_list').empty()
    reloadContacts()
    $('#contacts_list').css('display', 'block');
}

function showSettings(){
    hideAll();
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
    //         for(var i in data){
    //             var user = data[i].user;
    //             var str = '<button onclick="openNewChat(\'' + user + '\')" class="btns_list">' + user + '</button>';
    //             contactList.append(str);
    //         }
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
                for(var i in data){
                    var user = data[i].user;
                    console.log(user)
                    if(user === search){
                        var str = '<button onclick="openNewChat(\'' + user + '\')" class="btns_list">' + user + '</button>';
                        contactList.append(str);
                    }
                }
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
                for(var i in inChat){
                    console.log("testt the search")
                    console.log(inChat.toString())
                    var user = inChat[i];
                    console.log("check user and search" + user + "and" + search)
                    if(user === search){
                        var str = '<button onclick="openNewChat(\'' + user + '\')" class="btns_list">' + user + '</button>';
                        chatList.append(str);
                    }

                }
            } else {
                alert('Error retreaving contacs, please refresh the page');
            }

        });
    }
    $('#chatSearch_list').css('display', 'block');


}

function reloadContacts() {
    console.log("ttttttttt")
    $.get('/contacts', function(data, status){
        console.log("fffff")
        var contactList = $('#contacts_list');
        if(status === 'success'){
            for(var i in data){
                var user = data[i].user;
                var str = '<button onclick="openNewChat(\'' + user + '\')" class="btns_list">' + user + '</button>';
                contactList.append(str);
            }
        } else {
            alert('Error retreaving contacs, please refresh the page');
        }
    });
}