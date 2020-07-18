
//rock function for creating rock objects
// attributes: x and y for coordinates
// img for name of the image
// id for uniqueness
// lane,which lane it belongs
// ele to store the jquery element that will be appended to the board


var instructionsButtonClicked=false;

var score=0;

let game=function(){


	var firstCarNoHit=1;
	var secondCarNoHit=1;


	// gameLevel5();

	function rock(img,id,class_name,lane){
		this.img=img;
		this.id=id;
		this.class_name=class_name;
		this.lane=lane;
		this.ele=null;
	}

	//setUp method will create img element and append to the board and make the element position absolute so that the rock animates relative the nearest positioned
	// ancestor,so that rock will always come from top
	rock.prototype.setUp=function(left_gap){
		if(firstCarNoHit && secondCarNoHit){
			this.ele=$("<img src="+this.img+" id="+this.id+" class="+this.class_name+" height=60 width=123>");
			$(this.lane).append(this.ele);
			this.ele.css({position:"absolute",left:left_gap+"px"});
		}
	};
	//move method is to animate the rock element from the top till bottom and removes the element after reaching bottom
	rock.prototype.move=function(speed){
		//removing the rock after animation
		if(firstCarNoHit && secondCarNoHit){
			this.ele.animate({bottom:0},speed,"linear",function(){this.remove();});
		}
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
		//game level changes based on score
	let decideGameLevel = function(score){
		if(score==20)
			gameLevel2();
		if(score==40)
			gameLevel3();
		if(score==50){
			for(let i=0;i<5;i++)
				gameLevel2();
		}

		if(score==80){
			for(let i=0;i<5;i++)
				gameLevel3();
		}


		if(score==110){
			for(let i=0;i<20;i++)
				gameLevel2();
		}
		if(score==150){
			for(let i=0;i<20;i++)
				gameLevel3();
		}





		// if(score>50 && score<60)
		// 	gameLevel2();

		// if(score>70 && score<80)
		// 	gameLevel4();

	}
	//---------------------------------------------------------------------------------------------------------
	//score card
	var timer;
	score=0;
	let scoreCard=function(){
		timer=setInterval(function(){
				score+=1;
				decideGameLevel(score);
				
				document.getElementById("scoreh2").innerHTML=score;
		},1000);
	}
	scoreCard();
	//---------------------------------------------------------------------------------------------------------
	//rock images

	let rock1_img="./images/rock_1.png";
	let rock2_img="./images/rock_2.svg";
	let rock3_img="./images/rock_4.png";
	let rock4_img="./images/rock_3.png";
	//rock movement for different lanes
	//as the speed variable decreases,speed increases
	//speed is the base speed
	var tempSpeed=1200;
	var variation=400;
	var speed=1600;		 
	var maxspeed=700;
	var randomSpeedBase=1100;

	var speed_counter=speed;
	//to increase the speed of the rocks through time,need to decrease the speed counter with iter variable
	var iter=10;

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


	//-------------------------------------------------------------------------------------------------------

	// let movingBoard1 = setInterval(function(){
	// $("#board").animate({left: '100'},1000,"linear");
	// },1000);
	// let movingBoard2 = setInterval(function(){
	// $("#board").animate({left: '0'},1000,"linear");

	// },1000);


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

	//---------------------------------------------------------------------------------------------------------	\

	let displayPlayButton = function(){

		$("#playagain").css({display:"inline"});
		
	}



	//---------------------------------------------------------------------------------------------------------	
	//collision handling


	var firstCarNoHit=1;
	var secondCarNoHit=1;

	function hitsForFirstTwoRocks(){
		let car=$("#car1");	
		$(".rocks1and2").each(function(){


					let rock=$(this);

					//rock and car positions
					// rock_left=rock.position().left;
					// rock_top=rock.position().top;
					// rock_right=rock_left+rock.width();
					// rock_bottom=rock_top+rock.height();

					// car_left=car.position().left;
					// car_top=car.position().top;
					// car_right=car_left+car.width();
					// car_bottom=car_top+car.height();



					rock_left=rock.offset().left;
					rock_top=rock.offset().top;
					rock_right=rock_left+rock.width();
					rock_bottom=rock_top+rock.height();

					car_left=car.offset().left;
					car_top=car.offset().top;
					car_right=car_left+car.width();
					car_bottom=car_top+car.height();


					// console.log("rock");
					// console.log(rock_left);
					// console.log(rock_top);
					// console.log("car");

					// console.log(car_left);
					// console.log(car_top);


					if (rock_bottom < car_top || rock_top > car_bottom || rock_right < car_left || rock_left > car_right) {
						//no collision happpened	  
				    }
			   	    else{

			   	    	
					// 	console.log("rock collision");
					// console.log(rock_left);
					// // console.log(rock_top);
					// console.log("car collision");

					// console.log(car_left);
					// console.log(car_top);						
						// console.log(rock.context.id+" "+car.context.id+" "+rock_left+" "+rock_top+" "+car_left+" "+car_top);
						// console.log("akc");
						car.attr("src","./images/broken_car2.png");
						crash.play();

						// car.css({'transform' : 'rotate('+180 +'deg)'});
						// car.animate({left: '80',top: '200'},1000,"linear");

						crash_anim_left=Math.random()*100;
						crash_anim_top=Math.random()*100;
						crash_anim_deg=180+Math.random()*180;

					    car.animate({ deg: '+='+crash_anim_deg, left: '+='+crash_anim_left, top: '+='+crash_anim_top },
					    {
						      duration: 1000,
						      step: function(now) {
						      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
					      	  }
					    });


						firstCarNoHit=0;
						rockMovement=0;
						clearInterval(timer);
						// rock.css({position:"static"});
						// rock.hide();
					    $(".rocks1and2").stop();
	   					
	   					// $("#playagain").removeProp("display");

					    // $("#board").animate({deg: '+=360', left: '50%',top: '+=100'},1000,"linear")},1000);

						//  if(!(firstCarNoHit && secondCarNoHit))
						// 	clearInterval(movingBoard1);
						// if(!(firstCarNoHit && secondCarNoHit))
						// 	clearInterval(movingBoard2);
					   	setTimeout(displayPlayButton,1000);


					    	
					}
		});
		if(firstCarNoHit)
			setTimeout(hitsForFirstTwoRocks,100);	
	}

	function hitsForSecondTwoRocks(){
		let car=$("#car2");
		$(".rocks3and4").each(function(){
					let rock=$(this);
					
					//rock and car positions
					// rock_left=rock.position().left;
					// rock_top=rock.position().top;
					// rock_right=rock_left+rock.width();
					// rock_bottom=rock_top+rock.height();

					// car_left=car.position().left;
					// car_top=car.position().top;
					// car_right=car_left+car.width();
					// car_bottom=car_top+car.height();


					rock_left=rock.offset().left;
					rock_top=rock.offset().top;
					rock_right=rock_left+rock.width();
					rock_bottom=rock_top+rock.height();

					car_left=car.offset().left;
					car_top=car.offset().top;
					car_right=car_left+car.width();
					car_bottom=car_top+car.height();

					if (rock_bottom < car_top || rock_top > car_bottom || rock_right < car_left || rock_left > car_right) {
						//no collision happpened	

						// console.log("before rock");
			   // 	    	console.log(rock_left);				
			   // 	    	console.log(rock_top);				
			   // 	    	console.log(rock_right);			
			   // 	    	console.log(rock_bottom);			
			   // 	    	console.log("before car");			
			   // 	    	console.log(car_left);				
			   // 	    	console.log(car_top);				
			   // 	    	console.log(car_right);				
			   // 	    	console.log(car_bottom);



						// before rock
						// main.js:357 144.97723388671875
						// main.js:358 510.0816984176636
						// main.js:359 266.97723388671875
						// main.js:360 570.0816984176636
						// main.js:361 before car
						// main.js:362 18.15118408203125
						// main.js:363 463.9996976852417
						// main.js:364 141.15118408203125
						// main.js:365 563.9996976852417


				    }
			   	    else{


						// console.log("after rock");
			   // 	    	console.log(rock_left);				
			   // 	    	console.log(rock_top);				
			   // 	    	console.log(rock_right);			
			   // 	    	console.log(rock_bottom);			
			   // 	    	console.log("after car");			
			   // 	    	console.log(car_left);				
			   // 	    	console.log(car_top);				
			   // 	    	console.log(car_right);				
			   // 	    	console.log(car_bottom);

						// after rock
						// main.js:371 138.69418334960938
						// main.js:372 551.7422866821289
						// main.js:373 260.6941833496094
						// main.js:374 611.7422866821289
						// main.js:375 after car
						// main.js:376 20.417327880859375
						// main.js:377 461.9861526489258
						// main.js:378 143.41732788085938
						// main.js:379 561.9861526489258







			   	    	// console.log("rock_bottom < car_top "+rock_bottom <=car_top);
			   	    	// console.log("rock_top > car_bottom "+rock_top >= car_bottom);
			   	    	// console.log("rock_right < car_left "+rock_right <= car_left);
			   	    	// console.log("rock_left > car_right "+rock_left >= car_right);


						car.attr("src","./images/broken_car2.png");	
						crash.play();
						// car.animate({left: '80',top: '-=100'},1000,"linear");
						crash_anim_left=Math.random()*100;
						crash_anim_top=Math.random()*100;
						crash_anim_deg=180+Math.random()*180;

					    car.animate({ deg: '+='+crash_anim_deg, left: '+='+crash_anim_left, top: '+='+crash_anim_top },
					    {
						      duration: 1000,
						      step: function(now) {
						      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
					      	  }
					    });



						secondCarNoHit=0;
						rockMovement=0;
						clearInterval(timer);
						// rock.css({position:"static"});
						$(".rocks3and4").stop();	


						// $("#playagain").removeProp("display");

					    // setTimeout(function(){$("#board").animate({deg: '+=360', left: '80',top: '+=100'},1000,"linear")},1000);

					   
					   	setTimeout(displayPlayButton,1000);
					 //     if(!(firstCarNoHit && secondCarNoHit))
						// 	clearInterval(movingBoard1);
						// if(!(firstCarNoHit && secondCarNoHit))
						// 	clearInterval(movingBoard2);




				
					}
		});
		if(secondCarNoHit)
			setTimeout(hitsForSecondTwoRocks,100);	
	}
	hitsForFirstTwoRocks();
	hitsForSecondTwoRocks();


	//---------------------------------------------------------------------------------------------------------

	//key event listening so that cars move in a toggle fashion
	let player=function(){
		let flag=0,flag2=0;	
		$(document).on("keydown",function(key){
			if(key.which === 70 && (firstCarNoHit && secondCarNoHit)){ 
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
			else if(key.which === 74 && (firstCarNoHit && secondCarNoHit)){ 
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


}

//---------------------------------------------------------------------------------------------------------


game();


//---------------------------------------------------------------------------------------------------------

let instructions=function(){
	if(!instructionsButtonClicked){
		instructionsButtonClicked=true;
		$("#instructions").css({display:"inline"});
		$("#board").animate({ deg: '+90'},
					    {
						      duration: 1000,
						      step: function(now) {
						      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
					      	  }
					    }
		);
	}
	else{
		instructionsButtonClicked=false;
		$("#instructions").css({display:"none"});
		$("#board").animate({ deg: '0'},
					    {
						      duration: 1000,
						      step: function(now) {
						      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
					      	  }
					    }
		);

	}

}



let gameLevel2 = function(){
	let board = $("#board");
	board.animate({left:"+300px"},1000);
	board.animate({left:"-300px"},1000);
	board.animate({left:"0px"},1000);

}

let gameLevel3 = function(){
	let board = $("#board");
	board.animate({left:"+300px"},500);
	board.animate({left:"-300px"},500);
	board.animate({left:"0px"},500);

}



//need to implement
let gameLevel4 = function(){
	let board = $("#board");
	board.animate({left:"+900px"},1000);
	board.animate({left:"-900px"},1000);
	board.animate({left:"0px"},1000);

}



//need to implement
let gameLevel5 = function(){
	$("#board").animate({ deg: '+45'},
						    {
							      duration: 5000,
							      step: function(now) {
							      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
						      	  }
						    }
	);
	$("#board").animate({ deg: '-45'},
						    {
							      duration: 5000,
							      step: function(now) {
							      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
						      	  }
						    }
	);
	$("#board").animate({ deg: '0'},
						    {
							      duration: 5000,
							      step: function(now) {
							      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
						      	  }
						    }
	);



}



let endEffects=function(){


	if(instructionsButtonClicked){
		$("#board").animate({ deg: '0'},
				    {
					      duration: 1000,
					      step: function(now) {
					      	 $(this).css({ transform: 'rotate(' + now + 'deg)' });
				      	  }
		});
	 instructionsButtonClicked=false;
	 $("#instructions").css({display:"none"});
	}




	$("#playagain").css({display:"none"});
	let board = $("#board");
	// let leftLanes = $("#leftlanes");
	// let rightLanes = $("#rightlanes");
	let lane1=$("#lane1");
	let lane2=$("#lane2");
	let lane3=$("#lane3");
	let lane4=$("#lane4");

	let newBoard = board;
	// board.animate({left:"-700",top:"+80px"},700);
	board.animate({top:"+800px"},1000,function(){
	lane1.empty();
	lane2.empty();
	lane3.empty();
	lane4.empty();
	// board.animate({left:"-2000px",top:"-200px"},1000);
	board.animate({left:"0",top:"0"},1000,function(){game();});
		
	});
	


}




