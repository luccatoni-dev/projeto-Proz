// Função para aumentar a quantidade
function increaseQuantity(button) {
    const input = button.previousElementSibling;
    let quantity = parseInt(input.value);
    input.value = quantity + 1;
}

// Função para diminuir a quantidade
function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    let quantity = parseInt(input.value);
    if (quantity > 1) {
        input.value = quantity - 1;
    }
}

// Função para simular a compra (mudança de cor no botão)
function simulateBuy(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300); // Mantém o botão verde por 300ms
}

let cart = [];
let totalPrice = 0;

// Função para abrir e fechar o carrinho
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar.style.width === '300px') {
        cartSidebar.style.width = '0';
    } else {
        cartSidebar.style.width = '300px';
    }
}

// Função para adicionar produtos ao carrinho
function buyProduct(button) {
    const item = button.closest('.item'); // Encontra o elemento mais próximo com a classe "item"
    const name = item.querySelector('p').innerText; // Nome do item
    const price = parseFloat(item.querySelector('.preco').innerText.replace('R$ ', '').replace(',', '.')); // Preço do item
    let quantity = parseInt(item.querySelector('input').value); // Captura a quantidade diretamente do input dentro do item

    // Verifica se o produto já está no carrinho
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    updateCart();
    simulateBuy(button); // Chama a função para mudar a cor do botão
}


// Atualiza o carrinho com novos itens
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemCount = document.getElementById('cart-item-count');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItemsContainer.innerHTML = '';
    totalPrice = 0; // Reinicia o total

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; // Calcula o total corretamente
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
    });

    cartItemCount.innerText = `${cart.length} Items`;
    totalPriceElement.innerText = totalPrice.toFixed(2); // Atualiza o total no carrinho
}

// Função para alterar a quantidade dos produtos no carrinho
function changeQuantity(name, amount) {
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }
    updateCart();
}
