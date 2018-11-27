$('document').ready(start);

var draw;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius;
var window;
var event;

var paintHistory = {
    saveState: function (canvas, list = this.undoList, keepRedo = false) {
        if (!keepRedo) this.redoList = []
        if (list.length > 9) list.shift()
        list.push(canvas.toDataURL())
    },
    restoreState: function(canvas, ctx, pop, push) {
        if (pop.length) {
            this.saveState(canvas, push, true)
            var restoreState = pop.pop()
            var img = new Image()
            img.src = restoreState
            img.onload = function() {
                console.log('loaded')
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        }
    },
    undo: function(canvas, ctx) {
        console.log('undo', this)
        this.restoreState(canvas, ctx, this.undoList, this.redoList)
    },
    redo: function(canvas, ctx) {
        console.log('redo', this)
        this.restoreState(canvas, ctx, this.redoList, this.undoList)
    },
    undoList: [],
    redoList: []
}

function lineas(numero) {
    radius = numero
}

function pincelSize() {
    $('#pincelval').text(radius)
}

function start() {
    pincelSize()
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function press() {
        paintHistory.saveState(canvas)
        draw = true
        context.moveTo(event.pageX, event.pageY)
    }

    function paint() {
        if (draw) {
            context.lineWidth = radius * 2
            context.lineTo(event.pageX, event.pageY)
            context.stroke()

            context.beginPath()
            context.arc(event.pageX, event.pageY, radius, 0, 360)
            context.fill()

            context.beginPath()
            context.moveTo(event.pageX, event.pageY)
        }
    }

    function leave() {
        draw = false
    }

    $('#canvas').mousedown(press)
    $('#canvas').mousemove(paint)
    $('#canvas').mouseup(leave)

    $('#undo').click(() => paintHistory.undo(canvas, context))
    $('#redo').click(() => paintHistory.redo(canvas, context))
}
