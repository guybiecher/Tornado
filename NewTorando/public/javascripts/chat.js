$(function($){
    var socket = io.connect();
    var $msgBtn= $('#caht_send_btn');
    var $txtInput = $('#chat_textbox');
    var $chat = $('#chat_body');
    var $lang = $('#language')
    console.log($lang.val())

    $msgBtn.click(function(e){
        e.preventDefault();
        socket.emit('send_msg', $txtInput.val() , $lang.val());
        console.log('msg sent');//debug
        $txtInput.val('');
    });

    socket.on('new_msg', function(data){
        console.log('msg recieved');//debug
       $chat.append(data + "</br>");
    });
});

function prevTrans() {
    var text = $("#chat_textbox").val();

}
