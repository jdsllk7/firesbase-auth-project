// initialize materialize components
var instances;
document.addEventListener('DOMContentLoaded', function () {

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {edge: 'left'});


    // $('input#input_text, textarea#textarea1').characterCounter();
  
  });

  $(document).ready(function () {
    $('.progress').fadeOut();
  });