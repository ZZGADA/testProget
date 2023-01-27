window.addEventListener("load",function(){
    function animation(obj,target,callback){
        clearInterval(obj.timer);//解决多次点击按钮 定时器重复启动的问题
        obj.timer=setInterval(function(){  //给obj 添加一个属性 谁调用谁就自身加一个属性
            if(obj.offsetLeft==target){  //offset 没有单位
                //console.log(obj.attributes);
                clearInterval(obj.timer);
                // if(callback){
                //     callback();   //回调函数  函数结束后执行 
                // }
                callback&&callback();  //简单写法
                ImgIntervalChange();  //！！！非常的关键 因为在每一次animation 动画执行 我们都需要删除imgIntervalChange的动画所以原先
                //轮播图的函数只会在最开始调用一次 所以在每一次animation动画结束后 我们都需要重新开始轮播函数
             }
             //console.log(div.offsetRight);  //没有offsetRight
             var step=(target-obj.offsetLeft)/20;//正的往大的取整 负数往小的取整
             step=step>0?Math.ceil(step):Math.floor(step);
             //console.log(obj.offsetLeft/target);
             obj.style.opacity=obj.offsetLeft/target;  //颜色渐变 
             obj.style.left=obj.offsetLeft+step+"px";
             
        },15)
    }
    var focus=this.document.querySelector(".focus");
    var imgFrame=this.document.querySelector(".focus").querySelector("ul");  //获取图片的框架
    var direction=this.document.querySelector(".focus").querySelectorAll("a");//方向按键
    var ol=this.document.querySelector("ol");
    var circle=ol.children;
    var img=this.document.querySelector(".focus").querySelectorAll("img");//获取图片
    focus.addEventListener("mouseenter",function(){  //将箭头的显隐效果绑定在父盒子上 focus 绑在imgFrane上有点问题
        direction[0].style.display="block";
        direction[1].style.display="block";
        //console.log(1);
        clearInterval(imgFrame.timer);  //鼠标经过 停止图片轮播
    });
    focus.addEventListener("mouseleave",function(){
        direction[0].style.display="none";
        direction[1].style.display="none";
        ImgIntervalChange();  //鼠标移开图片开始轮播
    });
    for(var i=0;i<imgFrame.childElementCount;i++){   //也可以是imgFrame.children.length
        var li=this.document.createElement("li");
        li.setAttribute("index",i);
        ol.appendChild(li);
        li.addEventListener("click",function(){
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className="";
            }
            var focusWidth=img[0].offsetWidth;
            var index=this.getAttribute("index");//获取索引号
            //console.log(focusWidth);
            animation(imgFrame,-index*focusWidth);
            this.className="current";
        })
    }
    circle[0].className="current"; 
    //console.log(imgFrame.offsetLeft);//ul框架的offset为0  (父亲的盒子有定位)
    function TurnInside(index){
        console.log(changeFlag);
        console.log("确定一次啊"+index);
        var target=index*img[0].offsetWidth;
        console.log(target);
        circle[index].className="current";
        animation(imgFrame,-target,function(){
            changeFlag=true;
        });
    }
    function turn(obj,flag){
        if(flag){
            obj.addEventListener("click",function(){
                var index=Math.ceil(Math.abs(imgFrame.offsetLeft)/400); //获取当前图片的索引
                if(changeFlag){
                    changeFlag=false;
                    circle[index++].className="";
                    index=index%6;
                    TurnInside(index);
                }
            });
        }
        else{
            obj.addEventListener("click",function(){
                var index=Math.ceil(Math.abs(imgFrame.offsetLeft)/400); //获取当前图片的索引
                if(changeFlag){
                    changeFlag=false;
                    circle[index].className="";
                    if(--index<0){
                        index=5;
                    }
                    TurnInside(index);
                }
            
        });
        }

    }
    var changeFlag=true;  //设置节流阀 防止切换按键重复点击 导致图片快速切换 与回调函数一同使用
    turn(direction[0],0);
    turn(direction[1],1);
    function ImgIntervalChange(){   //轮播图定时切换
        var index=Math.ceil(Math.abs(imgFrame.offsetLeft)/400); //获取当前图片的索引
        imgFrame.timer=setInterval(function(){
            circle[index++].className="";
            index=index%6;
            TurnInside(index);
        },4000);
    }
    ImgIntervalChange();
});