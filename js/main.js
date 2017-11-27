$( document ).ready(function() {
  function revealLetter(){
    var thistxt = $(this).text();
    $('.item-letter:contains('+thistxt+')').parent().addClass('completed');
  }

  //constructor for target objects
  function Object(type, name){
    this.type = type;
    this.name = name;
    this.added = false;
  }

  var message = "HAPPY HOLIDAYS";
  var messageHTML = '';

  function writeMessage(){
    for (var i=0, len=message.length; i<len; i++){
      if (message.charAt(i) === ' '){
        messageHTML += '<div class=\"item space\"><div class=\"item-letter\">&nbsp;<\/div><\/div>';
      }
      else {
        messageHTML += '<div class=\"item\"><div class=\"item-letter\">'+message.charAt(i)+'<\/div><\/div>';
      }

      if (i == (len - 1)){
        $('#item-container').append(messageHTML);
      }
    }
  }
  writeMessage();
  console.log(messageHTML);
  $('.letter').on('click', revealLetter);
});
