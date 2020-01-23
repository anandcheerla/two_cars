
//rock function for creating rock objects
// attributes: x and y for coordinates
// img for name of the image
// id for uniqueness
// lane,which lane it belongs
// ele to store the jquery element that will be appended to the board

function rock(x,y,img,id,lane){
	this.x=x;
	this.y=y;
	this.img=img;
	this.id=id;
	this.lane=lane;
	this.ele=null;
}


//setUp method will create img element and append to the board and make the element position absolute so that the rock animates relative the nearest positioned
// ancestor,so that rock will always come from top

rock.prototype.setUp=function(left_gap){
	this.ele=$("<img src="+this.img+" id="+this.id+" height=60 width=120>");
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
	this.ele=$("<img src="+this.img+" id="+this.id+" height=100 width=120>");
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

//rock creation on lane one and animate the rock
let lane1rock=function(){
		var rock1=new rock(0,0,"./images/rock_1.png","rock1","#lane1");
		rock1.setUp(0);
		rock1.move(speed);
		speed_counter-=10;
		if(speed_counter<maxspeed)
			speed_counter=speed;
};

//rock creation on lane two and animate the rock
let lane2rock=function(){
		var rock2=new rock(0,0,"./images/rock_2.svg","rock2","#lane2");
		rock2.setUp(135);
		rock2.move(speed);
		speed_counter-=10;
		if(speed_counter<maxspeed)
			speed_counter=speed;
};

//rock creation on lane three and animate the rock
let lane3rock=function(){
		var rock3=new rock(0,0,"./images/rock_3.png","rock3","#lane3");
		rock3.setUp(0);
		rock3.move(speed);
		speed_counter-=10;
		if(speed_counter<maxspeed)
			speed_counter=speed;

};

//rock creation on lane four and animate the rock
let lane4rock=function(){
		var rock4=new rock(0,0,"./images/rock_4.png","rock4","#lane4");
		rock4.setUp(135);
		rock4.move(speed);
		speed_counter-=10;
		if(speed_counter<maxspeed)
			speed_counter=speed;

};



//--------------------------------------------------------------------------------------------------------

//interval logic so that two rocks come beside each other,
var gap=800;
var interval=function(){
	lane1rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
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
	setTimeout(interval4,temp);
}
interval3();


function interval4(){
	lane4rock();
	var temp=Math.floor(gap+Math.random()*(2*gap));
	setTimeout(interval3,temp);
}



//---------------------------------------------------------------------------------------------------------


//key event listening so that cars move in a toggle fashion
let flag=0,flag2=0;	

$(document).on("keydown",function(key){
	
	if(key.which === 37){ 
			key.preventDefault();
			if(flag==0){
				$('#car1').animate({left:"+=130px"},200,"swing");
				flag=1;
			}
			else{
				$('#car1').animate({left:"-=130px"},200,"swing");
				flag=0;
			}		
	}
	else if(key.which === 39){ 
			key.preventDefault();
			if(flag2==0){
				$('#car2').animate({left:"+=130px"},200,"swing");
				flag2=1;
			}
			else{
				$('#car2').animate({left:"-=130px"},200,"swing");
				flag2=0;
			}		
	}
	
} );
