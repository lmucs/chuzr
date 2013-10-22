
  $(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
  $(function() {
    $( "input[type=submit], a, button" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
  });

  $(function() {
    $( "#selectable" ).selectable({
      stop: function() {
        var result = $( "#select-result" ).empty();
        $( ".ui-selected", this ).each(function() {
<<<<<<< HEAD
          var index = $( "#selectable li" ).id( this );
          result.append( " #" + ( index ) );
=======
          var index = $( "#selectable li" ).index( this );
          result.append( " #" + (index + 1 ) );
>>>>>>> b3ba865554c1eb499b7d272d367a499dd26c82e9
        });
      }
    });
  });

  $(function() {
    $( "#format" ).selectable({
      stop: function() {
        var result = $( "#select-format-result" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#format li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
  });