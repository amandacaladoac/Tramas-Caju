/* carrinho*/

let carrinhoIcon = document.querySelector("#carrinhoicon");
let carrinho = document.querySelector(".carrinho");
let fechaCarrinho = document.querySelector("#fecha-carrinho");

carrinhoIcon.onclick = () => {
    carrinho.classList.add("active");
};

fechaCarrinho.onclick = () => {
    carrinho.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready() {
    var removerCarrinhoButtons = document.getElementsByClassName("carrinho-remove");
    console.log(removerCarrinhoButtons);
    for (var i = 0; i < removerCarrinhoButtons.length; i++) {
        var button = removerCarrinhoButtons[i];
        button.addEventListener("click", removerCarrinhoItem);
    }
    var quantityInputs = document.getElementsByClassName("carrinho-quantidade");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }

    // adicionar no carrinho

    var addCarrinho = document.getElementsByClassName("add-carrinho");
    for (var i = 0; i < addCarrinho.length; i++) {
        var button = addCarrinho[i];
        button.addEventListener("click", addCarrinhoClicked);
    }
     //botão de comprar
     document.getElementsByClassName("btn-comprar")[0].addEventListener("click", botaocomprar);
}

function botaocomprar(){
    alert("Compra feita com Sucesso")
    var carrinhoConteudo = document.getElementsByClassName("carrinho-conteudo")[0]
    while (carrinhoConteudo.hasChildNodes()){
        carrinhoConteudo.removeChild(carrinhoConteudo.firstChild);
    }
    updatetotal();
}



// remover itens do carrinnho
function removerCarrinhoItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//mudanças de quantidade 
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//add carrinho
function addCarrinhoClicked(event) {
    var button = event.target
    var shopProdutos = button.parentElement
    var title = shopProdutos.getElementsByClassName("produto-titulo")[0].innerText;
    var price = shopProdutos.getElementsByClassName("price")[0].innerText;
    var produtoImg = shopProdutos.getElementsByClassName("produto-img")[0].src;
    addProdutonoCarrinho(title, price, produtoImg);
    updatetotal();
}
function addProdutonoCarrinho(title, price, produtoImg) {
    var sacolaShop = document.createElement("div");
    sacolaShop.classList.add("caixa");
    var carrinhoItens = document.getElementsByClassName("carrinho-conteudo")[0];
    var carrinhoItensNomes = carrinhoItens.getElementsByClassName("carrinho-produto-titulo");
    for (var i = 0; i < carrinhoItensNomes.length; i++) {



    }
    var conteudocarrinho = `
    <div class="caixa-carrinho">
                    <img src="${produtoImg}" alt="" class="carrinho-img">
                    <div class="detalhe-caixa">
                      <div class="carrinho-produto-titulo">${title}</div>
                      <div class="carrinho-numero">${price}</div>
                      <input type="number" value="1" class="carrinho-quantidade">
                    </div>
                    <img src="img/lata-de-lixo.png" alt="lixo" class="carrinho-remove">
                  </div>`;
    sacolaShop.innerHTML = conteudocarrinho;
    carrinhoItens.append(sacolaShop);
    sacolaShop.getElementsByClassName("carrinho-remove")[0].addEventListener("click", removerCarrinhoItem);
    sacolaShop.getElementsByClassName("carrinho-quantidade")[0].addEventListener("change", quantityChanged);
}


// update total
function updatetotal() {
    var carrinhoConteudo = document.getElementsByClassName("carrinho-conteudo")[0];
    var carrinhoCaixas = carrinhoConteudo.getElementsByClassName("caixa-carrinho");
    var total = 0;
    for (var i = 0; i < carrinhoCaixas.length; i++) {
        var carrinhoCaixa = carrinhoCaixas[i];
        var priceElement = carrinhoCaixa.getElementsByClassName("carrinho-numero")[0];
        var quantityElement = carrinhoCaixa.getElementsByClassName("carrinho-quantidade")[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }   
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "R$" + total;

}


