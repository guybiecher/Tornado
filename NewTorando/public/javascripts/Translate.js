/**
 * Created by tomerbarshishat on 27/08/2016.
 */
function updatelanguage() {

    var $lang = $('#language');
    console.log($lang.val())
    $.post('/updatelanguage',
        {
            language : $lang.val()
        }),
        function (data) {
            if(data === "Cant get language"){
                alert("choose other language")
            }
            alert("language choose")
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