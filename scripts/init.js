// initialize materialize components
var instances;
document.addEventListener('DOMContentLoaded', function () {

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    var modals = document.querySelectorAll('.modal');
    var instance_models = M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge: 'left'});


    // $('input#input_text, textarea#textarea1').characterCounter();
  
  });

  $(document).ready(function () {
    $("select[required]").css({display: "block", height: 0, padding: 0, width: 0, position: 'absolute'});
  });