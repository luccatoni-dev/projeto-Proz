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

// Função para simular a compra
function buyProduct(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300); // Mantém o botão verde por 300ms
}