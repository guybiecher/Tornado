
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

function openNewChat(userName){
   console.log(userName + ' openNewChat OK');//debug
    $('#chat_list').append('<li><button onclick="openChat(\'' + userName + '\')">' + userName + '</button></li>');
    $.get('/chat', {user: userName}, function (data, status) {

    });

    openChat(userName);
};

function openChat(userName){
    console.log(userName + ' openChat OK');//debug

};

$(function($){
    var socket = io.connect();

    $.get('/session', function(data, status){
        console.log(status);
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
                var str = '<li><button onclick="openNewChat(\'' + user + '\')">' + user + '</button></li>';
                //$('#contacts_list').append("<li onclick=\'openNewChat(" + user + ", " + socketID + ", " + lang + ")\'>" + user + "</li>");
                contactList.append(str);
            }
            contactList.append('</ul>')
        } else {
           alert('Error retreaving contacs, please refresh the page');
        }
    });

});