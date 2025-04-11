// URL base da API (substitua pela URL correta da sua API quando o professor fornecer)
const API_URL = "http://seu-servidor.com/api/livros"; // INSIRA AQUI A ROTA DA API

// Função para carregar os livros da API
async function loadBooks() {
  try {
    // Faz a requisição GET para buscar os livros no banco
    const response = await fetch(API_URL); // ALTERE AQUI PARA A ROTA CORRETA DA API
    const books = await response.json(); // Resposta JSON contendo os livros

    // Seleciona o container onde os livros serão exibidos
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = ""; // Limpa o conteúdo existente

    // Adiciona cada livro como uma caixa
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      // Estrutura do livro com as informações recebidas
      bookCard.innerHTML = `
        <h3>${book.nome}</h3> <!-- Nome do livro retornado pelo banco -->
        <p><strong>Autor:</strong> ${book.autor}</p> <!-- Autor do livro -->
        <p><strong>Gênero:</strong> ${book.genero}</p> <!-- Gênero do livro -->
        <p><strong>Sinopse:</strong> ${book.sinopse}</p> <!-- Sinopse do livro -->
      `;

      booksList.appendChild(bookCard); // Adiciona o card ao DOM
    });
  } catch (error) {
    console.error("Erro ao carregar os livros:", error); // Loga o erro, caso ocorra
  }
}

// Função para cadastrar um novo livro
async function addBook(event) {
  event.preventDefault(); // Evita o recarregamento da página

  // Captura os valores do formulário
  const name = document.getElementById("book-name").value; // Valor do campo "nome"
  const author = document.getElementById("book-author").value; // Valor do campo "autor"
  const genre = document.getElementById("book-genre").value; // Valor do campo "gênero"
  const synopsis = document.getElementById("book-synopsis").value; // Valor do campo "sinopse"

  // Cria o objeto do livro para enviar ao banco
  const newBook = {
    nome: name, // Nome do livro
    autor: author, // Autor
    genero: genre, // Gênero
    sinopse: synopsis, // Sinopse
  };

  try {
    // Faz a requisição POST para cadastrar o livro no banco
    const response = await fetch(API_URL, {
      method: "POST", // Método HTTP POST
      headers: {
        "Content-Type": "application/json", // Define que o conteúdo é JSON
      },
      body: JSON.stringify(newBook), // Converte o objeto para JSON
    });

    if (response.ok) {
      // Limpa o formulário após o sucesso
      document.getElementById("book-form").reset();

      // Recarrega a lista de livros para refletir a adição
      loadBooks();
    } else {
      console.error("Erro ao cadastrar o livro:", response.statusText); // Loga o erro, se houver
    }
  } catch (error) {
    console.error("Erro ao cadastrar o livro:", error); // Loga o erro de conexão
  }
}

// Inicializa as funções
document.addEventListener("DOMContentLoaded", () => {
  // Carrega os livros ao abrir a página
  loadBooks(); // Faz a requisição GET

  // Adiciona o evento de submissão ao formulário
  document.getElementById("book-form").addEventListener("submit", addBook);
});
