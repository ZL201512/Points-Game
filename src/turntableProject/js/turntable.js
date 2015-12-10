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

var bonusR = canvasWidth * 0.5 * 0.73;
var centerPartR = 3*bonusR/7;
var bottomWidth = centerPartR/8;

var one = canvasWidth * 0.003;

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
drawBlink();
drawTable();
drawBonus(0);
//
drawGoFrame(-65*Math.PI/180);



drawRollBall(0);
function drawRollBall(angle){
    var rollBallR = centerPartR /4.3;
    var inRollBallR = rollBallR/3;
    var Y = centerPartR-rollBallR;
    ctx.beginPath();
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(translateX,translateY);
    ctx.arc(0,Y,rollBallR,0,360,false);
    var radgard = ctx.createLinearGradient(0,Y-rollBallR,0,Y+rollBallR);
    radgard.addColorStop(0,'#FCDC15');
    radgard.addColorStop(0.4,'#FDB707');
    radgard.addColorStop(0.5,'#FBA206');
    radgard.addColorStop(0.6,'#FD910A');
    radgard.addColorStop(0.7,'#FF910B');
    radgard.addColorStop(0.8,'#FB9D07');
    radgard.addColorStop(0.9,'#F5B606');
    radgard.addColorStop(1,'#FFC62D');
    ctx.fillStyle = radgard;
    ctx.shadowOffsetX = 5*one;
    ctx.shadowOffsetY = 5*one;
    ctx.shadowBlur = 10*one;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.fill();
    ctx.closePath();
    //再画一个圆
    ctx.beginPath();
    ctx.arc(0,Y-3*rollBallR/5,inRollBallR,0,360,false);
    var radGard = ctx.createRadialGradient(0,Y-3*rollBallR/5,0,0,Y-3*rollBallR/5,inRollBallR);
    radGard.addColorStop(0,'rgba(255, 255, 255 , 0.3)');
    radGard.addColorStop(1,'rgba(255, 255, 255 , 0)');
    ctx.fillStyle = radGard;
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.fill();
    ctx.restore();
}
function drawGoFrame(openAngle){
    var openWall = 50*Math.PI/180;
    var endAngle = openAngle-openWall;
    var edgeLineWidth = one*2;
    var edgeCOlor = "#C87D3A";

    ctx.beginPath();
    ctx.save();
    ctx.translate(translateX,translateY);
    ctx.lineWidth = bottomWidth;
    ctx.strokeStyle = '#FFE8AC';
    ctx.arc(0,0,centerPartR+bottomWidth/2,openAngle,endAngle,false);
    ctx.stroke();
//    ctx.restore();
    //画立体阴影
    ctx.beginPath();
    ctx.save()
    ctx.rotate(openAngle);
    ctx.moveTo(centerPartR+bottomWidth,0);
    ctx.lineTo(centerPartR,0);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5*one;//5
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.lineWidth = edgeLineWidth;
    ctx.strokeStyle = edgeCOlor;
    ctx.stroke();
    ctx.restore();
    //另一个（开口结束为止）
    ctx.beginPath();
    ctx.rotate(endAngle);
    ctx.moveTo(centerPartR+bottomWidth,0);
    ctx.lineTo(centerPartR,0);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5*one;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.lineWidth = edgeLineWidth;
    ctx.strokeStyle = edgeCOlor;
    ctx.stroke();

    ctx.restore();
}
function drawBonus(angle){

    var textR = canvasWidth * 0.065;
    var wall = 1.9*Math.PI/180;
    for( var i=0; i<6; i++){
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX , translateY);
        //渐变色
        var radgard = getBonusGard(i,bonusR,centerPartR);
        ctx.fillStyle = radgard;
        ctx.lineTo(0,0);
        ctx.arc(0,0,bonusR,angle,angle+60*Math.PI/180-wall,false);//减掉的是中间空白
        ctx.moveTo(0,0);
        ctx.fill();
        ctx.restore();
        angle += 60*Math.PI/180;
    }
    //画字体
    drawBonusText(textR,angle);
    //画中心红色圆盘
    drawCenterPart(angle);
    //画底部边缘
    drawBottomEdge(wall,angle);


}
function drawBottomEdge(wall,angle){

    //画圆底边缘
    for(var i=0; i<6; i++){
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX,translateY);//
        var lineGrad = ctx.createRadialGradient(0,0,centerPartR,0,0,centerPartR+bottomWidth);
        switch (i){
            case 0:
            case 3:
                lineGrad.addColorStop(0,"#29B5D9");//#1FA6BA
                lineGrad.addColorStop(1,"#3A9FAB");//#3A9FAB
                break;
            case 1:
            case 4:
                lineGrad.addColorStop(0,"#FA8E5F");
                lineGrad.addColorStop(1,"#E57946");//
                // lineGrad = "#EF814E";
                break;
            case 2:
            case 5:
                lineGrad.addColorStop(0,"#F3BB66");
                lineGrad.addColorStop(1,"#DBA050");//
                //lineGrad = "#F7BA6A";
                break;
        }
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = bottomWidth;
        ctx.arc(0,0,centerPartR+bottomWidth/2,angle,angle+60*Math.PI/180,false);
        ctx.stroke();
        ctx.restore();
        angle += 60*Math.PI/180;
    }
}
function drawCenterPart(){
    ctx.beginPath();
    ctx.save();
    ctx.translate(translateX , translateY);
    var radgard1 = ctx.createRadialGradient(0,0,0,0,0,bonusR/2);
    radgard1.addColorStop(0,"#F3431A");
    radgard1.addColorStop(0.76,"#F3431A");
    radgard1.addColorStop(0.85,"#E4491D");//
    radgard1.addColorStop(1,"#C84E1F");//#E4491D
    ctx.fillStyle = radgard1;

    ctx.arc(0,0,centerPartR,0,360,false);
    ctx.fill();
    ctx.restore();
}

