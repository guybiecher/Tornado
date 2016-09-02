
function updatelanguage() {

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

function arrowAccount(){
    console.log("tomerer")

    // $.get('/settings' ,function(data, status){
    //     console.log("Status: " + status);
    //     if(data === "Didn't login"){
    //         alert("momsda")
    //     }

    window.open('/settings', '_self');

};