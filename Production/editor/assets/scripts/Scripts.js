
var sizeCoificient = 0.0004;
var roomPrices = new Array();
roomPrices[0] = 1600;//bathroom
roomPrices[1] = 1200;//kitchen
roomPrices[2] = 800;//livingroom
roomPrices[3] = 700;//bedroom
roomPrices[4] = 400;//garage
roomPrices[5] = 1000;//sauna


var roomPricesCalculated = new Array();
roomPricesCalculated[0] = 0.0  ;
roomPricesCalculated[1] = 0.0 ;
roomPricesCalculated[2] = 0.0 ;
roomPricesCalculated[3] = 0.0 ;
roomPricesCalculated[4] = 0.0 ;
roomPricesCalculated[5] = 0.0 ;

	 $(function() { 

		$("a.share").click(function(){
			$("#send-project").fadeIn("fast");
			// console.log("works");
			return false;
		});

		$("#send-project").find(".close").click(function()
		{
			$("#send-project").fadeOut();
		});

		 var $sandbox = $( "#sandbox" );
		   
		$( ".draggable").each(function() {
			setDrag($(this));
		});
				
		$("#kitchen").click(function(e) {
			alert(1);
			$angle = 0;
			if($(this).getRotateAngle() != 0) {
				$angle = $(this).getRotateAngle()[0];
			}
			$(this).rotate(90 + $angle);
		});
				
		var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";


		$( ".viewPane").draggable({cursor: "move", grid: [ 20,20 ] });
				
		$(".add-kitchen").click(function() {
			addRoom("Kitchen", "kitchen");			
		});

		$(".add-garage").click(function() {
			addRoom("Garage48", "garage");			
		});

		$(".add-sauna").click(function() {
			addRoom("Sauna", "sauna");			
		});

		$(".add-bedroom-master").click(function() {
			addRoom("Master bedroom", "bedroom-master");			
		});

		$(".add-bedroom-small").click(function() {
			addRoom("Small bedroom", "bedroom-small");			
		});

		$(".add-bathroom-shower").click(function() {
			addRoom("Shower", "shower");			
		});

		$(".add-bathroom-bath").click(function() {
			addRoom("Bath", "bath");			
		});

		$(".add-livingroom-solo").click(function() {
			addRoom("Living room - solo", "livingroom-solo");			
		});

		$(".add-livingroom-kitchen").click(function() {
			addRoom("Living room - kitchen", "livingroom-kitchen");			
		});

		$(".button").click(function()
		{
			$(this).toggleClass("active");
			$(this).find(".sub-rooms").fadeToggle("fast");
			$(this).siblings().removeClass("active");
			$(this).siblings().find(".sub-rooms").hide();
		});


		$(".trash" ).droppable({
	  		hoverClass: "deleting",       
			tolerance: "touch", 
			accept: ".drag",
			drop: function( event, ui ) {			
		      if(ui.draggable[0].id != "viewPane")			
		      {	
						$(ui.draggable).remove();
		        CalculateWholeSum();
		      }
		      else{

		      }
			}
		});

	});

    

    $('.viewPane').on('tap', function() {
        $(this).find('p').css('background', 'red');

    });

    $('body').on('tap', '.viewPane', function() {

    });

	var SqSumma = 0.0;

    function resizedBlock(s, e)
    {
      SqSumma = 0.0;
      s.value;
      var sqPixels = e.size.height * e.size.width;
      var master = document.getElementById(e.element[0].id);

         var SqMeter =  master.getElementsByClassName('SqMeter');

        [].slice.call( SqMeter ).forEach(function ( div ) {
            e.element[0].children[0].children[0].children[0].children[1].innerHTML = (sqPixels * sizeCoificient).toFixed(2) + " m<sup>2</sup>";
            getpriceForRoom(div);
        });

        CalculateSum();
    } 



	function CalculateSum(){

	    ClearPriceArray();
	    var SqSumma = 0.0;
	      var SumFields = document.getElementsByClassName('SqMeter');
	        [].slice.call( SumFields ).forEach(function ( div ) {
	            SqSumma = SqSumma + parseFloat(div.innerHTML);
	            getpriceForRoom(div);
	        });
        document.getElementById('SqSum').innerHTML = "Total m<sup>2</sup>: " + SqSumma.toFixed(2);
        document.getElementById('TotalPrice').innerHTML = "Total price: " + getTotalPrice() + " Eur";
    };

    function getBoxSizes(){

      ClearPriceArray();
      var SumFields = document.getElementsByClassName('draggable');
        [].slice.call( SumFields ).forEach(function ( div ) {
            div.children[0].children[0].children[0].children[1].innerHTML = 
            ((div.clientHeight * div.clientWidth)* sizeCoificient).toFixed(2)+ " m<sup>2</sup>";;
            getpriceForRoom(div);
        });
    }
	
    function getTotalPrice(){
      var TotalPrice =  roomPricesCalculated[0] +
                        roomPricesCalculated[1] +
                        roomPricesCalculated[2] +
                        roomPricesCalculated[3] +
                        roomPricesCalculated[4] +
                        roomPricesCalculated[5] ;

      return TotalPrice.toFixed(2);
    }


  function getpriceForRoom(div){
   if(div.parentElement.parentElement.parentElement.parentElement.id == "bath" ||
    	div.parentElement.parentElement.parentElement.parentElement.id == "shower")
    {
      roomPricesCalculated[0]= roomPricesCalculated[0]+ (roomPrices[0]*parseFloat(div.innerHTML));
    }
    if(div.parentElement.parentElement.parentElement.parentElement.id == "kitchen"){
      roomPricesCalculated[1]= roomPricesCalculated[1]+ (roomPrices[1]*parseFloat(div.innerHTML));
    }
    if(div.parentElement.parentElement.parentElement.parentElement.id == "livingroom-kitchen" ||
    	div.parentElement.parentElement.parentElement.parentElement.id == "livingroom-solo"){
      roomPricesCalculated[2]= roomPricesCalculated[2]+ (roomPrices[2]*parseFloat(div.innerHTML));
    }
    if(div.parentElement.parentElement.parentElement.parentElement.id == "bedroom-master"||
    	div.parentElement.parentElement.parentElement.parentElement.id == "bedroom-small"){
      roomPricesCalculated[3]= roomPricesCalculated[3]+ (roomPrices[3]*parseFloat(div.innerHTML));
    }
    if(div.parentElement.parentElement.parentElement.parentElement.id == "garage"){
      roomPricesCalculated[4]= roomPricesCalculated[4]+ (roomPrices[4]*parseFloat(div.innerHTML));
    }
    if(div.parentElement.parentElement.parentElement.parentElement.id == "sauna"){
      roomPricesCalculated[5]= roomPricesCalculated[5]+ (roomPrices[5]*parseFloat(div.innerHTML));
    }


  }
	
	function setDrag(d) {
		d.draggable({ cursor: "move", snap: true, containment: "#sandbox" 
			}).resizable({  
				resize: function( event, ui ){resizedBlock(event, ui)},
			 	start: function( event, ui ){addhover(ui)},
				stop: function( event, ui ){removehover(ui)}
		});
	}
		
	function addRoom(name, id) {
		var room = "<div id='"+ id +"' class='drag ui-widget-content draggable' style='position:absolute; left:2510px; top:2510px; float:left;'> \
		<div class='info'> \
			<div class='table'> \
				<div class='table-cell'>\
					<p>"+ name +"</p> \
					<p class='SqMeter'>00</p> \
				</div> \
				</div>\
			</div>\
		</div>";
		
		$("#viewPane").append(room);
		
		$( ".draggable").each(function() {
			setDrag($(this));
			$(this).click(function(e) {
				$angle = 0;
				if($(this).getRotateAngle() != 0) {
					$angle = $(this).getRotateAngle()[0];
				}
				$(this).rotate(90 + $angle);
			});
		});

    CalculateWholeSum();

	}


	function CalculateWholeSum()
    {
      getBoxSizes();
      CalculateSum();
    }

    function ClearPriceArray(){
    	roomPricesCalculated[0] = 0.0 ;
	    roomPricesCalculated[1] = 0.0 ;
	    roomPricesCalculated[2] = 0.0 ;
	    roomPricesCalculated[3] = 0.0 ;
	    roomPricesCalculated[4] = 0.0 ;
	    roomPricesCalculated[5] = 0.0 ;
    }

function addhover(obj) {
	//document.getElementById(obj.element[0].id).addClass("touchHover");
	$(obj.element[0].id).addClass("touchhover");
	document.getElementById(obj.element[0].id).className += " touchhover";
}

function removehover(obj) {


	document.getElementById(obj.element[0].id).className =
   document.getElementById(obj.element[0].id).className.replace
      ( /(?:^|\s)touchhover(?!\S)/g , '' )
}
