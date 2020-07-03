
//rock function for creating rock objects
// attributes: x and y for coordinates
// img for name of the image
// id for uniqueness
// lane,which lane it belongs
// ele to store the jquery element that will be appended to the board

alert("use F and J to move cars");

function rock(img,id,class_name,lane){
	this.img=img;
	this.id=id;
	this.class_name=class_name;
	this.lane=lane;
	this.ele=null
;}

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
	this.ele.animate({bottom:0},speed,"linear",function(){this.remove();});
};

//--------------------------------------------------------------------------------------------
//car function for creating car objects and the attributes are same as rock objects
function car(img,id,lane){
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
	this.ele.css({top:"70%"});

};

//initialised two cars
const car1=new car("./images/unnamed.png","car1","#lane1");
car1.setUp();

const car2=new car("./images/unnamed.png","car2","#lane3");
car2.setUp();

var crash = new Audio("./sounds/car_crash.wav");
crash.preload = 'auto';

//---------------------------------------------------------------------------------------------------------
//score card
var timer;
let scoreCard=function(){
	var score=0;
	timer=setInterval(function(){
			score+=1;
			document.getElementById("scoreh2").innerHTML=score;
	},1000);
}
scoreCard();
//---------------------------------------------------------------------------------------------------------
//rock images

let rock1_img="./images/rock_1.png";
let rock2_img="./images/rock_2.svg";
let rock3_img="./images/rock_3.png";
let rock4_img="./images/rock_4.png";
//rock movement for different lanes
//as the speed variable decreases,speed increases
//speed is the base speed
var tempSpeed=1200;
var variation=400;
var speed=1600;		 
var maxspeed=800;
var randomSpeedBase=1100;

var speed_counter=speed;
//to increase the speed of the rocks through time,need to decrease the speed counter with iter variable
var iter=20;

//rock creation on lane one and animate the rock
let lane1rock=function(){
		var rock1=new rock(rock1_img,"rock1","rocks1and2","#lane1");
		rock1.setUp(0);
		rock1.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed)
		{	
			//speed=tempSpeed+Math.random()*variation;
			speed_counter=randomSpeedBase+Math.random()*variation;
		}
};

//rock creation on lane two and animate the rock
let lane2rock=function(){
		var rock2=new rock(rock2_img,"rock2","rocks1and2","#lane2");
		rock2.setUp(126);
		rock2.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed){
			//speed=tempSpeed+Math.random()*variation;
			speed_counter=randomSpeedBase+Math.random()*variation;
		}
};

//rock creation on lane three and animate the rock
let lane3rock=function(){
		var rock3=new rock(rock3_img,"rock3","rocks3and4","#lane3");
		rock3.setUp(0);
		rock3.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed){
			//speed=tempSpeed+Math.random()*variation;
			speed_counter=randomSpeedBase+Math.random()*variation;
		}

};

//rock creation on lane four and animate the rock
let lane4rock=function(){
		var rock4=new rock(rock4_img,"rock4","rocks3and4","#lane4");
		rock4.setUp(126);
		rock4.move(speed_counter);
		speed_counter-=iter;
		if(speed_counter<maxspeed){
			//speed=tempSpeed+Math.random()*variation;
			speed_counter=randomSpeedBase+Math.random()*variation;
		}

};




//--------------------------------------------------------------------------------------------------------

//interval logic so that two rocks come beside each other,

//gap variable is for the vertical gap between the two rocks,so that car should definetely has a way to move between them without hitting 
var gap=600;
var rockMovement=1;
let rockIntervalLogic=function(){
	
	//for first two cars
	var interval=function(){
		lane1rock();
		var temp=Math.floor(gap+Math.random()*(2*gap));
		if(rockMovement)
			var a=setTimeout(interval2,temp);
		
	}
	interval();


	function interval2(){
		lane2rock();
		var temp=Math.floor(gap+Math.random()*(2*gap));
		var b=setTimeout(interval,temp);
	}


	//for second two cars
	var interval3=function(){
		lane3rock();
		var temp=Math.floor(gap+Math.random()*(2*gap));
		if(rockMovement)
			var c=setTimeout(interval4,temp);
	}
	interval3();


	function interval4(){
		lane4rock();
		var temp=Math.floor(gap+Math.random()*(2*gap));
		var d=setTimeout(interval3,temp);
	}
}
rockIntervalLogic();

//---------------------------------------------------------------------------------------------------------	
//collision handling


var firstCarHit=1;
var secondCarHit=1;

function hitsForFirstTwoRocks(){
	let car=$("#car1");	
	$(".rocks1and2").each(function(){
				let rock=$(this);

				//rock and car positions
				rock_left=rock.position().left;
				rock_top=rock.position().top;
				rock_right=rock_left+rock.width();
				rock_bottom=rock_top+rock.height();

				car_left=car.position().left;
				car_top=car.position().top;
				car_right=car_left+car.width();
				car_bottom=car_top+car.height();

				if (rock_bottom < car_top || rock_top > car_bottom || rock_right < car_left || rock_left > car_right) {
					//no collision happpened	  
			    }
		   	    else{
					
					// console.log(rock.context.id+" "+car.context.id+" "+rock_left+" "+rock_top+" "+car_left+" "+car_top);
					// console.log("akc");
					car.attr("src","./images/broken_car2.png");
					crash.play();

					// car.css({'transform' : 'rotate('+180 +'deg)'});
					// car.animate({left: '80',top: '200'},1000,"linear");

				    car.animate({ deg: '+=360', left: '+=50', top: '+=100' },
				    {
					      duration: 1000,
					      step: function(now) {
					      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
				      	  }
				    });

					firstCarHit=0;
					rockMovement=0;
					clearInterval(timer);
				    $(".rocks1and2").stop();
				    	
				}
	});
	if(firstCarHit)
		setTimeout(hitsForFirstTwoRocks,100);	
}

function hitsForSecondTwoRocks(){
	let car=$("#car2");
	$(".rocks3and4").each(function(){
				let rock=$(this);
				
				//rock and car positions
				rock_left=rock.position().left;
				rock_top=rock.position().top;
				rock_right=rock_left+rock.width();
				rock_bottom=rock_top+rock.height();

				car_left=car.position().left;
				car_top=car.position().top;
				car_right=car_left+car.width();
				car_bottom=car_top+car.height();

				if (rock_bottom < car_top || rock_top > car_bottom || rock_right < car_left || rock_left > car_right) {
					//no collision happpened	  
			    }
		   	    else{

					car.attr("src","./images/broken_car2.png");	
					crash.play();
					car.animate({left: '80',top: '-=100'},1000,"linear");
					secondCarHit=0;
					rockMovement=0;
					clearInterval(timer);
					
					$(".rocks3and4").stop();					
				}
	});
	if(secondCarHit)
		setTimeout(hitsForSecondTwoRocks,100);	
}
hitsForFirstTwoRocks();
hitsForSecondTwoRocks();


//---------------------------------------------------------------------------------------------------------

//key event listening so that cars move in a toggle fashion
let player=function(){
	let flag=0,flag2=0;	
	$(document).on("keydown",function(key){
		if(key.which === 70){ 
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
		else if(key.which === 74){ 
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
	});
 }
 player();
