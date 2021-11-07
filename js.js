const formulario = document.querySelector('#formulario')
const tipo = document.querySelector('#tipo');
const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const ano = document.querySelector('#ano');
const valor = document.querySelector('#resposta');
const botao = document.querySelector('.botao');
// const url, urlmarca, urlmodelo, urlano = ""

tipo.addEventListener('change', (event) => {
        urlmarca = `https://parallelum.com.br/fipe/api/v1/${event.target.value}/marcas`
    carregarDados()
});

const carregarDados = () => {
    buscarMarcaFetchAPI()
    .then((resposta) => {
    preencherOpcoes(resposta)
    })
}

const buscarMarcaFetchAPI = async () => {
        return fetch(urlmarca)
        .then(resposta => resposta.json())
        .catch((erro) => erro)
}

const criarOpcao = ({codigo, nome}) => 
    `<option value="${codigo}">${nome}</option>`

const preencherOpcoes = (resposta) => {
    if(!resposta){
        console.log("erro")
      return 
    }else{
      const listadeMarcasHTML = resposta.map((opcao) => criarOpcao(opcao)).join('')
      marca.innerHTML = listadeMarcasHTML;
      console.log(criarOpcao(resposta[0]))
    }
}

marca.addEventListener('change', async (event) => { 
    let idmarca = event.target.value;
    urlmodelo = `${urlmarca}/${idmarca}/modelos`
    carregarDadosModelo()
})

const carregarDadosModelo = () => {
    buscarModeloFetchAPI()
    .then((resposta) => {
    console.log(resposta)
    preencherOpcoesModelo(resposta)
    })
}

const preencherOpcoesModelo = (resposta) => {
    if(!resposta){
        console.log("erro")
      return 
    }else{
        console.log(resposta);
      const listadeModelosHTML = resposta.modelos.map((opcao) => criarOpcao(opcao)).join('')
      modelo.innerHTML = listadeModelosHTML;
    }
}
const buscarModeloFetchAPI = async () => {
    return fetch(urlmodelo)
    .then(resposta => resposta.json())
    .catch((erro) => erro)
}

modelo.addEventListener('change', async (event) => { 
    let idmodelo = event.target.value;
    urlano = `${urlmodelo}/${idmodelo}/anos`
    carregarDadosAno()
})

const carregarDadosAno = () => {
    buscarAnoFetchAPI()
    .then((resposta) => {
    console.log(resposta)
    preencherOpcoesAno(resposta)
    })
}

const buscarAnoFetchAPI = async () => {
    return fetch(urlano)
    .then(resposta => resposta.json())
    .catch((erro) => erro)
}

const preencherOpcoesAno = async (resposta) => {
    if(!resposta){
        console.log("erro")
      return 
    }else{
        console.log(resposta);
        const listadeAnosHTML = resposta.map((opcao) => criarOpcao(opcao)).join('')
        ano.innerHTML = listadeAnosHTML;
    }
}

ano.addEventListener('change', async (event) => { 
    let idano = event.target.value;
    url = `${urlano}/${idano}`
    carregarDadosResposta()
})

const carregarDadosResposta = () => {
    buscarRespostaFetchAPI()
    .then((resposta) => {
    console.log(resposta)
    mostrarValor(resposta)
    })
}

const buscarRespostaFetchAPI = async () => {
    return fetch(url)
    .then(resposta => resposta.json())
    .catch((erro) => erro)
}

const mostrarValor = (resposta) => {
    if(!resposta){
        console.log("erro")
        return 
    }else
        formulario.classList.add('hide');
        valor.classList.remove('hide');

        valor.innerHTML = `
        <div class="row">
            <div class="col-sm-6">
                <p class="form-control">Valor: ${resposta.Valor}</p>
            </div>
            <div class="col-sm-6">
                <p class="form-control">Código Fipe: ${resposta.CodigoFipe}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p class="row form-control">Combustível: ${resposta.Combustivel}
                </p>
            </div>
            <div class="col-sm-6">
                <p class="row form-control">Ano: ${resposta.AnoModelo}
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <p class="row form-control">Marca: ${resposta.Marca}
                </p>
            </div>
            <div class="col-sm-6">
                <p class="row form-control">Mês de referência: ${resposta.MesReferencia}
                </p>
            </div>
        <div class="row">
            <div class="col-sm-6">
                <p class="row form-control">Modelo: ${resposta.Modelo}
                </p>
            </div>
            <div class="col-sm-6">
                <button class="btn-success botao text-center" onClick="voltar();">VOLTAR</button>
            </div>
        </div>`
} 

function voltar(){
    valor.classList.add('hide');
    formulario.classList.remove('hide')
}
