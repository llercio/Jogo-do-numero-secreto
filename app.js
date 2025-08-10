let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

exibirMensagemInicial();

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10.");
}

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute > 10 || chute < 1) {
    exibirTextoNaTela("h1", "O número escolhido é inválido!");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10!");
  } else {
    if (chute == numeroSecreto) {
      let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
      let mensagemTentativas = `Parabéns! Você acertou o número secreto com ${tentativas} ${palavraTentativa}.`;
      exibirTextoNaTela("p", mensagemTentativas);
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      if (chute > numeroSecreto) {
        exibirTextoNaTela("p", `O número secreto é menor que ${chute}.`);
      } else if (chute < numeroSecreto) {
        exibirTextoNaTela("p", `O número secreto é maior que ${chute}.`);
      }
      tentativas++;
      limparCampo();
    }
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = Math.floor(Math.random() * numeroLimite + 1);
  let quantidadeElementosLista = listaNumerosSorteados.length;
  if (quantidadeElementosLista == 3) {
    listaNumerosSorteados = [];
  }
  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function restartGame() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
