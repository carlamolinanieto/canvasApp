$('document').ready(function setColors() {
    var colors_array = ["#ff3e2d", "#f8005e", "#a100b1", "#662dad", "#3c48b9", "#44b052", "#009789", "#00bbd4", "#00a5e9", "#0f90f2", "#87c54b", "#cddf39", "#feed39", "#ffbe2d", "#f79c22", "#000000", "#5f7b8c", "#9d9d9d ", "#7a5446", "#fe5411"];

    for (var i = 0; i<colors_array.length; i++){
        $('#changeColor').append('<button class="set_color" id='+colors_array[i]+' style="background-color:'+colors_array[i]+'"></button>')
    }

    $('#changeColor button').click(function(){
        var selectedColor = $(this).attr('id');
        context.fillStyle = selectedColor;
        context.strokeStyle = selectedColor;
    });
});