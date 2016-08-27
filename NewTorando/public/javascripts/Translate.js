/**
 * Created by tomerbarshishat on 27/08/2016.
 */
function updateLanguage() {
    var $lang = $('#language');
    $.post('/updatelanguage',
        {
            language : lang
        }),
        function (data) {
            if(data === "Cant get language"){
                alert("choose other language")
            }
            alert("language choose")
        }
    
}