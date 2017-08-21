$(function() {

  // generate random background color
  function getColor() {
    var colors = [
      '#0ac2d2',
      '#7bb7fa',
      '#60d7a9',
      '#fdc162',
      '#fd6a62',
      '#f68dbb'
    ];
    var number = Math.floor((Math.random() * 6));
    return colors[number];
  }

  $(".page").css("background", getColor());

  $("div.content").show();

  var $dimmer = $(".ui.dimmer");
  $dimmer.dimmer({
    closable: false,
    opacity: 0.9
  });
  $dimmer.dimmer("show");
  $(".page").fadeTo("slow", 1);

  $("button").on("click", function() {
    $dimmer.dimmer("hide");
  });
});