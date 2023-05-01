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
  