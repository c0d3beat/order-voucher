$(function() {
  // Page transition
  var $main =$("#main"),
    $form = $("#form"),
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    support = Modernizr.cssanimations;

  function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
    resetPage( $outpage, $inpage );
    isAnimating = false;
  }

  function resetPage( $outpage, $inpage ) {
    $outpage.attr("class", "pt-page" );
    $inpage.attr("class", "pt-page pt-page-current");
  }

  function slideTo(target) {
    isAnimating = true;

    var $currPage,
      $nextPage,
      outClass,
      inClass;

    switch (target) {
      case "form":
        $currPage = $main;
        $nextPage = $form;
        outClass = 'pt-page-fade';
        inClass = 'pt-page-moveFromBottom pt-page-ontop';
        break;
      case "back":
        $currPage = $form;
        $nextPage = $main;
        outClass = 'pt-page-moveToBottom pt-page-ontop';
        inClass = 'pt-page-fade-in';
        break;
    }

    $nextPage.addClass("pt-page-current");

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if(endNextPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if(endCurrPage) {
        onEndAnimation($currPage, $nextPage);
      }
    });
  }

  // dropdown init
  $('.ui.dropdown').dropdown();



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
  var color = getColor();
  $(".ui.colored.segment").css('background', color);
  $(".ui.segment:nth-child(4)").find("i").css("color", color);



  // show mobile field
  var needMobileNumber = [
    'mandirisms',
    'maybank',
    'paypro',
    'tcash',
    'xltunai'
  ];
  var $mobile = $("#mobile");
  $("input[name='payment']").bind("change", function() {
    var trigger = needMobileNumber.indexOf($(this).val());
    if(trigger > -1) {
      if($mobile.css("display") === "none") {
        $mobile.show();
      }
    } else {
      if($mobile.css("display") !== "none") {
        $mobile.hide();
      }
    }
  });


  // form validation
  $(".ui.form").form({
    fields: {
      email: ['empty', 'email'],
      nominal: ['empty', 'decimal'],
      expiration: "empty",
      payment: "empty",
      agree: "checked"
    }
  });


  //modal init
  $('.ui.modal')
    .modal('attach events', '#term', 'show')
  ;


  // global action
  $("#order").on("click", function() {
    $("#form").css("background", getColor());
    slideTo("form");
  });

  $("#close").on("click", function() {
    var $form = $(".ui.form");
    $form.form("clear");
    $form.find("div.ui.error.message").html("");
    slideTo("back");
  });

});