window.onload = function () {
    var list = document.querySelector(".list");
    var prev = document.querySelector("#prev");
    var next = document.querySelector("#next");
    var moved = false;
    var timer; //添加定时器
    var container = document.querySelector(".container");
    var buttons = document.querySelectorAll(".buttons span"); //点击圆圈切换对应图片
    var index = 1; //显示点亮的圆圈
    //点击箭头切换图片
    function clickSwitch(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        if (newLeft < -2750) {
            list.style.left = -550 + "px";
        }
        if (newLeft > -550) {
            list.style.left = -2750 + "px";
        }

    }
    prev.onclick = function () {
        clickSwitch(550);
    }
    next.onclick = function () {
        clickSwitch(-550);
    }

    function play() {
        timer = setInterval(function () {
            next.onclick()
        }, 1500)
    }
    //清除定时器
    function stop() {
        clearInterval(timer);
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();

    function buttonsShow() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className = "on") {
                buttons[i].className = "";
            }
        }
        buttons[index - 1].className = "on";
    }
    prev.onclick = function () {
        index -= 1;
        if (index < 1) {
            index = 5;
        }
        buttonsShow();
        clickSwitch(550);
    }
    next.onclick = function () {
        index += 1;
        if (index > 5) {
            index = 1;
        }
        buttonsShow();
        clickSwitch(-550);
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var clickIndex = parseInt(this.getAttribute("index")); //把index绑定到对象buttons[i]上
            var offset = 550 * (index - clickIndex);
            clickSwitch(offset);
            index = clickIndex;
            buttonsShow();
        }
    }

}