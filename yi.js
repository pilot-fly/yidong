$(function(){
	// hidden
   var lis1=$(".navv");
	for(var i=0;i<lis1.length;i++){
		if(i==0){
			continue;
		}
		hover(lis1[i],function(){			
			this.style.background="#F0F0F0";
			var ul=$(".hidden",this)[0];
			ul.style.display="block";
			
		},function(){
			var ul=$(".hidden",this)[0];
			hover(ul,function(){
				lis1[i].style.background="#F0F0F0";
				this.style.display="block";
			},function(){
				lis1[i].style.background="#E4E4E4";
			    this.style.display="none";
			})
			this.style.background="#E4E4E4";
			ul.style.display="none";
		})
	}

	var daor_box1=$(".daor-box1")[0];
	var daor_box2=$(".daor-box2")[0];
	var daor_hidden1=$(".daor-hidden1")[0];
	var daor_hidden2=$(".daor-hidden2")[0];
	hover(daor_box1,function(){
		daor_hidden1.style.display="block";
	},function(){
		hover(daor_hidden1,function(){
			var daork=$(".daor-hidden1-di-k");
			for(var j=0;j<daork.length;j++){
				hover(daork[j],function(){
					this.style.color="#FFFFFF";
					this.style.background="#2FB4FC";
				},function(){
					this.style.color="#2FB4FC";
					this.style.background="#FFFFFF";
				})
			}
			this.style.display="block";
		},function(){
			this.style.display="none";
		})
		daor_hidden1.style.display="none";
	})

    hover(daor_box2,function(){
		daor_hidden2.style.display="block";
	},function(){
		hover(daor_hidden2,function(){
			this.style.display="block";
		},function(){
			this.style.display="none";
		})
		daor_hidden2.style.display="none";
	})

	var hover_hi=$(".hover-hi");
	for(var j=0;j<hover_hi.length;j++){
		hover(hover_hi[j],function(){
			animate(this,{right:39},500);
		},function(){
			animate(this,{right:-26},500);
		})
	}
// 轮播
	var imgs=$(".banz-pic");
	var banner=$(".banz")[0];
	var lis=$(".ban-circle");
	var width=parseInt(getStyle(banner,"width"));
	var n=0;
	var next=0;
	var t=setInterval(move,2000);
	var right=$(".zright")[0];
	var left=$(".zleft")[0];
	var flag=true;
	function move(){
		if(flag){
			flag=false;
			next=n+1;
			if(next>=imgs.length){
				next=0;
			}
			imgs[next].style.left=width+"px";
			animate(imgs[n],{left:-width},500);
			animate(imgs[next],{left:0},500,function(){flag=true;});
			for(var i=0;i<lis.length;i++){
				lis[i].style.background="#D3D2D0";
			}
			lis[next].style.background="#E72486";
			n=next;
		}
		
	}	
	banner.onmouseover=function(){
		clearInterval(t);
	}
	banner.onmouseout=function(){
		t=setInterval(move,2000);
	}
	left.onclick=function(){
		if(flag){
			flag=false;
			next=n-1;
			if(next<0){
				next=imgs.length-1;
			}
			imgs[next].style.left=-width+"px";
			animate(imgs[n],{left:width},500);
			animate(imgs[next],{left:0},500,function(){flag=true;});
			for(var i=0;i<lis.length;i++){
				lis[i].style.background="#D3D2D0";
			}
			lis[next].style.background="#E72486";
			n=next;
		}
		
	}
	right.onclick=function(){
		move();
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			if(n<this.index){
			   imgs[this.index].style.left=width+"px";
			   animate(imgs[n],{left:-width},500);
			   animate(imgs[this.index],{left:0},500);
			   for(var i=0;i<lis.length;i++){
			   	 lis[i].style.background="#D3D2D0";
			   }
			   this.style.background="#E72486";
			   n=this.index;	
			}else if(n>this.index){
				imgs[this.index].style.left=-width+"px";
				animate(imgs[n],{left:width},500);
				animate(imgs[this.index],{left:0},500);
				for(var i=0;i<lis.length;i++){
			   	 lis[i].style.background="#D3D2D0";
			   }
			   this.style.background="#E72486";
			   n=this.index;
			}
		}
	}
// 节点轮播
	var box=$(".xzlb")[0];
	var left1=$(".xzlbL")[0];
	var right1=$(".xzlbR")[0];
	var picBox=$(".box")[0];
	var t1=setInterval(move1,1500);
	function move1(){
		animate(picBox,{left:-295},800,function(){
			var imgFirst=getFirst(picBox);
			picBox.appendChild(imgFirst);
			picBox.style.left="-20px";

		})

	}
	box.onmouseover=function(){
		clearInterval(t1);
	}
	box.onmouseout=function(){
		t1=setInterval(move1,1500);
	}
	left1.onclick=function(){
		var last=getLast(picBox);
		var First=getFirst(picBox);
		insertBefore(last,First);
		picBox.style.left=-295+"px";
		animate(picBox,{left:-20},800)
	}

	right1.onclick=function(){
		move1();
	}	
})