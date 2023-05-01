function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = (conteudo.logradouro);
    document.getElementById('bairro').value = (conteudo.bairro);
    document.getElementById('cidade').value = (conteudo.localidade);
    document.getElementById('uf').value = (conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    //alert("CEP não encontrado.");
    document.getElementById('cepInex').innerHTML = "CEP não encontrado";
    setTimeout(function () {
      document.getElementById('cepInex').innerHTML = '';
    }, 2000)

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
    if (validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      //alert("Formato de CEP inválido.");
      document.getElementById('cepInvalido').innerHTML = "Formato do CEP invalido";
      setTimeout(function () {
        document.getElementById('cepInvalido').innerHTML = '';
      }, 2000)

    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
};

function VerificaNumero(numero) {
  if (isNaN(numero.value)) {
    numero.value = "";
  }
}

function validaCampo(obj) {
  if (obj.value.length <= 11) {
    validarCPF(obj)
  } else {
    validarCNPJ(obj)
  }
}

function validarCPF(objCPF) {
  var cpf = objCPF.value.replace(/\D/g, "");

  if (cpf.length !== 11) {
    mostrarMensagem("CPF inválido");
    return;
  }

  var digitoDigitado = parseInt(cpf.charAt(9) + cpf.charAt(10));
  var soma1 = 0,
    soma2 = 0,
    vlr = 11;

  for (var i = 0; i < 9; i++) {
    soma1 += parseInt(cpf.charAt(i)) * (vlr - 1);
    soma2 += parseInt(cpf.charAt(i)) * vlr;
    vlr--;
  }

  soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
  soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

  var digitoGerado = (soma1 * 10) + soma2;

  if (digitoGerado !== digitoDigitado) {
    mostrarMensagem("CPF inválido");
  } else {
    ocultarMensagem();
  }
}

function validarCNPJ(objCNPJ) {
  var cnpj = objCNPJ.value.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    mostrarMensagem("CNPJ inválido");
    return;
  }

  var valida = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var dig1 = 0,
    dig2 = 0;

  for (var i = 0; i < valida.length; i++) {
    dig1 += parseInt(cnpj.charAt(i)) * valida[i];
    dig2 += parseInt(cnpj.charAt(i)) * valida[i + 1];
  }

  dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
  dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

  if (parseInt(cnpj.charAt(12) + cnpj.charAt(13)) !== (dig1 * 10 + dig2)) {
    mostrarMensagem("CNPJ inválido");
  } else {
    ocultarMensagem();
  }
}

function mostrarMensagem(mensagem) {
  document.getElementById('cpfCnpjInva').innerHTML = mensagem;
  setTimeout(function () {
    ocultarMensagem();
  }, 2000);
}

function ocultarMensagem() {
  document.getElementById('cpfCnpjInva').innerHTML = "";
}

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