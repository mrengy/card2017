$( document ).ready(function() {
  var message = "WISHING YOU FUN AND GAMES IN 2018";
  var messageHTML = '';
  var objects = new Array();
  var alreadyExists = false;
  var objectsLength;
  var pauseLength = 2000;
  var placeObject = new Array();
  var messageLength;
  var soundSuccess = new Audio("sound/success.mp3");
  var soundError = new Audio("sound/error.mp3");
  var lives = $('.life').length;

  function revealLetter(){
    var thisText = $(this)[0].children[0].textContent;
    var thisClass= $(this)[0].children[0].className;
    //feedback animation
    //if the item is a letter and doesn't have the completed class, i.e. it hasn't been clicked already, show the success feedback
    if( thisClass == 'letter' && !$('.item-letter:contains('+thisText+')').parent().hasClass('completed') ){
      $('#success').addClass('active');
      soundSuccess.play();
      $('#feedback div').on('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e){
        //remove the class when animation is done
        if(e.originalEvent.animationName==='activeOut'){
          $(e.target).removeClass('active');
        }
      });

      //show the letter clicked
      $('.item-letter:contains('+thisText+')').parent().addClass('completed');

      //wait for success sound to finish
      soundSuccess.addEventListener("ended", function(){
        //when all characters in the message have been completed
        if ( messageLength == $('.completed').length ){
          //redirect to end screen once all letters have been clicked
          $(location).attr('href', 'end.html');
        }
      });

    } else {
      //show the error feedback since this item has been clicked already or is not in the messaage
      $('#error').addClass('active');
      soundError.play();
      //remove a life
      $('.life:not(.lost):last').addClass('lost');

      //wait for success sound to finish
      soundError.addEventListener("ended", function(){
        //when all lives have been lost
        if ( lives == $('.lost').length ){
          //redirect to game over screen once all letters have been clicked
          $(location).attr('href', 'gameover.html');
        }
      });

      $('#feedback div').on('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e){
        //remove the class when animation is done
        if(e.originalEvent.animationName==='activeOut'){
          $(e.target).removeClass('active');
        }
      });
    }
    //don't follow the link
    return false;
  }

  //add the 'out' class to start the out animation after waiting pauseLength
  function animateOut(){
    setTimeout(function(){
      $('.target').addClass('out');
    }, pauseLength);
  }

  function clearTargets(){
    $('.target').empty().removeClass('out');
  }

  //add an object to the DOM
  function writeObject(name){
    if (placeObject[name]['type'] == 'image'){
      $('.'+name).append( '<a href=\"#\"><img class=\"image\" src=\"img\/'+placeObject[name]['name']+'.png\"><\/a>' );
    }
    else if (placeObject[name]['type'] == 'letter'){
      $('.'+name).append( '<a href=\"#\"><span class=\"letter\">'+placeObject[name]['name']+'<\/span><\/a>' );
    }
    //remove the object from the array to make room for the next cycle
    delete placeObject[name];
  }

  function placeObjects(){
    var availableObjects = objects.slice(0);

    //top: determine random item to use
    var topItem = availableObjects[Math.floor(Math.random()*availableObjects.length)];
    //remove chosen item from availableObjects array
    availableObjects.splice( $.inArray(topItem, availableObjects), 1);

    //right: determine random item to use
    var rightItem = availableObjects[Math.floor(Math.random()*availableObjects.length)];
    //remove chosen item from availableObjects array
    availableObjects.splice( $.inArray(rightItem, availableObjects), 1);

    //bottom: determine random item to use
    var bottomItem = availableObjects[Math.floor(Math.random()*availableObjects.length)];
    //remove chosen item from availableObjects array
    availableObjects.splice( $.inArray(bottomItem, availableObjects), 1);

    //left: determine random item to use
    var leftItem = availableObjects[Math.floor(Math.random()*availableObjects.length)];
    //remove chosen item from availableObjects array
    availableObjects.splice( $.inArray(leftItem, availableObjects), 1);

    // add all to placeObject array
    placeObject = {
      top:topItem,
      right:rightItem,
      bottom:bottomItem,
      left:leftItem
    }

    writeObject('top');
    writeObject('right');
    writeObject('bottom');
    writeObject('left');
  }

  function runCycle(){
    //place the objects in random position, and the CSS will animate them in
    placeObjects();

    $('.top').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',function(e){
      //start the animation out
      if(e.originalEvent.animationName==='inTop'){
        animateOut();
      }
      //clear the target elements
      else if(e.originalEvent.animationName==='outTop'){
        clearTargets();

        //repeat the cycle
        runCycle();
      }
    });
  }

  //constructor for target objects
  function Object(type, name){
    this.type = type;
    this.name = name;
    this.completed = false;
  }

  //create all necessary JS objects and write the message in blank letters on the heads-up-display
  function writeMessage(){
    //iterate through the letters in the message variable
    for (var i=0, len=message.length; i<len; i++){
      if (message.charAt(i) === ' '){
        messageHTML += '<div class=\"item space\"><div class=\"item-letter\">&nbsp;<\/div><\/div>';
      }
      else {
        messageHTML += '<div class=\"item\"><div class=\"item-letter\">'+message.charAt(i)+'<\/div><\/div>';

        if (objects[0]!= undefined){
          objectsLength = objects.length;
        }
        else {
          objectsLength = 1;
        }
        //create objects for letters that don't yet exist
        //iterate through objects that have been created to detect whether they've been created already
        for (var j=0, length=objectsLength; j<length; j++){
          //if array has an item
          if (objects[0]!= undefined){
            //detect whether the object of this letter has been created already
            if ( objects[j].name == message.charAt(i) ){
              //console.log('letter found');
              alreadyExists = true;
            }
          }
          // add the letter if it doesn't already exist
          if (j >= (length - 1) && alreadyExists == false ){
            //console.log('letter object created');
            objects.push(new Object('letter',message.charAt(i)));
          }
        }
        //reset
        alreadyExists = false;
      }

      if (i == (len - 1)){
        //output the HTML
        $('#item-container').append(messageHTML);
      }
    }
  }
  //add image objects
  objects.push(new Object('image','kepler'));
  objects.push(new Object('image','lightning'));
  objects.push(new Object('image','tomato'));
  objects.push(new Object('image','us'));

  writeMessage();
  messageLength = ($('.item').length - $('.space').length); //length of message, minus the spaces
  runCycle();
  $('.target').on('click', 'a', revealLetter);

  /* preload resources for next page https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/ */
  setTimeout(function() {
    // get parent url
    var url = window.location.href;
    var parentUrl = url.substring( 0, url.lastIndexOf( "/" ) + 1);

    // preload non-images
		var xhr = new XMLHttpRequest();
		xhr.open('GET', parentUrl+'sound/success.mp3');
		xhr.send('');
    var xhr = new XMLHttpRequest();
		xhr.open('GET', parentUrl+'sound/error.mp3');
		xhr.send('');
		// preload images
		new Image().src = parentUrl+"img/kepler.png";
		new Image().src = parentUrl+"img/lightning.png";
		new Image().src = parentUrl+"img/us.png";
		new Image().src = parentUrl+"img/tomato.png";
		new Image().src = parentUrl+"img/us-tree-large.jpg";
    new Image().src = parentUrl+"img/us-tree-medium.jpg";
    new Image().src = parentUrl+"img/us-tree-small.jpg";
	}, 1000);
});
