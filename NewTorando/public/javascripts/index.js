var myName = '';
var $targetUser = '';
var socket;
var activeChat = '';

function showChats(){
    hideAll();
    $('#chat_list').css('display', 'block');

};

function showContacts (){
    hideAll()
    $('#contacts_list').css('display', 'block');
};

function showSettings(){
    hideAll()
    $('#settings').css('display', 'block');
};

function hideAll(){
    $('#contacts_list').css('display', 'none');
    $('#chat_list').css('display', 'none');
    $('#settings').css('display', 'none');
    $('#chat_container').css('display', 'none');
    $('#' + activeChat).css('display', 'none');
}

function showChat() {
    hideAll()
    $('#header').css('display', 'none');
    $('#chat_container').css('display', 'block');
    $('#' + activeChat).css('display', 'block');
}

function openNewChat(userName){
   console.log(userName + ' openNewChat OK');//debug
    $('#chat_list').append('<li><button onclick="reopenChat(\'' + userName + '\')">' + userName + '</button></li>');
    openChat(userName);


};

function reopenChat(userName){
    console.log(userName + ' openNewChat OK');//debug
    activeChat = userName;
    $targetUser = userName;

    $.post('/chat', {user: userName}, function (data, status) {
    });

    showChat();
};

function openChat(userName){
    console.log(userName + ' openChat OK');//debug
    hideAll();
    showChat();
    activeChat = userName;
    $targetUser = userName;
    $.post('/chat', {user: userName}, function (data, status) {
    });

    $.get('/chat', function (data, status) {
        console.log('/chat request:')
        if(status === 'success'){
            $('#chat_container').append('<div style="display: block; height: 150px" class="chat_window" id="' + userName + '">' + data + '</div>')
            // location.replace('http://localhost:3000');
            // window.open('http://localhost:3000/chat', '_self');
            // window.open('http://localhost:3000/chat');
        } else {
            alert('chat open failed, please try again');
        }
    });
    // $targetUser = userName;
    // hideAll();
    // socket.emit('set target', $targetUser);

};

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

    $.get('/contacts', function(data, status){
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

    $.get('/getMyName', function (data) {
        myName = data;
    });

    socket.on('new_msg', function(data, src){
        console.log('msg recieved');//debug
        console.log(data);//debug
        console.log(src);//debug
        $('#' + src).find('#chat_body').append(data + "</br>");
    });
});

/*single chat js code*/

function sendMsg() {
    var target = activeChat;
    var $txtInput = $('#' + target).find('#chat_textbox');
    var $chat = $('#' + target).find('#chat_body');
    var $lang = $('#' + target).find('#language');

    // $.get('/getTarget', function (data, status) {
    //     console.log('/getTarget request:')
    //     if(status === 'success'){
    //         target = data;
    //         console.log(data);
    //         $txtInput = $('#' + target).find('#chat_textbox');
    //         console.log($txtInput);
    //         $chat = $('#' + target).find('#chat_body');
    //         $lang = $('#' + target).find('#chat_body');
    //     } else {
    //         target = 'User is offline and can\'t get messages';
    //     }
    // })
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
    // var text = $("#chat_textbox").val();

};

function backToLobby (){
    $('#' + activeChat).css('display', 'none');
    $('#header').css('display', 'block');
    showChats();
    // $('.chat_window').css('display', 'none');
    // $('#chat_list').css('display', 'none');

};

function logout() {
    console.log("logout")
    socket.emit('logout', myName);
    $.get('/logout' , function (data,status) {
        window.open('http://localhost:3000/login', '_self')
    })
}