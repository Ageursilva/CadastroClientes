function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        //alert("CEP não encontrado.");
        document.getElementById('cepInex').innerHTML ="CEP não encontrado";
        setTimeout(function(){
          document.getElementById('cepInex').innerHTML ='';
        },2000)

    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
        
            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            //alert("Formato de CEP inválido.");
            document.getElementById('cepInvalido').innerHTML ="Formato do CEP invalido";
            setTimeout(function(){
              document.getElementById('cepInvalido').innerHTML ='';
            },2000)
            
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
var cpfCnpjValue = document.getElementById("cpfCnpj").value;
var isCpfCnpjValid = validaCpfCnpj(cpfCnpjValue);

function validaCpfCnpj(val) {

  if (val.length == 11) {
      var cpf = val.trim();
   
      cpf = cpf.replace(/\./g, '');
      cpf = cpf.replace('-', '');
      cpf = cpf.split('');
      
      var v1 = 0;
      var v2 = 0;
      var aux = false;
      
      for (var i = 1; cpf.length > i; i++) {
          if (cpf[i - 1] != cpf[i]) {
              aux = true;   
          }
      } 
      
      if (aux == false) {
          return false; 
      } 
      
      for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
          v1 += cpf[i] * p; 
      } 
      
      v1 = ((v1 * 10) % 11);
      
      if (v1 == 10) {
          v1 = 0; 
      }
      
      if (v1 != cpf[9]) {
          return false; 
      } 
      
      for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
          v2 += cpf[i] * p; 
      } 
      
      v2 = ((v2 * 10) % 11);
      
      if (v2 == 10) {
          v2 = 0; 
      }
      
      if (v2 != cpf[10]) {
          return false; 
      } else {   
          return true; 
      }
  } else if (val.length == 14) {
      var cnpj = val.trim();
      
      cnpj = cnpj.replace(/\./g, '');
      cnpj = cnpj.replace('-', '');
      cnpj = cnpj.replace('/', ''); 
      cnpj = cnpj.split(''); 
      
      var v1 = 0;
      var v2 = 0;
      var aux = false;
      
      for (var i = 1; cnpj.length > i; i++) { 
          if (cnpj[i - 1] != cnpj[i]) {  
              aux = true;   
          } 
      } 
      
      if (aux == false) {  
          return false; 
      }
      
      for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
          if (p1 >= 2) {  
              v1 += cnpj[i] * p1;  
          } else {  
              v1 += cnpj[i] * p2;  
          } 
      } 
      
      v1 = (v1 % 11);
      
      if (v1 < 2) { 
          v1 = 0; 
      } else { 
          v1 = (11 - v1); 
      } 
      
      if (v1 != cnpj[12]) {  
          return false; 
      } 
      
      for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) { 
          if (p1 >= 2) {  
              v2 += cnpj[i] * p1;  
          } else {   
              v2 += cnpj[i] * p2; 
          } 
      }
      
      v2 = (v2 % 11); 
      
      if (v2 < 2) {  
          v2 = 0;
      } else { 
          v2 = (11 - v2); 
      } 
      
      if (v2 != cnpj[13]) {   
          return false; 
      } else {  
          return true; 
      }
  } else {
      return false;
  }
}


function varB(event){ 
  var cpfCnpjValue = event.target.value;
  
  if (!validaCpfCnpj(cpfCnpjValue)) {
    document.getElementById('cpfCnpjInva').innerHTML = "CPF ou CNPJ inválido";
    setTimeout(function() {
      document.getElementById('cpfCnpjInva').innerHTML = '';
    }, 2000);
    return;
  }
}

function gerarJSON(event) {
  event.preventDefault();

  const form = document.querySelector('.cadastro');
  const cpfCnpjInput = form['cpfCnpj'];
  const cpfCnpjValue = cpfCnpjInput.value;
  //Posso separar em uma função para mostrar o erro
  if (!validaCpfCnpj(cpfCnpjValue)) {
    document.getElementById('cpfCnpjInva').innerHTML = "CPF ou CNPJ inválido";
    setTimeout(function() {
      document.getElementById('cpfCnpjInva').innerHTML = '';
    }, 2000);
    return;
  }

  const json = {
    nome: form.name.value,
    sobrenome: form.surname.value,
    cpfCnpj: cpfCnpjValue,
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
  // Criar uma função separada para a mensagem de sucesso
  document.getElementById('CadastroRealizado').innerHTML = "Cadastro realizado com sucesso!";
  setTimeout(function() {
    document.getElementById('CadastroRealizado').innerHTML = '';
  }, 2000);
}