$(document).ready(function () {
    $('#Form').on('submit', function (e) {
      e.preventDefault();
  
      const iframe = $('<iframe>', {
        src: 'https://gestao.meueleve.com.br/',
        width: '100%',
        height: '500',
        frameborder: '0'
      });
  
  
      const closeButton = $('<button>', {
        html: 'Fechar',
        class: 'close-button'
      });
  
  
      $('#iframeContainer').append(closeButton, iframe);
  
      closeButton.on('click', function () {
        $('#iframeContainer').empty();
      });
    });
  });