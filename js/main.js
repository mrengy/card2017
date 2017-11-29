$( document ).ready(function() {
  var message = "HAPPY HOLIDAYS";
  var messageHTML = '';
  var objects = new Array();
  var alreadyExists = false;

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
    for (var i=0, len=message.length; i<len; i++){
      if (message.charAt(i) === ' '){
        messageHTML += '<div class=\"item space\"><div class=\"item-letter\">&nbsp;<\/div><\/div>';
      }
      else {
        messageHTML += '<div class=\"item\"><div class=\"item-letter\">'+message.charAt(i)+'<\/div><\/div>';

        //create objects for letters that don't yet exist
        //if ($.inArray(message.charAt(i),objects) == -1){
        for (var j=0, length=objects.length; j<len; j++){
          //if array has an item
          if (objects[j]!= undefined){
            //detect whether the object of this letter has been created already or it's a space
            if ( (objects[j].name == message.charAt(i) ) || (message.charAt(i) != ' ') ){
              console.log('letter found');
              alreadyExists = true;
            }
          }

          // add the letter if it doesn't already exist - LOOPING TOO MANY TIMES, PROBABLY DUE TO OBJECTS.LENGTH BEING RE-EVALUATED WITH EACH PUSH
          if (j >= (length - 1) && alreadyExists == false ){
            console.log('letter object created');
            objects.push(new Object('letter',message.charAt(i)));
          }

          //reset
          alreadyExists = false;
        }
      }

      if (i == (len - 1)){
        $('#item-container').append(messageHTML);
      }
    }
  }
  writeMessage();
  $('.letter').on('click', revealLetter);

  console.log(objects);
  console.log(objects.length);

});
