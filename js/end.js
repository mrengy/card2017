$( document ).ready(function() {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var lightningTravelTime = 3000;
    var lightningWaitTime = 1000;
    var thisLightning;
    var thisLightningWidth;
    var lightningCounter = 1;

    /*lightning*/
    var lightning = new Array();

    /*lightning right*/
    var lightningRight = new Array();

    /*prototype lightning definition*/
	  lightning.push($(".lightningLeft"));
    lightningRight.push($(".lightningRight"));

    var w0 = parseInt(lightning[0].css("width"), 10);
    var h0 = parseInt(lightning[0].css("height"), 10);
    var minWidth = w0 / 4;
    /* initial left position of prototype lightnings*/
    var l0 = parseInt(lightning[0].css("left"));
    var r0 = parseInt(lightningRight[0].css("left"));

    /*spawning and moving next lightning*/
    function newLightning(direction){
        var endLeftPos = windowWidth;
        if (direction == 'left'){
            thisLightning = lightning[0].clone();
            lightning.push(thisLightning);
        } else if (direction == 'right'){
            thisLightning = lightningRight[0].clone();
            lightningRight.push(thisLightning);
            //hack to only display spawned lightning so that one can't scroll to see the one to the right
            thisLightning.css("display", "inline");
        }

        thisLightningWidth = getRandomInt(minWidth, w0);

        thisLightning.css("width", thisLightningWidth);
        thisLightning.css("height", thisLightningWidth / (w0/h0));
        thisLightning.css("top", getRandomInt(0, windowHeight));
        thisLightning.attr('id', 'lightning-'+lightningCounter);

        thisLightning.appendTo(lightning[0].parent());

        //moving it after creating it
        if(direction == 'left'){
            thisLightning.animate({left: endLeftPos}, lightningTravelTime*(thisLightningWidth/w0), 'swing', function(){
                    //remove this lightning from DOM
                    this.remove();
                    //remove this lightning from array
                    lightning.splice($.inArray(thisLightning, lightning),1);
            });
        } else if(direction == 'right'){
            thisLightning.animate({right:endLeftPos},lightningTravelTime*(thisLightningWidth/w0), 'swing', function(){
                    //remove this lightning from DOM
                    this.remove();
                    //remove this lightning from array
                    lightningRight.splice($.inArray(thisLightning, lightningRight),1);
            });
        }
        lightningCounter ++;

        //track google analytics event
        ga('send', 'event', 'lightning', direction, 'Easter Eggs');

        //run left lightning again after random time
        if(direction == 'left'){
            window.setTimeout(function(){
                newLightning(direction);
            }, getRandomInt(0,lightningWaitTime));
        }

    }

    // run this function only once. Start the lightning moving
    $('#kepler a').one( 'click', function(){
        //$window.off('resize');
        $window.off('scroll');
        //moveLightning();
        newLightning('left');
        //newLightning();

        //track google analytics event
        ga('send', 'event', 'Kepler', 'click', 'Easter Eggs');

        //remove link
        $('#keplerImage').unwrap('a');

        //don't follow the link
        return false;
    });

    //spawn lightning swimming from the right when lightning is clicked
    $('#end').on('click', '.lightning', function(){
        var clickedLightningID = this.id;
        //console.log(parseInt(($('#'+clickedLightningID).css('width'))));
        var sizeClicked = parseInt(($('#'+clickedLightningID).css('width')));

        for (count = 0; count <= (w0-sizeClicked)/5; count++){
            newLightning('right');
        }
    });

    	/*reusable generic functions*/
    function getRandomInt (min, max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
});
