$( document ).ready(function() {
  function revealLetter(){
    var thistxt = $(this).text();
    $('.item-letter:contains('+thistxt+')').parent().addClass('completed');
  }

  $('.letter').on('click', revealLetter);
});
