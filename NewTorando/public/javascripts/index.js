var $targetUser = '';
var socket;

function showChats(){
    $('#contacts_list').css('display', 'none');
    $('#chat_list').css('display', 'block');
    $('#settings').css('display', 'none');
};

function showContacts (){
    $('#contacts_list').css('display', 'block');
    $('#chat_list').css('display', 'none');
    $('#settings').css('display', 'none');
};

function showSettings(){
    $('#contacts_list').css('display', 'none');
    $('#chat_list').css('display', 'none');
    $('#settings').css('display', 'block');
};

function hideAll(){
    $('#contacts_list').css('display', 'none');
    $('#chat_list').css('display', 'none');
    $('#settings').css('display', 'none');
}

function logout(userName) {
    // socket.emit('logout', userName, function (callback) {
    //     if(callback){
    //         //TODO:complete end session and get login page
    //     } else {
    //         alert('Logout faild! Please try again');
    //     }
    // });
}

function openNewChat(userName){
   console.log(userName + ' openNewChat OK');//debug
    $targetUser = userName;
    $('#chat_list').append('<li><button onclick="openChat(\'' + userName + '\')">' + userName + '</button></li>');
    openChat(userName);
};

function openChat(userName){
    console.log(userName + ' openChat OK');//debug
    $.post('/chat', {user: userName}, function (data, status) {
        if(status === 'success'){
            // $('#active_chat').append('<div style="display: block; height: 150px" class="chat_window" id="' + userName + '">' + data + '</div>')
            // location.replace('http://localhost:3000');
            // window.open('http://localhost:3000/chat', '_self');
            // window.open('http://localhost:3000/chat');
        } else {
            // alert('chat open failed, please try again');
        }
    });

    $.get('/chat', function (data, status) {
        if(status === 'success'){
            // $('#active_chat').append('<div style="display: block; height: 150px" class="chat_window" id="' + userName + '">' + data + '</div>')
            // location.replace('http://localhost:3000');
            // window.open('http://localhost:3000/chat', '_self');
            window.open('http://localhost:3000/chat');
        } else {
            alert('chat open failed, please try again');
        }
    });
    // $targetUser = userName;
    // hideAll();
    // socket.emit('set target', $targetUser);

};

$(function($){
    // var socket = io.connect();
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
                var socketID = data[i].socket_id;
                var user = data[i].user;
                var lang = data[i].language;
                var status = data[i].status;
                var str = '<li><button onclick="openNewChat(\'' + user + '\')">' + user + '</button></li>';

                contactList.append(str);
            }
            contactList.append('</ul>')
        } else {
           alert('Error retreaving contacs, please refresh the page');
        }
    });

    /*single chat js code*/

    //var socket = io.connect();
    var $msgBtn= $('#caht_send_btn');
    var $txtInput = $('#chat_textbox');
    var $chat = $('#chat_body');
    var $lang = $('#language');


    $msgBtn.click(function(e){
        e.preventDefault();
        socket.emit('send_msg', $txtInput.val() , $lang.val(), $targetUser);
        console.log('msg sent');//debug
        $txtInput.val('');
    });

    socket.on('new_msg', function(data){
        console.log('msg recieved');//debug
        console.log($targetUser);//debug
        $chat.append(data + "</br>");
    });

});