function drawBonusText(textR,angle){
    var textAngle = angle;
    var Y = (bonusR+centerPartR)/2;
    //画字体背景圈
    for(var i=0 ; i<6;i++){
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX , translateY);
        var radgard = ctx.createRadialGradient(0,3*bonusR/4,0,0,3*bonusR/4,textR);
        switch (i){
            case 0:
            case 3:
                radgard.addColorStop(0,'rgba(251, 115, 57,0.7)');//红
                radgard.addColorStop(1,'rgba(247, 109, 44,0.7)');
                break;
            case 1:
            case 4:
                radgard.addColorStop(0,'rgba(46, 164, 178,0.7)');//蓝
                radgard.addColorStop(1,'rgba(22, 145, 179,0.7)');
                break;
            case 2:
            case 5:
                radgard.addColorStop(0,'rgba(249, 167, 81,0.7)');//黄
                radgard.addColorStop(1,'rgba(247, 156, 65,0.7)');
                break;
        }
        ctx.fillStyle = radgard;
        ctx.rotate(angle);
        ctx.arc(0,Y,textR,0,360,false);
        ctx.fill();
        ctx.restore();
        angle -= 60*Math.PI/180;
    }
    //画字
    angle = textAngle;
    var text;
    var textX,textY;
    for( var i=0 ;i<6 ;i++){
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX,translateY);
        ctx.rotate(angle);
        ctx.font = 'normal 1em myfont';
        ctx.fillStyle = 'white';
        //
        ctx.save();
        ctx.translate(0,Y);
        ctx.rotate(180*Math.PI/180);
        switch (i){
            case 0:
                textX = -2.4*textR/3; textY = textR/4;
                text="10倍";
                break;//
            case 1:
                textX = -1.7*textR/3; textY = textR/6;
                text="1倍";
                break;//
            case 2:
                ctx.font = 'normal 0.92em myfont';//字体小点
                textX = -2.2*textR/3; textY = textR/2;//参与
                ctx.fillText("谢谢",-1.9*textR/3,-1*textR/6);
                text="参与!";
                break;//
            case 3:
                ctx.font = 'normal 1.6em myfont';//字粗点
                textX = -1*textR/3; textY = textR/3;
                text="？";
                break;//
            case 4:
                textX = -1.7*textR/3; textY = textR/6;
                text="2倍";
                break;//
            case 5:
                ctx.font = 'normal 0.92em myfont';//字体小点
                textX = -2.2*textR/3; textY = textR/2;//参与
                ctx.fillText("谢谢",-1.9*textR/3,-1*textR/6);
                text="参与!";
                break;//
        }
        ctx.fillText(text,textX,textY);
        ctx.restore();
        //
        ctx.restore();
        angle -= 60*Math.PI/180;
    }
    //end画字

}







