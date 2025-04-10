// URL base da API (substitua pela correta se necessário)
const API_URL = "http://seu-servidor.com/api/livros";

// Função para carregar os livros da API
async function loadBooks() {
  try {
    // Faz a requisição GET
    const response = await fetch(API_URL);
    const books = await response.json();

    // Seleciona o container de livros
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = ""; // Limpa o conteúdo existente

    // Adiciona cada livro como uma caixa
    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      // Conteúdo do livro
      bookCard.innerHTML = `
        <h3>${book.nome}</h3>
        <p><strong>Autor:</strong> ${book.autor}</p>
        <p><strong>Gênero:</strong> ${book.genero}</p>
        <p><strong>Sinopse:</strong> ${book.sinopse}</p>
      `;

      booksList.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Erro ao carregar os livros:", error);
  }
}

// Função para cadastrar um novo livro
async function addBook(event) {
  event.preventDefault(); // Evita o recarregamento da página

  // Captura os valores do formulário
  const name = document.getElementById("book-name").value;
  const author = document.getElementById("book-author").value;
  const genre = document.getElementById("book-genre").value;
  const synopsis = document.getElementById("book-synopsis").value;

  // Cria o objeto do livro
  const newBook = {
    nome: name,
    autor: author,
    genero: genre,
    sinopse: synopsis,
  };

  try {
    // Faz a requisição POST
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      // Limpa o formulário após o sucesso
      document.getElementById("book-form").reset();

      // Recarrega a lista de livros
      loadBooks();
    } else {
      console.error("Erro ao cadastrar o livro:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao cadastrar o livro:", error);
  }
}

// Inicializa as funções
document.addEventListener("DOMContentLoaded", () => {
  // Carrega os livros ao abrir a página
  loadBooks();

  // Adiciona o evento ao formulário
  document.getElementById("book-form").addEventListener("submit", addBook);
});



//outro possivel

async function loadBooks() {
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = ""; // Limpa os livros anteriores antes de carregar os novos
  
    try {
      const response = await fetch("http://localhost:3000/busca");
      const books = await response.json();
      console.log(books); // Verificar no console os livros recebidos
  
      books.map((book) => addBookToPage(book)); // Adiciona cada livro ao DOM
    } catch (error) {
      console.error("Erro ao carregar livros", error); // Exibe o erro no console
    }
  }
  
  function addBookToPage(book) {
    const booksList = document.getElementById("books-list");
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
  
    bookCard.innerHTML = `
      <h3>${book.nome}</h3>
      <p><strong>Autor:</strong> ${book.autor}</p>
      <p><strong>Gênero:</strong> ${book.genero}</p>
      <p><strong>Sinopse:</strong> ${book.sinopse}</p>
    `;
  
    booksList.appendChild(bookCard);
  }
  