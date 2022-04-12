let mapArray,ctx,currentImgMain;
let imgMountain,imgMain,imgEnemy;

//mapArray 決定地圖中每個格子的元素
//ctx html canvas5用
//currentImgMainX,currentImgMainY 決定主角座標所在
//imgMountain,imgMain,imgEnemy 障礙物 主角 敵人圖片物件

const gridLength=200; //一格的大小
//網頁初始化

$(function(){
    mapArray=[ //0 可走 1 障礙 2 終點 3 敵人
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ];

    ctx=$("#myCanvas")[0].getContext("2d");

    imgMain=new Image();
    imgMain.src="images/spriteSheet.png";

    currentImgMain={ //初始位置
        "x":0,
        "y":0
    };

    imgMain.onload=function(){ //主畫面載好後
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";

    imgMountain.onload = function()
    {
      imgEnemy.onload = function()
    {
      for(var x in mapArray)
      {
        for(var y in mapArray[x])
        {
         if(mapArray[x][y]==1)
         {
            ctx.drawImage(imgMountain, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
         }else if(mapArray[x][y]==3)
         {
            ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
         }
        }
      }
    }
    }
});

// 要注意縮排，否則跑不出來

$(document).on("keydown",function(event){

    let targetImg,targetBlock,cutImagePositionX; //目標座標 目標格子 面朝格子
    targetImg={
        "x":-1,
        "y":-1
    };

    event.preventDefault(); //避免鍵盤預設行為發生，如 捲動... 

    //推算目標格子

    switch(event.code){
        case "ArrowLeft":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=175; //臉朝左
            break;
        case "ArrowUp":
            targetImg.x=currentImgMain.x
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePositionX=355; //臉朝上
            break;
        case "ArrowRight":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=540; //臉朝右
            break;
        case "ArrowDown":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePositionX=0; //臉朝下
            break;
        default: //其他按鍵
            return;
    }

    //確認目標位置不會超過地圖
    if(targetImg.x<=400 && targetImg.x>=0 && targetImg.y<=400 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength); // 清除主角目前所在的圖

    if(targetBlock.x!=-1&&targetBlock.y!=-1){

        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點"); 
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈囉"); 
                break;

        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});