function drawTable(){
    var tableR = canvasWidth * 0.5 * 0.76;
    /**
     * 换成图片时，
     * 1.图片的长宽是tableR的两倍（即直径）；
     * 2.X、Y都要减去tableR；
     * 3.ctx.drawImage(Image,-tableR,-tableR,2*tableR,2*tableR);
     */
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "#EDE9B3";
    ctx.translate( translateX, translateY );
    ctx.arc(0,0,tableR,0,360,false);
    ctx.fill();
    ctx.restore();

}




function drawBlink(){
    /*
    * 换成图片时，
    *   1.图片的长宽是blinkBallR的两倍（即直径）；
    *   2.X、Y都要减去blinkBallR的长度。
    *   ctx.drawImage(Image,0-blinkBallR,blinkR-blinkBallR,2*blinkBallR,2*blinkBallR);
    * */
    var blinkR = canvasWidth * 0.5 * 0.815;
    var blinkBallR = canvasWidth * 0.014;
    var blinkBallCount = 40;
    var blinkAngle = ((360/blinkBallCount)*Math.PI)/180;
    var angleSum = 0;
    for(var i=0 ; i<blinkBallCount ; i++){
        ctx.beginPath();
        ctx.save();
        ctx.translate(translateX,translateY);
        ctx.rotate(angleSum);
        //先清除（上次画的颜色会残留）
        ctx.clearRect(0-blinkBallR-5*one,blinkR-blinkBallR-5*one,2*blinkBallR+10*one,2*blinkBallR+10*one);
        //径向渐变
        var radgard = ctx.createRadialGradient(-1*blinkBallR/3,(blinkR-1*blinkBallR/3),0,0,blinkR,blinkBallR) ;
        if( blinkFlag ){
            if( i%2){

                radgard.addColorStop(0,'#E5DC41');//颜色最深
                radgard.addColorStop(0.7,'#EFEE58');//中间色
                radgard.addColorStop(1,'#F0F893');//最浅
            }else{
                radgard.addColorStop(0,'#E58457');
                radgard.addColorStop(0.7,'#FF9E7D');
                radgard.addColorStop(1,'#FFC9AA');
            }
        }else{
            if( i%2){
                radgard.addColorStop(0,'#E58457');
                radgard.addColorStop(0.7,'#FF9E7D');
                radgard.addColorStop(1,'#FFC9AA');
            }else{
                radgard.addColorStop(0,'#E5DC41');//颜色最深
                radgard.addColorStop(0.7,'#EFEE58');//中间色
                radgard.addColorStop(1,'#F0F893');//最浅
            }
        }
        ctx.shadowOffsetX = 2*one;//水平偏移
        ctx.shadowOffsetY = 2*one;//垂直偏移
        ctx.shadowBlur = one;//阴影羽化程度
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.fillStyle = radgard;
        ctx.arc(0,blinkR,blinkBallR,0,360,false); //(x,y,radius,startAngle, endAngle,bAntiClockwise)
        ctx.fill();
        ctx.restore();
        angleSum+=blinkAngle;
    }
}










function getBonusGard(i){
    var radgard = ctx.createRadialGradient(0,0,centerPartR,0,0,bonusR);
    switch (i){
        case 0:
        case 3://蓝
            radgard.addColorStop(0,"#3A9FAB");//内#1DA8BF
//            radgard.addColorStop(0.15,"#33C4D7");//
            radgard.addColorStop(0.5,"#5FD4E5");
            radgard.addColorStop(0.85,"#33C4D7");
            radgard.addColorStop(1,"#21C0DE");//外
            break;
        case 1:
        case 4://红
            radgard.addColorStop(0,"#E57946");//#EE864F
//            radgard.addColorStop(0.15,"#FB9E72");
            radgard.addColorStop(0.5,"#FCAD8C");
            radgard.addColorStop(0.85,"#FA996C");
            radgard.addColorStop(1,"#FC8E59");
            break;
        case 2:
        case 5:
            radgard.addColorStop(0,"#DBA050");//#F3C47C
//            radgard.addColorStop(0.15,"#F6C985");
            radgard.addColorStop(0.5,"#FBD49B");
            radgard.addColorStop(0.85,"#F9BF6B");
            radgard.addColorStop(1,"#FFC078");
            break;
    }
    return radgard;
}


