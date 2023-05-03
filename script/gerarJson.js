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

  localStorage.setItem('cadastro', JSON.stringify(json));
  console.log(localStorage);

  form.reset();
  document.getElementById('CadastroRealizado').innerHTML = "Cadastro realizado com sucesso!";
  setTimeout(function () {
    document.getElementById('CadastroRealizado').innerHTML = '';
  }, 2000);
}