* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0b1a2e;
    color: #f0e6d0;
    padding: 20px;
}

header {
    background-color: #1c3a5c;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 4px solid #d4a843;
}

header h1 {
    font-size: 2.8rem;
    color: #d4a843;
    letter-spacing: 2px;
}

header p {
    font-size: 1.1rem;
    font-style: italic;
    color: #c0b7a0;
}

.logo-img {
    display: block;
    margin: 0 auto 10px;
    max-width: 180px;
    border-radius: 12px;
    border: 2px solid #d4a843;
}

main {
    max-width: 1100px;
    margin: 0 auto;
}

section {
    background-color: #1e2f44;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.6);
}

h2, h3 {
    color: #d4a843;
    margin-bottom: 15px;
}

.busca-form {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.busca-form input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #d4a843;
    border-radius: 30px;
    background-color: #0b1a2e;
    color: #f0e6d0;
    font-size: 1rem;
    outline: none;
}

.busca-form input:focus {
    border-color: #e6c35c;
    box-shadow: 0 0 8px #d4a843;
}

.busca-form button {
    padding: 12px 28px;
    background-color: #d4a843;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    font-size: 1rem;
    color: #0b1a2e;
    cursor: pointer;
}

.busca-form button:hover {
    background-color: #e6c35c;
    transform: scale(1.02);
}

.lista-filmes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 15px;
}

.filme-card {
    background-color: #122b3f;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #d4a843;
    text-align: center;
}

.filme-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.5);
}

.filme-card img.poster {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 6px;
    margin-bottom: 10px;
    border: 2px solid #d4a843;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.filme-card h4 {
    color: #f0e6d0;
    font-size: 1.2rem;
    margin-bottom: 5px;
}

.filme-card p {
    font-size: 0.9rem;
    color: #b0a88a;
    margin: 4px 0;
}

.filme-card .sinopse {
    font-size: 0.85rem;
    color: #c0b7a0;
    margin-top: 8px;
}

.filme-card button {
    margin-top: 10px;
    padding: 6px 14px;
    background-color: #d4a843;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    color: #0b1a2e;
    cursor: pointer;
    font-size: 0.8rem;
}

.filme-card button:hover {
    background-color: #e6c35c;
}

.favoritos .filme-card {
    border-left-color: #e63946;
}

.recomendacao-ia {
    background-color: #0b1a2e;
    padding: 15px 20px;
    margin-top: 20px;
    border-radius: 8px;
    border: 1px solid #d4a843;
    font-style: italic;
}

.recomendacao-ia h4 {
    color: #d4a843;
    margin-bottom: 6px;
}

footer {
    text-align: center;
    margin-top: 30px;
    color: #7a8b9e;
    font-size: 0.9rem;
}
