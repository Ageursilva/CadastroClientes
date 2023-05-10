function gerarJSON(event) {
  event.preventDefault();
  const form = document.querySelector('.cadastro');
  const json = {
    nome: form.name.value,
    sobrenome: form.surname.value,
    cpfCnpj: form.cpfCnpj.value,
    email: form.email.value,
    telefone: form.telephone.value,
    cep: form.cep.value,
    rua: form.rua.value,
    numero: form.number.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    uf: form.uf.value
  };

  const jsonString = JSON.stringify(json);


  const jsonDownload = document.createElement('a');
  jsonDownload.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString);
  jsonDownload.download = `${json.nome}${json.sobrenome}_${json.cpfCnpj}.txt`;
  jsonDownload.style.display = 'none';
  document.body.appendChild(jsonDownload);


  jsonDownload.click();


  // const fs = require('fs');

  // fs.('data.txt', jsonString, (err) => {
  //   if (err) throw err;
  //   console.log('Arquivo gravado com sucesso!');
  // });

  document.getElementById('CadastroRealizado').innerHTML = 'Cadastro realizado com sucesso!';
  setTimeout(function () {
    document.getElementById('CadastroRealizado').innerHTML = '';
  }, 2000);

  form.reset();
}