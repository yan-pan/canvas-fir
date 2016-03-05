window.onload=function(){
	var 
    canvas=document.querySelector('#canvas'),
    ctx=canvas.getContext('2d'),
    canvas2=document.querySelector('#canvas2'),
    ctx2=canvas2.getContext('2d'),
    row=15,
    z=[140.5,460.5],//棋盘星点位子
    qizi={},//所有棋子数据
    flag=localStorage.x?false:true;//标识该谁落子
  var huaqipan=function(){
    ctx.clearRect(0,0,600,600);
    for(var i=0;i<row;i++){
      var r=ctx.createLinearGradient(0,0,560,0)
      r.addColorStop(0,'red');
      r.addColorStop(1,'blue');
      ctx.strokeStyle=r;
      ctx.beginPath();
      ctx.moveTo(20,20.5+40*i);
      ctx.lineTo(580,20.5+40*i);
      ctx.stroke();
          
      var l=ctx.createLinearGradient(0,0,0,560)
      l.addColorStop(0,'orange');
      l.addColorStop(1,'purple');
      ctx.strokeStyle=l;
      ctx.beginPath();
      ctx.moveTo(20.5+40*i,20);
      ctx.lineTo(20.5+40*i,580);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(300.5,300.5,5,0,Math.PI*2);
    ctx.fill();
    for(var i=0;i<z.length;i++){
          for(var j=0;j<z.length;j++){
            ctx.beginPath();
            ctx.arc(z[i],z[j],5,0,Math.PI*2);
            ctx.fill();
          }
    }
  }
  huaqipan();
	
	//落子
	var qiziimg=document.querySelector('#qiziimg');
  var luozi=function(x,y,color){
     var zx=40*x+2.5;
     var zy=40*y+2.5;
       if(color){
           ctx2.drawImage(qiziimg,73,0,75,75,zx,zy,36,36)
       }else{
           ctx2.drawImage(qiziimg,0,0,75,75,zx,zy,36,36)
       }

   }

  canvas2.onclick=function(e){
       var x=Math.round( (e.offsetX-20.5)/40);
       var y=Math.round( (e.offsetY-20.5)/40);

       if(qizi[x+'_'+y]){return}
       luozi(x,y,flag);
       qizi[x+'_'+y]=flag?'black':'white';
         //黑白棋判断
         if(flag){
           if(panduan(x,y,'black')){
               alert('黑棋赢！')
               if(confirm('再来一次！')){
                  ctx2.clearRect(0,0,600,600);
                   localStorage.clear();
                   qizi={};
                   huaqipan();
                   flag=true;
                   return;
               }else{
                   canvas2.onclick=null;
               }
           }

       }else{
           if(panduan(x,y,'white')){
               alert('白棋赢！')
               if(confirm('再来一次！')){
                   localStorage.clear();
                   ctx2.clearRect(0,0,600,600);
                   qizi={};
                   flag=true;
                   return;
               }else{
                   canvas2.onclick=null;
               }
           }
       }
       flag=!flag;
       localStorage.data=JSON.stringify(qizi);//记忆 储存
       if(!flag){
              localStorage.x = 1;
       }else{
             localStorage.removeItem('x')
       }
       
       fanhui.onclick=function(){
         for(var i in qizi){
           var newqizi = {};
           if(i != (x+'_'+y)){
              newqizi[i] = qizi[i]
           }
         }
         qizi = newqizi;
         flag = !flag;
         ctx2.clearRect(x*40+20.5-18,y*40+20.5-18,36,36);
       }
     }

	var xy2id=function(x,y){
      return x+'_'+y;
  }

  //判断函数
  var panduan=function(x,y,color){
    var shuju = filter(color);
    var tx,ty,hang=1;shu=1;zuoxie=1;youxie=1;
    tx=x;ty=y;while(shuju[xy2id(tx-1,ty)]){tx--;hang++};
    tx=x;ty=y;while(shuju[xy2id(tx+1,ty)]){tx++;hang++};
    if(hang>=5){return true};

    tx=x;ty=y;while(shuju[xy2id(tx,ty-1)]){ty--;shu++};
    tx=x;ty=y;while(shuju[xy2id(tx,ty+1)]){ty++;shu++};
    if(shu>=5){return true};

    tx=x;ty=y;while(shuju[xy2id(tx+1,ty-1)]){tx++;ty--;zuoxie++};
    tx=x;ty=y;while(shuju[xy2id(tx-1,ty+1)]){tx--;ty++;zuoxie++};
    if(zuoxie>=5){return true};

    tx=x;ty=y;while(shuju[xy2id(tx+1,ty+1)]){tx++;ty++;youxie++};
    tx=x;ty=y;while(shuju[xy2id(tx-1,ty-1)]){tx--;ty--;youxie++};
    if(youxie>=5){return true};
  }

  var filter=function(color){
     var r=[];
     for(var i in qizi){
         if(qizi[i]==color){
             r[i]=qizi[i];
         }
     }
     return r;
  }


  if(localStorage.data){
      qizi=JSON.parse(localStorage.data);
      for(var i in qizi){
         var x=i.split('_')[0];
         var y=i.split('_')[1];
         luozi(x,y,qizi[i]=='black');
     }
  }


  canvas2.ondblclick=function(e){
    e.stopPropagation();
  }

  shuaxin.onclick=function(){
    localStorage.clear();
    qizi={};
    flag=true;
    ctx2.clearRect(0,0,600,600);
  }
}