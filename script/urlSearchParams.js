    //Recupera os dados da URL
    //exemplo: ?name=Ageu&surname=Silva

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const surname = params.get('surname');
    const cpfCnpj = params.get('cpfCnpj');
    const email = params.get('email');
    const telephone = params.get('telephone');
    const cep = params.get('cep');
    const rua = params.get('rua');
    const number = params.get('number');
    const bairro = params.get('bairro');
    const cidade = params.get('cidade');
    const uf = params.get('uf');



    //Preenche os dados da URL

    document.getElementById('name').value = name || '';
    document.getElementById('surname').value = surname || '';
    document.getElementById('cpfCnpj').value = cpfCnpj || '';
    document.getElementById('email').value = email || '';
    document.getElementById('telephone').value = telephone || '';
    document.getElementById('cep').value = cep || '';
    document.getElementById('rua').value = rua || '';
    document.getElementById('number').value = number || '';
    document.getElementById('bairro').value = bairro || '';
    document.getElementById('cidade').value = cidade || '';
    document.getElementById('uf').value = uf || '';