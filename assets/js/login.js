$(function() {
  $('.ui.grid').transition('fade');
  $('.ui.form').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: 'Kolom email harus diisi'
          },
          {
            type: 'email',
            prompt: 'Alamat email tidak valid'
          }
        ]
      },
      password: {
        identified: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Kolom password harus diisi'
          },
          {
            type: 'length[8]',
            prompt: 'Panjang password minimal 8 karakter'
          }
        ]
      }
    }
  });
});