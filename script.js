
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
        alert("CEP não encontrado.");
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
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function validarCpfCnpj(valor) {
    // Remove caracteres especiais
    valor = valor.replace(/[^\d]+/g, '');
  
    if (valor.length === 11) {
      // CPF
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(valor.charAt(i)) * (10 - i);
      }
      let resto = soma % 11;
      if (resto === 0 || resto === 1) {
        if (parseInt(valor.charAt(9)) !== 0) {
          return false;
        }
      } else {
        if (parseInt(valor.charAt(9)) !== 11 - resto) {
          return false;
        }
      }
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(valor.charAt(i)) * (11 - i);
      }
      resto = soma % 11;
      if (resto === 0 || resto === 1) {
        if (parseInt(valor.charAt(10)) !== 0) {
          return false;
        }
      } else {
        if (parseInt(valor.charAt(10)) !== 11 - resto) {
          return false;
        }
      }
      return true;
    } else if (valor.length === 14) {
      // CNPJ
      let soma = 0;
      let peso = 2;
      for (let i = 11; i >= 0; i--) {
        soma += parseInt(valor.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      let resto = soma % 11;
      if (resto === 0 || resto === 1) {
        if (parseInt(valor.charAt(12)) !== 0) {
          return false;
        }
      } else {
        if (parseInt(valor.charAt(12)) !== 11 - resto) {
          return false;
        }
      }
      soma = 0;
      peso = 2;
      for (let i = 12; i >= 0; i--) {
        soma += parseInt(valor.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      resto = soma % 11;
      if (resto === 0 || resto === 1) {
        if (parseInt(valor.charAt(13)) !== 0) {
          return false;
        }
      } else {
        if (parseInt(valor.charAt(13)) !== 11 - resto) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

function gerarJSON(event) {
    event.preventDefault()
    const form = document.querySelector('.cadastro');
    const cpfCnpjInput = form.cpfCnpj;
    const cpfCnpjValue = cpfCnpjInput.value;
    if (!validarCpfCnpj(cpfCnpjValue)) {
      alert('CPF ou CNPJ inválido');
      return;
    }
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
  
    alert('Cadastro com sucesso!');
  }