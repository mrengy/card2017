$( document ).ready(function() {
  var message = "HAPPY HOLIDAYS";
  var messageHTML = '';
  var objects = new Array();
  var alreadyExists = false;
  var objectsLength;

  function revealLetter(){
    var thistxt = $(this).text();
    $('.item-letter:contains('+thistxt+')').parent().addClass('completed');
  }

  //constructor for target objects
  function Object(type, name){
    this.type = type;
    this.name = name;
    this.completed = false;
  }

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
  $('.letter').on('click', revealLetter);
  console.log(objects);
});
