/*
    The function below is used to:
    1. enable smooth scrolling
    2. in the collapsed mode: close the main menu when an item is clicked
*/
$(document).ready(function() {

  $('.scroll').smoothScroll({offset: 0});
  $('#product-sign-up').slideUp(0);
  $('#page').removeClass('fade-out-page');
});

var betaSignUpRef = new Firebase('https://edlogiq.firebaseio.com/beta');

$('.beta-signup').each(function(){
  $(this).click(function(e){
    $('#product-sign-up').slideDown(500);
    $('#page').addClass('fade-out-page');
  });
});

$('#close-beta-form').click(function(){
  $('#product-sign-up').slideUp(500);
  $('#page').removeClass('fade-out-page');
});

$('#submit-beta-form').click(function(){
  var interestedProducts = [];
  $('.productCheckbox:checked').each(function() {
   interestedProducts.push($(this).val());
  });

  console.log(interestedProducts);

  var betaSignUpInfo = {
    "name": $('#product_name').val(),
    "email": $('#product_email').val(),
    "phone_number": $('#product_phone_number').val(),
    "products": interestedProducts
  };

  betaSignUpRef.push().set(betaSignUpInfo);
  betaSignUpRef.on("child_added", function(snapshot) {
      $('#beta-success').slideDown('slow');
      $('#beta-success span').text(' Thank you !');
      setTimeout(function() {
        $('#beta-success').slideUp('slow');
        $('#close-beta-form').click();
      }, 1000);
      $('#product_name').val('');
      $('#product_email').val('');
      $('#product_phone_number').val('');
  });
});
/*
    The function below is used to:
    1. validate the contact form
    2. submit the contact form
    3. display the result from submitting the form
*/
$('#submit-contact-form').click( function() {
    var error = false;

    var name = $('#name').val();
    if(name == "" || name == " ") {
        $('#name').css('background-color', '#f2dede');
        $('#name').parent().addClass('has-error');
        error = true;
    } else {
        $('#name').css('background-color', '#fff');
        $('#name').parent().removeClass('has-error');
    }

    var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $('#email').val();
    if (email == "" || email == " ") {
        $('#email').css('background-color', '#f2dede');
        $('#email').parent().addClass('has-error');
        error = true;
    } else if (!checkEmail.test(email)) {
        $('#email').css('background-color', '#f2dede');
        $('#email').parent().addClass('has-error');
        error = true;
    } else {
        $('#email').css('background-color', '#fff');
        $('#email').parent().removeClass('has-error');
    }

    var message = $('#message').val();
    if(message == "" || message == " ") {
        $('#message').css('background-color', '#f2dede');
        $('#message').parent().addClass('has-error');
        error = true;
    } else {
        $('#message').css('background-color', '#fff');
        $('#message').parent().removeClass('has-error');
    }

    var data_string = $('#contact-form').serialize();

    if (error == false) {
        var contactUsRef = new Firebase('https://edlogiq.firebaseio.com/contactus');

        var contactInput = {
          "name": $('#name').val(),
          "email": $('#email').val(),
          "message": $('#message').val()
        }

        contactUsRef.push().set(contactInput);

        contactUsRef.on("child_added", function(snapshot) {
            $('#contact-success').slideDown('slow');
            $('#contact-success span').text('Message sent.');
            setTimeout(function() {
                $('#contact-success').slideUp('slow');
            }, 10000);
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        });
    } else {
        $('#contact-error').hide();
        $('#contact-success').hide();
    }
});

$(document).ready(function() {
    /*
        The function below is used to:
        1. start the ticker on the home page
    */
    var current = 1;
	var height = $('.ticker').height();
	var numberDivs = $('.ticker').children().length;
	var first = $('.ticker h3:nth-child(1)');
	setInterval(function() {
	    var number = current * -height;
	    first.css('margin-top', number + 'px');
	    if (current === numberDivs) {
	        first.css('margin-top', '0px');
	        current = 1;
	    } else current++;
	}, 2500);

    /*
        The function below is used to:
        1. start the carousel in the about us section
    */
    $('.carousel').carousel({
        interval: 2500
    });

    /*
        The function below is used to:
        1. start the gallery in the work section
    */
    $("#gallery a[data-gal^='prettyPhoto']").prettyPhoto({slideshow: false, allow_expand: false, allow_resize: true, social_tools: false, theme: 'light_square', deeplinking: false});

    //.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	// parallax background
    $('#header').parallax("50%", 0.1);
    $('#services').parallax("50%", 0.2);
    $('#clients').parallax("50%", 0.1);
});

