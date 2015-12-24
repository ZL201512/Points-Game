//
HTMLElement.prototype.getFinalStyle = function(css){
    if(window.getComputedStyle){
        return getComputedStyle(this,"")[css];//第二个参数是伪类
    }else if(Object.currentStyle){//兼容IE
        return this.currentStyle[css];
    }
}
//
/*
function $(id){
    return document.getElementById(id);
}*/
