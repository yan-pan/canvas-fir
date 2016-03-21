window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
    var ROW=15;
    var z=[140.5,460.5];
    var qizi={};
    //var kaiguan=true;//该谁落子
    kaiguan=localStorage.x?false:true;
    //划线
    
    var huaqipan = function() {
    ctx.clearRect(0,0,600,600);
    ctx.fillStyle='rgba(179,198,121,0.7)';
    ctx.fillRect(0,0,600,600);
    for(var i = 0; i < ROW; i++){
      var li = ctx.createLinearGradient(0,0,560,0);
      li.addColorStop(0.5,'#000');
      li.addColorStop(1,'black');
      ctx.strokeStyle = li;
      ctx.beginPath();
      ctx.moveTo(20,i*40 + 20.5);
      ctx.lineTo(580,i*40 + 20.5);
      ctx.stroke();
      
      var li = ctx.createLinearGradient(0,0,0,560);
      li.addColorStop(0.5,'#333');
      li.addColorStop(1,'#444');
      ctx.strokeStyle = li;
      ctx.beginPath();
      ctx.moveTo(i*40+20.5,20);
      ctx.lineTo(i*40+20.5,580);
      ctx.stroke();
    }
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(300.5,300.5,5,0,Math.PI*2);
    ctx.fill();
    for(var i = 0; i < z.length; i++){
      for(var j = 0; j < z.length; j++){
        ctx.beginPath();
        ctx.arc(z[i],z[j],5,0,Math.PI*2);
        ctx.fill(); 
      }
    }
  }
  huaqipan();

/*x  number  落子x的坐标
y  number  落子y的坐标
color  boolean  true代表黑子 false代表白子*/
var luozi=function(x,y,color){
    var zx=40*x+20.5;
    var zy=40*y+20.5;
    var black=ctx.createLinearGradient(zx,zy,1,zx,zy,18);
    black.addColorStop(0.1,'#000');
    black.addColorStop(1,'#ccc');
    
    var white=ctx.createLinearGradient(zx,zy,1,zx,zy,18);
    white.addColorStop(0.1,'#fff');
    white.addColorStop(1,'#f65c5c');

    ctx.fillStyle=color?black:white;
    ctx.beginPath();
    ctx.arc(zx,zy,14,0,Math.PI*2);
    ctx.fill(); 
}
//落子
var qiziimg=document.querySelector("#sucai");
var luozi2=function(x,y,color){
    var zx=40*x+4.5;
    var zy=40*y+4.5;
    
    if(color){
        ctx.drawImage(qiziimg,0,0,75,75,zx,zy,36,36);
    }else{
        ctx.drawImage(qiziimg,85,0,75,75,zx,zy,36,36);
    }
}
/*luozi(3,3,true);
luozi(4,3,false);
luozi(7,7,true);*/


canvas.onclick=function(e){
    var zx=40*x+20.5;
    var zy=40*y+20.5;
    var x=Math.round((e.offsetX-20.5)/40);
    var y=Math.round((e.offsetY-20.5)/40);


    if(qizi[x+'_'+y]){return;}
    luozi(x,y,kaiguan);
    qizi[x+'_'+y]=kaiguan?'black':'white';
    if(kaiguan){
        if(panduan(x,y,"black")){
          alert("黑棋赢");
          if(confirm('是否再来一局')){
           localStorage.clear();
           qizi={};
           huaqipan();
           kaiguan=true;
           return;
       }else{
        canvas.onclick=null;
    }
}
}else{
    if(panduan(x,y,"white")){
      alert("白棋赢");
      if(confirm('是否再来一局')){
       localStorage.clear();
       qizi={};
       huaqipan();
       kaiguan=true;
       return;
   }else{
    canvas.onclick=null;
}
}
}
kaiguan=!kaiguan;
localStorage.data=JSON.stringify(qizi);
if(!kaiguan){
    localStorage.x='a';
}else{
    localStorage.removeItem('x');
}

/*huiqi.onclick=function(){
         for(var i in qizi){
           var newqizi = {};
           if(i != (x+'_'+y)){
              newqizi[i] = qizi[i];
           }
         }
         qizi = newqizi;
         kaiguan = !kaiguan;
         ctx.clearRect(x*40+20.5-18,y*40+20.5-18,36,36);
       }*/
}



var xy2id=function(x,y){
    return x+'_'+y;
}
var panduan = function(x,y,color) {
    var shuju = filter(color);
    var tx,ty,hang = 1;shu = 1; zuoxie= 1;youxie = 1;
    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty ) ]){tx--;hang++};
    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty ) ]){tx++;hang++};
    if(hang >= 5){return true};
    tx=x;ty=y;while( shuju[ xy2id( tx,ty-1 ) ]){ty--;shu++};
    tx=x;ty=y;while( shuju[ xy2id( tx,ty+1 ) ]){ty++;shu++};
    if(shu >= 5){return true};
    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty-1 ) ]){tx++;ty--;zuoxie++};
    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty+1 ) ]){tx--;ty++;zuoxie++};
    if(zuoxie >= 5){return true};
    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty-1 ) ]){tx--;ty--;youxie++};
    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty+1 ) ]){tx++;ty++;youxie++};
    if(youxie >= 5){return true};
  }
var filter=function(color){
    var r={};
    for(var i in qizi){
        if(qizi[i]==color){
            r[i]=qizi[i];
        }
    }
    return r;
}
/*如果本地存储中有棋盘数据，读取这些数据并绘制页面中*/
if(localStorage.data){
    qizi=JSON.parse(localStorage.data);
    for(var i in qizi){
        var x=i.split('_')[0];
        var y=i.split('_')[1];
        luozi(x,y,(qizi[i]=='black')?true:false);
    }

}
canvas.ondblclick=function(e){
    e.stopPropagation();
}
chongzhi.onclick=function(){
    localStorage.clear();
    location.reload();
}

    /*var lingrad=ctx.createLinearGradient(20,300,580,300);
    lingrad.addColorStop(0,'red');
    lingrad.addColorStop(0.2,'orange');
    lingrad.addColorStop(0.4,'yellow');
    lingrad.addColorStop(0.6,'green'); 
    lingrad.addColorStop(0.7,'blue');
    lingrad.addColorStop(1,'purple');
    ctx.lineWidth=6;
    ctx.lineCap='roud';
    ctx.strokeStyle=lingrad;
    ctx.fillStyle=lingrad;

    ctx.beginPath();
    ctx.moveTo(20,300);
    ctx.lineTo(580,300);
    ctx.stroke();*/
    /*ctx.fillRect(20,20,560,560);*/
    

}