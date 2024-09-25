// firebase.js
// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBePL-s9584Awcc0Eeih99UR4I70vJ2Nmo",
    authDomain: "carrinhocompras-b6af5.firebaseapp.com",
    projectId: "carrinhocompras-b6af5",
    storageBucket: "carrinhocompras-b6af5.appspot.com",
    messagingSenderId: "969767267613",
    appId: "1:969767267613:web:c427b5823214aae51805f4"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Função para salvar o carrinho de compras
function saveCart(userId) {
    const cartRef = database.ref(`carrinhos/${userId}`);
    cartRef.set({
        itens: cart
    }).then(() => {
        console.log("Carrinho salvo com sucesso!");
    }).catch(error => {
        console.error("Erro ao salvar carrinho:", error);
    });
}

// Função para carregar o carrinho de compras
function loadCart(userId) {
    const cartRef = database.ref(`carrinhos/${userId}`);
    cartRef.once('value')
        .then(snapshot => {
            const data = snapshot.val();
            if (data && data.itens) {
                cart = data.itens; // Carrega os itens no carrinho
                updateCart(); // Atualiza a interface do carrinho
                console.log("Carrinho carregado com sucesso!");
            } else {
                console.log("Carrinho vazio.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar carrinho:", error);
        });
}