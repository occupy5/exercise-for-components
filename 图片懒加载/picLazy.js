//通过data-src加载图片
function setImg(index) {
    var aLi = document.getElementsByName("li");
    if (aLi[index].childNodes.length == 0) {
        if (aLi[index].dataset) {
            var src = aLi[index].dataset.src;
        } else {
            var src = aLi[index].getAttribute('data-src');
        }
        var oImg = document.createElement('img');
        oImg.src = src;
        aLi[index].appendChild(oImg);
    }
}

//获取元素距离页面顶部的距离
function getH(el) {
    var h = 0;
    while (el) {
        h += el.offsetTop;
        el = el.offsetParent;
    }
    return h;
}

//组装
window.onscroll = function () {
    var aLi = document.getElementsByName("li");
    for (var i = 0, l = aLi.length; i < l; i++) {
        var oLi = aLi[i];
        var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
        var h = getH(oLi);
        if (h < t) {
            setTimeout("setImg(" + i + ")", 500);
        }
    }
};
window.onload = function () {
    window.onscroll();
};
//知乎
var lazyImg = [].slice.call(document.querySelectorAll(".lazyImg"));
//判断图片是否进入了可视区域及实现加载
function loadImage(images) {
    let scrollParent, src, el;
    for (let i = 0; i < images.length; i++) {
        scrollParent = images[i].scrollParent; //img所属的最近的可滚动祖先节点
        el = images[i].el;
        //offset为预留的预加载距离
        if (checkInView(el, scrollParent, this.options.offset)) {
            src = el.dataset.src;
            el.setAttribute("src", src);
            images.splice(i--, 1); //将该img元素移除
        }
    }
}
//封装了判断是否在可视区域的函数
const checkInView = (el, scrollParent, offset) => {
    let scrollTop, clientH, clientW, scrollLeft;
    let offsetTop = 0,
        offsetLeft = 0;
    if (scrollParent === window) {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        clientH = document.documentElement.clientHeight || document.body.clientHeight;
        clientW = document.documentElement.clientWidth || document.body.clientWidth;
    } else {
        scrollTop = scrollParent.scrollTop;
        scrollLeft = scrollParent.scrollLeft;
        clientH = scrollParent.clientHeight;
        clientW = scrollParent.clientWidth;
    }
    while (el != scrollParent && el != null) {
        let borderWidth = parseInt(getStyle(el, "border-width"));
        offsetTop += el.offsetTop + borderWidth;
        offsetLeft += el.offsetLeft + borderWidth;
        el = el.offsetParent;
    }
    if (scrollTop + clientH > offsetTop - offset && scrollLeft + clientW > offsetLeft - offset) {
        return true;
    } else return false;

}
//添加监听事件
function initListener(el) {
    let scrollParent = getScrollParent(el);
    if (this.scrollParent.indexOf(scrollParent) < 0) {
        position = getStyle(scrollParent, "position"); //若为window则返回null
        if (position === "" || position === "static") scrollParent.style.position = "relative"; //确保能检测到正确的offsetTop和offsetLeft
    }
    this.scrollParent.push(scrollParent); //数组用于保存已经监听的可滚动祖先节点
    this.eventsList.forEach((event) => {
        scrollParent.addEventListener(event, this.loadImage.bind(this));
    })
}
}