$(function() {
  $(".draggable").draggable({ scroll: true,  scrollSpeed: 100, scrollSensitivity: 100 });
});


$(function() {
  $(".sortable").sortable({ connectWith: ['.connectedSortable'] });
});


function add_person(name, $list) {
  console.log('add person', name);
  return $("<li class='list-group-item'>" +
    name +
    "<button type='button' class='btn btn-xs btn-default btn-rm-guest pull-right'> \
        <span class='glyphicon glyphicon-minus' aria-hidden='true'></span> \
      </button>"+
    "</li>"
  ).appendTo($list);
}


function add_table(name, canvas) {
  console.log('add table', name);
  return $("<div class='wp-table draggable col-xs-3'> \
      <div class='panel panel-default'> \
        <div class='panel-heading'> \
          <h3 class='panel-title'>"+name+"</h3> \
          <button type='button' class='btn btn-xs btn-default btn-remove'> \
            <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> \
          </button> \
        </div> \
        <div class='panel-body'> \
          <ul class='sortable connectedSortable list-group'> \
          </ul> \
          <div class='form-group has-feedback'> \
            <input type='text' class='form-control add-person' placeholder='Add person' /> \
            <i class='glyphicon glyphicon-user form-control-feedback'></i> \
          </div> \
        </div> \
      </div> \
    </div>").appendTo(canvas);
}


$(document).ready(function() {
  // add a table
  $("#btn-add-table").keypress(function(e){
    $el = $(e.target);
    if (e.which == 13) {
      $table = add_table($el.val(), "#wp-tables .draggable-tables")
      // TODO
      $(".draggable").draggable({ scroll: true,  scrollSpeed: 100, scrollSensitivity: 100 });
      $(".sortable").sortable({ connectWith: ['.connectedSortable'] });
      $table.find(".btn-remove").click(function(e){
        $(e.target).parents(".wp-table").remove();
      });
      $table.find(".add-person").keypress(function(e){
        if (e.which == 13) {
          add_person($(e.target).val(), $(e.target).parent().siblings('.sortable'))
        }
      });
    // empty input
    $el.val("");
    }
  });

  // remove a table
  $("#draggable2 .btn-remove").click(function(e){
    $(e.target).parents(".wp-table").remove();
  });


  // remove a guest
  $(".btn-rm-guest").click(function(e) {
    // add to others
    $(e.target).parents("li").appendTo("#others ul");
  });


  // add a person
  $("#draggable2 .add-person").keypress(function(e){
    if (e.which == 13) {
      $el = $(e.target);
      add_person($el.val(), $el.parent().siblings('.sortable'));
      // empty input
      $el.val("");
    }
  });

  // import guests
  $("#import-guests").click(function(e) {
    var guests = $('textarea').val();
    guests = guests.split("\n");
    for (var i=0; i<guests.length; i++) {
      guests[i] = guests[i].trim();
      add_person(guests[i], $("#others ul.sortable"));
    }
  });

});