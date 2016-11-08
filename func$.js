function $(val,obj){
	if(typeof val=="string"){
		var obj=obj||document;
		val=val.replace(/^\s*|\s*$/g,"");
		if(val.charAt(0)=="."){ 
			return getClass(val.slice(1),obj)
		}else if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}/.test(val)){
			return obj.getElementsByTagName(val);
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>/.test(val)){
			return document.createElement(val.slice(1,-1));
        }
	}else if(typeof val=="function"){
		window.onload=function(){
			val();
		}
	}
}

function getStyle(obj,val){
	if(obj.currentStyle){
		return obj.currentStyle[val];
	}else{
		return getComputedStyle(obj,null)[val];
	}
}


//获取某个标签类名的兼容性
function getClass(classname,obj){//输入类名与所在的相应的文档
	var obj=obj||document;//将输入的文档初始化；
	if(obj.getElementsByClassName){//如果文档obj里含有该类名
		return obj.getElementsByClassName(classname);// 将文档的类名返回出去
	}else{// 如果不能识别该类名
		var arr=[];
		var objs=obj.getElementsByTagName("*");// 选择document里的所有的标签
		for(var i=0;i<objs.length;i++){//将该标签遍历一下
			var dom=checkClass(classname,objs[i]);
			if(dom==true){//选出与所需标签类名相同的标签
				arr.push(objs[i]);// 将所需的标签放入一数组里
			}
		} 
       return arr;
	}
}
function checkClass(classname,obj){
	var value=obj.className;//将obj里的所有类名赋值给value
	var brr=value.split(" ");//将字符串转化为数组
	for(var j=0;j<brr.length;j++){
		if(brr[j]==classname){//判断该数组里的某个值是不是所需的类名
			return true;
		}
	}
	return false;
}

function addEvent(obj,event,fun){
	if(obj.attachEvent){//判断是否有这个属性
		obj.attachEvent("on"+event,fun);//有，则执行
	}else{
		obj.addEventListener(event,fun,false);
	}
}
function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent("on"+event,fun);
	}else{
		obj.removeEventListener(event,fun,false);
	}
}

function mouseWheel(obj,up,down){
	this.obj=obj;
    if(obj.attachEvent){
         obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
         obj.addEventListener("mousewheel",scrollFn,false);
         obj.addEventListener("DOMMouseScroll",scrollFn,false);
     }

     function scrollFn(e){
		var e=e||window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			up.call(obj);//改变this指针，把window变为obj
			// console.log(obj);
			// up();
			// console.log(this);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}	
	
	
}


//获取内容
function operateText(obj,val){
    if(val==undefined){
        if(obj.innerText){
           return obj.innerText;
        }else{
           return obj.textContect;
        }
    }else{
        if(obj.innerText){
           return obj.innerText=val;
        }else{
           return obj.textContect=val;
        }
    }
}


// 获得子节点
// window.onload=function(){}
function getChilds(obj,type){
    //获取对象obj;
    var type=type||"no";
    //参数初始化
     // console.log(obj)
    var kids=obj.childNodes;
    // console.log(kids)
    //获取该对象的所有子节点
    var arr=[];
    for(var i=0;i<kids.length;i++){
        //遍历该对象所有的子节点
       if(type=='no'){
        //判断如果不需要文本节点
            if(kids[i].nodeType==1){
                //判断如果是元素节点
                arr.push(kids[i]);
                // 将该节点放入arr这个数组里
            }
       }else if(type=='yes'){
        //如果需要文本节点的化
            if(kids[i].nodeType==1||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
                arr.push(kids[i]);
                // 如果是否是元素节点或者是文本节点并且不能为空
                
            }
       } 
    }
    return arr;
}

//拿到第一个
	function getFirst(obj,type){
		var type=type||"no";
		return getChilds(obj,type)[0];
	}
	//拿到最后一个
	function getLast(obj,type){
		var type=type||"no";
		var childs=getChilds(obj,type);
		return childs[childs.length-1];
	}
	//拿到第N个
	function getNub(obj,n,type){
		var type=type||"no";
		var childs=getChilds(obj,type);
		if(n>childs.length||n<1){
			return false;
		}
		return childs[n-1];
	}
	//取兄弟节点
	//obj.nextSibling
	// obj.previousSibling
	 function getNext(obj,type){
	 	var type=type||"no";
	 	var next=obj.nextSibling;
	 	if(next===null){
	 		return false;
	 	}
	 	if(type=="no"){
	       while(next.nodeType==3||next.nodeType==8){
	           next=next.nextSibling;
	           if(next==null){
	           	return false;
	           }
	       }
	       return next;
	 	}else if(type=="yes"){
	 		while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
	           next=next.nextSibling;
	           if(next==null){
	           	return false;
	           }
	       }
	       return next;
	 	}
	 }


	 function getLaster(obj,type){
	 	var type=type||"no";
	 	var laster=obj.previousSibling;
	 	if(laster===null){
	 		return false;
	 	}
	 	if(type=="no"){
	       while(laster.nodeType==3||next.nodeType==8){
	           laster=laster.previousSibling;
	           if(laster==null){
	           	return false;
	           }
	       }
	       return laster;
	 	}else if(type=="yes"){
	 		while(laster.nodeType==3&&!laster.nodeValue.replace(/^\s*|\s*$/g,"")||laster.nodeType==8){
	           laster=laster.previousSibling;
	           if(laster==null){
	           	return false;
	           }
	       }
	       return laster;
	 	}

    }

	


	 function insertBefore(obj,beforeObj){
         var dad=beforeObj.parentNode;
         dad.insertBefore(obj,beforeObj);

	 }

	 function insertAfter(obj,afterObj){
         var dad=afterObj.parentNode;
         var next=getNext(afterObj,"yes");
         if(!next){
         	dad.appendChild(obj);
         }
         else{
         	dad.insertBefore(obj,next);
         }
	 }


 //设置cookie
	function setCookie(attr,value,time){
	  if(time==undefined){
	      document.cookie=attr+"="+value;
	  }else{
	      var now=new Date();
	      now.setTime(now.getTime()+time*1000);
	      document.cookie=attr+"="+value+";expires="+now.toGMTString();
	  }
	}

//获取cookie
	function getCookie(val){
	   var str=document.cookie;
       var arr=str.split("; ");
       for(var i=0;i<arr.length;i++){
       	var arrValue=arr[i].split("=");
       	if(val==arrValue[0]){
       		return arrValue[1];
       	}
       }
	}
	
//删除cookie
   function delCookie(attr){
     var now=new Date();
     now.setTime(time.getTime()-1);
     document.cookie=attr+"=akdk;expires="+now.toGMTString();
   }
 