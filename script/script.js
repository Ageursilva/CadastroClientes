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

function VericaNumero(numero) {
    if (isNaN(numero.value)) {
      document.getElementById("cpfCnpj").value = "";
    }
  }
  
  function validaCampo(obj) {
    var object = obj.value;
    if (object.length <= 11) {
      ValidarCPF(obj)
    } else {
      ValidarCNPJ(obj)
    }
  }
  //valida o CPF digitado
  function ValidarCPF(Objcpf) {
    var cpf = Objcpf.value;
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
      soma2 = 0;
    var vlr = 11;
  
    for (i = 0; i < 9; i++) {
      soma1 += eval(cpf.charAt(i) * (vlr - 1));
      soma2 += eval(cpf.charAt(i) * vlr);
      vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
  
    var digitoGerado = (soma1 * 10) + soma2;
    if (digitoGerado != digitoDigitado) {
        document.getElementById('cpfCnpjInva').innerHTML = "CPF ou CNPJ inválido";
        setTimeout(function() {
          document.getElementById('cpfCnpjInva').innerHTML = '';
        }, 2000);
    } else {
      document.getElementById("cpfCnpjInva").innerHTML = "";     
    }
  }
  //valida o CNPJ digitado
  function ValidarCNPJ(ObjCnpj) {
    var cnpj = ObjCnpj.value;
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1 = new Number;
    var dig2 = new Number;
  
    exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));
  
    for (i = 0; i < valida.length; i++) {
      dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
      dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
  
    if (((dig1 * 10) + dig2) != digito) {
        document.getElementById('cpfCnpjInva').innerHTML = "CPF ou CNPJ inválido";
        setTimeout(function() {
          document.getElementById('cpfCnpjInva').innerHTML = '';
        }, 2000);
    } else {
      document.getElementById("msg").innerHTML = "";
      document.getElementById("validacampo").style.border = "solid 1px #000"
  
    }
  
  }
  


function gerarJSON(event) {
event.preventDefault();
const form = document.querySelector('.cadastro');
const json = {
nome: form.name.value,
sobrenome: form.surname.value,
cpfCnpj:form.cpfCnpj.value,
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
setTimeout(function() {
document.getElementById('CadastroRealizado').innerHTML = '';
}, 2000);

}


$(document).ready(function() {
    $('#Form').on('submit', function(e) {
      e.preventDefault(); // impede o envio padrão do formulário
  
      // Crie o iframe e defina seus atributos
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'http://www.globo.com');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '500');
      iframe.setAttribute('frameborder', '0');
  
      // Crie o botão de fechar e defina seus atributos
      var closeButton = document.createElement('button');
      closeButton.innerHTML = 'Fechar';
      closeButton.style.cssText = 'position: absolute; top: 0; right: 0;';
  
      // Adicione o botão de fechar e o iframe ao contêiner na página
      $('#iframeContainer').append(closeButton);
      $('#iframeContainer').append(iframe);
  
      // Adicione um evento de clique ao botão de fechar
      closeButton.addEventListener('click', function() {
        $('#iframeContainer').empty();
      });
    });
  });

