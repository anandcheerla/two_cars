
//rock function for creating rock objects
// attributes: x and y for coordinates
// img for name of the image
// id for uniqueness
// lane,which lane it belongs
// ele to store the jquery element that will be appended to the board

function rock(x,y,img,id,class_name,lane){
	this.x=x;
	this.y=y;
	this.img=img;
	this.id=id;
	this.class_name=class_name;
	this.lane=lane;
	this.ele=null;
}


//setUp method will create img element and append to the board and make the element position absolute so that the rock animates relative the nearest positioned
// ancestor,so that rock will always come from top

rock.prototype.setUp=function(left_gap){
	this.ele=$("<img src="+this.img+" id="+this.id+" class="+this.class_name+" height=60 width=123>");
	$(this.lane).append(this.ele);
	this.ele.css({position:"absolute",left:left_gap+"px"});
	
};

//move method is to animate the rock element from the top till bottom and removes the element after reaching bottom
rock.prototype.move=function(speed){
	//removing the rock after animation
	this.ele.animate({top:"550px"},speed,"linear",function(){this.remove();});
};




//--------------------------------------------------------------------------------------------


//car function for creating car objects and the attributes are same as rock objects
function car(x,y,img,id,lane){
	this.x=x;
	this.y=y;
	this.img=img;
	this.id=id;
	this.lane=lane;
	this.ele=null;
}


car.prototype.setUp=function(){
	this.ele=$("<img src="+this.img+" id="+this.id+" class='car' height=100 width=123>");
	$(this.lane).append(this.ele);
	//position set as relative so that car will move
	this.ele.css({position:"relative"});
	this.ele.css({top:"400px"});


	
};


//initialised two cars
const car1=new car(0,0,"./images/car3.svg","car1","#lane1");
car1.setUp();

const car2=new car(0,0,"./images/car3.svg","car2","#lane3");
car2.setUp();


//---------------------------------------------------------------------------------------------------------


//rock movement for different lanes
var speed=2000;
var speed_counter=speed;
var maxspeed=600;
var iter=20;

//rock creation on lane one and animate the rock
let lane1rock=function(){
		var rock1=new rock(0,0,"./images/rock_1.png","rock1","rocks1and2","#lane1");
		rock1.setUp(1);
		rock1.move(speed_counter);
		// console.log($("#rock1").position().left);
		speed_counter-=iter;
		if(speed_counter<maxspeed)
			speed_counter=speed;
};

//rock creation on lane two and animate the rock
let lane2rock=function(){
		var rock2=new rock(0,0,"./images/rock_2.svg","rock2","rocks1and2","#lane2");
		rock2.setUp(126);
		rock2.move(speed_counter);
		// console.log($("#rock2").position().left);
		speed_counter-=iter;
		if(speed_counter<maxspeed)
			speed_counter=speed;
};

//rock creation on lane three and animate the rock
let lane3rock=function(){
		var rock3=new rock(0,0,"./images/rock_3.png","rock3","rocks3and4","#lane3");
		rock3.setUp(1);
		rock3.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed)
			speed_counter=speed;

};

//rock creation on lane four and animate the rock
let lane4rock=function(){
		var rock4=new rock(0,0,"./images/rock_4.png","rock4","rocks3and4","#lane4");
		rock4.setUp(126);
		rock4.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed)
			speed_counter=speed;

};



//--------------------------------------------------------------------------------------------------------

//interval logic so that two rocks come beside each other,
var gap=1200;
var movement=1;

var interval=function(){
	lane1rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
	if(movement)
		setTimeout(interval2,temp);
	
}
interval();


function interval2(){
	lane2rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
	setTimeout(interval,temp);
}




var interval3=function(){
	lane3rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
	if(movement)
		setTimeout(interval4,temp);
}
interval3();


function interval4(){
	lane4rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
	setTimeout(interval3,temp);
}



//---------------------------------------------------------------------------------------------------------

function hits(){

	let car=$("#car1");

	if(!movement){
				$(".rocks1and2").stop();
				$(".rocks3and4").stop();
	}

	$(".rocks1and2").each(function(){
				let rock=$(this);

				rock_left=rock.position().left;
				rock_top=rock.position().top;
				
				car_left=car.position().left;
				car_top=car.position().top;

				if(((rock_top+60>=car_top && rock_top<=car_top)||(car_top+100>=rock_top && car_top+100<=rock_top+60)) && (rock_left<=car_left && car_left<=rock_left+123)){
					
					console.log(rock.context.id+" "+car.context.id+" "+rock_left+" "+rock_top+" "+car_left+" "+car_top);
					console.log("akc");
					car.attr("src","./images/car_smashed_1.png");
					//rock.attr("src","./images/brown-and-grey-rocks-clipart-6 (1).svg");
					movement=0;
					$(".rocks1and2").stop();
					$(".rocks3and4").stop();

					
				}
		
	});
	
	
	setTimeout(hits,100);	
	
}



function hits2(){
	let car=$("#car2");

	if(!movement){
			$(".rocks1and2").stop();
			$(".rocks3and4").stop();
	}
	$(".rocks3and4").each(function(){
				let rock=$(this);
				
				rock_left=rock.position().left;
				rock_top=rock.position().top;
				
				car_left=car.position().left;
				car_top=car.position().top;
				if(((rock_top+60>=car_top && rock_top<=car_top)||(car_top+100>=rock_top && car_top+100<=rock_top+60)) && (rock_left<=car_left && car_left<=rock_left+123)){
					
					console.log(rock.context.id+" "+car.context.id+" "+rock_left+" "+rock_top+" "+car_left+" "+car_top);
					console.log("akc");
					car.attr("src","./images/car_smashed_1.png");
					//rock.attr("src","./images/brown-and-grey-rocks-clipart-6 (1).svg");
					movement=0;
					$(".rocks1and2").stop();
					$(".rocks3and4").stop();
					
				}
		
	});
	
	
	setTimeout(hits2,100);	
	
}
hits();
hits2();



//---------------------------------------------------------------------------------------------------------

//key event listening so that cars move in a toggle fashion
let flag=0,flag2=0;	

$(document).on("keydown",function(key){
	
	if(key.which === 37){ 
			key.preventDefault();
			if(flag==0){
				$('#car1').animate({left:"+=125px"},200,"swing");
				
				flag=1;
			}
			else{
				$('#car1').animate({left:"-=125px"},200,"swing");
				
				flag=0;
			}		
	}
	else if(key.which === 39){ 
			key.preventDefault();
			if(flag2==0){
				$('#car2').animate({left:"+=125px"},200,"swing");
				
				flag2=1;
			}
			else{
				$('#car2').animate({left:"-=125px"},200,"swing");
				
				flag2=0;
			}		
	}
	
} );
