var phoneWidth = parseInt($("phone").getFinalStyle("width"));
var phoneHeight = parseInt($("phone").getFinalStyle("height"));
var canvasWidth =  phoneWidth;
var canvasHeight = phoneWidth;
$("canvas").width = canvasWidth;
$("canvas").height = canvasHeight;
/**
 *
 */
var ctx = $("canvas").getContext("2d");
var translateX = canvasWidth/2;
var translateY = canvasHeight/2;
//
//圆心
ctx.beginPath();
ctx.save();
ctx.translate(translateX,translateY);
ctx.fillStyle = 'black';
ctx.arc(0,0,1,0,360,false); //(x,y,radius,startAngle, endAngle,bAntiClockwise)
ctx.fill();
ctx.restore();
//
var blinkFlag = true;// 闪亮标帜
window.setInterval(function(){
    drawBlink();
    blinkFlag = !blinkFlag;
},500);
//
function drawBlink(){
    /*
    * 换成图片时，
    *   1.图片的长宽是blinkBallR的值；
    *   2.X、Y都要减去blinkBallR的长度。
    *   ctx.drawImage(Image,0-blinkBallR,blinkR-blinkBallR,blinkBallR,blinkBallR);
    * */
    var blinkR = canvasWidth * 0.5 * 0.8;
    var blinkBallR = canvasWidth * 0.011;
    var blinkBallCount = 30;
    var blinkAngle = ((360/blinkBallCount)*Math.PI)/180;
    var blinkBallColor ;
    var angleSum = 0;
    for(var i=0 ; i<blinkBallCount ; i++){
        if( blinkFlag ){
            if( i%2){
                blinkBallColor = 'rgb(236, 233, 60)';
            }else{
                blinkBallColor = 'rgb(255, 192, 157)';
            }
        }else{
            if( i%2){
                blinkBallColor = 'rgb(255, 192, 157)';
            }else{
                blinkBallColor = 'rgb(236, 233, 60)';
            }
        }
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX,translateY);
        ctx.rotate(angleSum);
        ctx.fillStyle = blinkBallColor;
        ctx.arc(0,blinkR,blinkBallR,0,360,false); //(x,y,radius,startAngle, endAngle,bAntiClockwise)
        ctx.fill();
        ctx.restore();
        angleSum+=blinkAngle;
    }
}












