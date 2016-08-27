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