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

function openNewChat(user_obj){
    $('#chat_list').append("<li onclick=openChat(" + user_obj + ")>" + data[i].user + "</li>");
    openChat(user_obj);
};

function openChat(user_obj){
    if(1){

    }
};

$(function(){
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
        if(status === 'success'){
            for(var i in data){
                $('#contacts_list').append("<li onclick=openNewChat(" + data[i] + ")>" + data[i].user + "</li>");
            }
        } else {
           alert('Error retreaving contacs, please refresh the page');
        }
    });

});