const TMDB_API_KEY = '74e401a80f20825c84344e3e2d21274e';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const MISTRAL_API_KEY = 'Jh51F4h7TE9izbrYdXXIHUXwaQ2BiUOj';

const MOCKAPI_URL = 'https://6a355610f957779fdb3077cd.mockapi.io/favoritos';

const generoInput = document.getElementById('generoInput');
const buscarBtn = document.getElementById('buscarBtn');
const listaFilmes = document.getElementById('listaFilmes');
const recomendacaoIA = document.getElementById('recomendacaoIA');
const listaFavoritos = document.getElementById('listaFavoritos');

async function buscarFilmesPorGenero(genero) {
    try {
        const generosResponse = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`);
        const generosData = await generosResponse.json();
        const generoEncontrado = generosData.genres.find(g => g.name.toLowerCase() === genero.toLowerCase()); 

        if (!generoEncontrado) {
            return { filmes: [], erro: `Gênero "${genero}" não encontrado.` };
        }
        const filmesResponse = await fetch(
            `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${generoEncontrado.id}&language=pt-BR&sort_by=popularity.desc`
        );
        const filmesData = await filmesResponse.json();
        if (filmesData.results.length === 0) {
            return { filmes: [], erro: 'Nenhum filme encontrado para esse gênero.' };
        }
        const filmes = filmesData.results.slice(0, 10).map(f => ({
            id: f.id,
            titulo: f.title,
            ano: f.release_date ? f.release_date.split('-')[0] : 'Ano desconhecido',
            sinopse: f.overview || 'Sinopse não disponível.',
            imagem: f.poster_path ? `https://image.tmdb.org/t/p/w500${f.poster_path}` : null
        }));
        return { filmes, erro: null };
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        return { filmes: [], erro: 'Falha na comunicação com a API de filmes.' };
    }
}

function exibirFilmes(filmes, erro, container) {
    container.innerHTML = '';
    if (erro) {
        container.innerHTML = `<p style="color: #e63946;">${erro}</p>`;
        return;
    }
    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.className = 'filme-card';

        const img = document.createElement('img');
        img.className = 'poster';
        img.src = filme.imagem || 'https://via.placeholder.com/200x300?text=Sem+Imagem';
        img.alt = filme.titulo;

        const titulo = document.createElement('h4');
        titulo.textContent = `${filme.titulo} (${filme.ano})`;

        const sinopse = document.createElement('p');
        sinopse.className = 'sinopse';
        sinopse.textContent = filme.sinopse;

        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = '⭐ Salvar nos Favoritos';
        btnSalvar.addEventListener('click', () => salvarFavorito(filme));

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(sinopse);
        card.appendChild(btnSalvar);
        container.appendChild(card);
    });
}

async function salvarFavorito(filme) {
    try {
        const response = await fetch(MOCKAPI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_tmdb: filme.id,
                titulo: filme.titulo,
                ano: filme.ano,
                sinopse: filme.sinopse,
                imagem: filme.imagem
            })
        });
        if (!response.ok) throw new Error('Erro ao salvar');
        alert('Filme salvo nos favoritos!');
        carregarFavoritos();
    } catch (error) {
        console.error('Erro ao salvar favorito:', error);
        alert('Falha ao salvar favorito. Verifique a URL do MockAPI.');
    }
}

async function carregarFavoritos() {
    try {
        const response = await fetch(MOCKAPI_URL);
        if (!response.ok) throw new Error('Erro ao carregar');
        const favoritos = await response.json();
        listaFavoritos.innerHTML = '';
        if (favoritos.length === 0) {
            listaFavoritos.innerHTML = '<p style="color: #b0a88a; font-style: italic;">🌟 Você ainda não tem favoritos. Busque um filme e salve!</p>';
            return;
        }
        favoritos.forEach(fav => {
            const card = document.createElement('div');
            card.className = 'filme-card';

            const img = document.createElement('img');
            img.className = 'poster';
            img.src = fav.imagem || 'https://via.placeholder.com/200x300?text=Sem+Imagem';
            img.alt = fav.titulo;

            const titulo = document.createElement('h4');
            titulo.textContent = `${fav.titulo} (${fav.ano})`;

            const sinopse = document.createElement('p');
            sinopse.className = 'sinopse';
            sinopse.textContent = fav.sinopse;

            const btnRemover = document.createElement('button');
            btnRemover.textContent = '🗑️ Remover';
            btnRemover.style.backgroundColor = '#e63946';
            btnRemover.addEventListener('click', () => removerFavorito(fav.id));

            card.appendChild(img);
            card.appendChild(titulo);
            card.appendChild(sinopse);
            card.appendChild(btnRemover);
            listaFavoritos.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        listaFavoritos.innerHTML = '<p style="color: #e63946;">Erro ao carregar favoritos.</p>';
    }
}

async function removerFavorito(id) {
    try {
        const response = await fetch(`${MOCKAPI_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao remover');
        alert('Favorito removido!');
        carregarFavoritos();
    } catch (error) {
        console.error('Erro ao remover:', error);
        alert('Falha ao remover favorito.');
    }
}

async function obterRecomendacaoIA(genero) {
    const MISTRAL_API_KEY = 'Jh51F4h7TE9izbrYdXXIHUXwaQ2BiUOj'; 
    const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

    try {
        const prompt = `Recomende 3 filmes do gênero "${genero}" em português. Para cada filme, dê o título e uma breve justificativa (uma frase). Formate como uma lista simples.`;

        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest', 
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 300
            })
        });

        if (!response.ok) {
            
            const erroTexto = await response.text();
            console.error('Erro detalhado:', erroTexto);
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        const textoGerado = data.choices[0].message.content;
        return textoGerado;

    } catch (error) {
        console.error('Erro ao chamar Mistral:', error);
        return 'Não foi possível obter recomendações da IA no momento. Tente novamente.';
    }
}
async function buscarAction() {
    const genero = generoInput.value.trim();
    if (!genero) {
        alert('Digite um gênero!');
        return;
    }

    listaFilmes.innerHTML = '<p>Carregando filmes...</p>';
    recomendacaoIA.innerHTML = '';

    const { filmes, erro } = await buscarFilmesPorGenero(genero);
    exibirFilmes(filmes, erro, listaFilmes);

    if (filmes.length > 0) {
        const textoIA = await obterRecomendacaoIA(genero);
        recomendacaoIA.innerHTML = `<h4>💡 Recomendação da IA</h4><p>${textoIA.replace(/\n/g, '<br>')}</p>`;
    }
}

buscarBtn.addEventListener('click', buscarAction);
generoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarAction();
});

carregarFavoritos();
