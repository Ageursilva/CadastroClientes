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
  
 
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonString);
  downloadLink.download = `${json.nome}${json.cpfCnpj}.txt`;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  
  
  downloadLink.click();
  
  document.getElementById('CadastroRealizado').innerHTML = 'Cadastro realizado com sucesso!';
  setTimeout(function () {
    document.getElementById('CadastroRealizado').innerHTML = '';
  }, 2000);
  
  form.reset();
}