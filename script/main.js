$(document).ready(function () {
  
  var myurl = 'http://157.230.17.132:3003/todos';
  var inputBox = $('.input-box');
  var btnAdd = $('.btn__add-item');
  var listBox = $('.main--content');
  var element = {
    url: myurl,
    method: '',
    data: {
      text: ''
    },
  }
  // HANDLEBARS CONFIG
  var source = $('#todo__template').html();
  var template = Handlebars.compile(source);

  // FIRST REFRESH
  refresh(myurl,template,listBox);

  // ADD NEW ELEMENT
  btnAdd.click( function() {
    element.method = 'POST';
    element.url = myurl;
    element.data = { text: inputBox.val() }

    $.ajax(element)    
    .done( () => {
      refresh(myurl,template,listBox); 
      inputBox.val('') 
    })
    .fail( () => console.log('API ADD ERROR') )
  })

  // REMOVE ELEMENT
  $('.app').on('click', '.btn__remove', function(){
    var id = $(this).parents('.list-container').data('id');
    element.method = 'DELETE',
    element.url = myurl + '/' + id;
    $.ajax(element)    
    .done( () => refresh(myurl,template,listBox) )
    .fail( () => console.log('API REMOVE ERROR') )
  })

});


/****************************************************
* FUNCTIONS
****************************************************/

// FUNCTION: REFRESH
function refresh (url,template,container){
  container.html('');
  $.ajax({
    url: url,
    method: 'GET',
    success: (data) => {
      for (let i = 0; i < data.length; i++){
        var item = {
          id: data[i].id,
          text: data[i].text
        }
        var html = template(item);
        container.append(html);
      }
    },
    error: () => {console.log('Api refresh in errore');
    }
  })
}