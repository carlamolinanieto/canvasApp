$('document').ready(function setLines() {
    var lines_array = ["1", "3", "6", "12"];

    for (var i = 0; i<lines_array.length; i++){
        $('#changeLine').append('<div class="set_line" id='+lines_array[i]+' style="height:'+lines_array[i]+'px" onclick="lineas('+lines_array[i]+')"></div>')
    }
});