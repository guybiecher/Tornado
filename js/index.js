function getChats(str) {
    var xhttp;
    if (str == "") {
        document.getElementById("chats_list").innerHTML = "";
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("chats_list").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "getchats.asp?q="+str, true);
    xhttp.send();
}