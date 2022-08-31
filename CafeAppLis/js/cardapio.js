// Importa o codigo js de outros arquivos.
import itens from './model/dataset.js';
import foodsModel from './model/foods.js';

// Carrega os itens do arquivo dataset.js
foodsModel.load(itens);


// Declarou uma nova váriavel e atribuiu uma função importada do arquivo foods.js, que irá transformar o foodsModel anteriormente carregado transformando-o em um objeto
let foods = foodsModel.readAll();

//Função que inicia os cards no arquivo cardapio.html
function initFoodsCard () {
  
  //percorre os itens armazenados na variável foods
  for (let item of foods) {

    //Atribuição da variável para criação de um novo item do cardapio 
    const view = createFoodCardItem(item);
  
    //let itensCardapio = document.querySelector('.itens-cardapio');
    //Selecionou uma div no cardapio.html pelo seu id e a atribuiu a uma váriavel
    let itensCardapio = document.getElementById("itens-cardapio");
    //Insere na div selecionada no parâmetro anterior o card criado pela função createFoodCardItem
    itensCardapio.insertAdjacentHTML('beforeend', view);
  }
}

//Função que cria novos cards
function createFoodCardItem (item) {

    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${item.imagem}" class="card-img-top" alt="...">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.nome}</h5>
                      <p class="card-text">${item.descricao}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;
    //Retorna a estrutura desenvolvida no html
    return view;
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// const foodForm = document.querySelector('#foodForm');
const foodForm = document.getElementById("foodForm");
// A função atribuida captura o evento com onsubmit, inseridos nos inputs pelo modal do cardápio e adicionado pelo botão "Adiconar" do formulário modal.
// Função que captura o evento ao clicar no botão "Adiconar" no modal que cria um novo item ao cardápio 
foodForm.onsubmit = function (event) {
  // Previnir que o modal fique abrindo e fechando em loop.
  //Impede que o evento padrão ocorra
  event.preventDefault();

  // Transforma uma lista em objeto
  let newFood = Object.fromEntries(new FormData(foodForm));
  //Cria um novo card
  foodsModel.create(newFood);

  //Pega o objeto criado em newFood
  const foodCard = createFoodCardItem(newFood);
  //Pega o id da div que está no cardapio.html
  let itensCardapio = document.getElementById("itens-cardapio");
  //Adcionou o foodCard no div capturado pelo itensCardapio
  itensCardapio.insertAdjacentHTML('beforeend', foodCard);
}
//Inicia a função
initFoodsCard();
