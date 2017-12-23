$( document ).ready(function() {
  var message = "HAPPY HOLIDAYS";
  var messageHTML = '';
  var objects = new Array();
  var alreadyExists = false;
  var objectsLength;
  var pauseLength = 2000;
  var placeObject = new Array();

  function revealLetter(){
    var thistxt = $(this).text();
    $('.item-letter:contains('+thistxt+')').parent().addClass('completed');
    //subtract space characters to determine whether all non-space characters have been completed
    if ( ($('.item').length - $('.space').length)== $('.completed').length ){
      //redirect to end screen
      $(location).attr('href', 'end.html');
    }
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
      $('.'+name).append( '<a href=\"#\"><img src=\"img\/'+placeObject[name]['name']+'.png\"><\/a>' );
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
  runCycle();
  $('.target').on('click', '.letter', revealLetter);
});
