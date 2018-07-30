# StarWars Quiz - Bruno Lucena

StarWars Quiz, feito por Bruno Lucena para o desafio Front-End da S2IT.

## Resumo do projeto
O desenvolvimento do projeto foi baseado nas informações enviadas por pdf no arquivo StarQuiz.pdf.

O maior desafio do projeto foi como tratar as informações vindas da API, para que o jogador pudesse ter acesso rápido as informações necessárias para o jogo sem sobrecarregar as requisições a API.

Ao carregar um jogo, todas as páginas da API são carregadas. Essa decisão foi tomada para que, mesmo que o jogo demore um pouco mais para iniciar, uma vez que ele inicie, o jogador já possua todas as páginas para responder.

Além disso, carregar as páginas previamente permitiu que fosse possível randomizar os jogos, para que nenhum fosse igual a outro.

O jogo foi desenvolvido para ser customizável. Informações como: quantidade de itens por página, pontos por uma resposta certa, pontos por uma resposta certa tendo usado as dicas, pontos por uma resposta parcialmente certa, tempo limite, dentre outros, são facilmente customizáveis através de variáveis.

Os únicos dados que são carregados somente quando requisitados são as dicas de um personagem. No entanto, esses dados são carregados dinamicamente e bem rápidos, não influenciando no andamento do jogo.

O jogo foi pensado para ter um histórico de jogos para exibir um ranking e para que o jogador possa resumir um jogo não finalizado dentro do tempo limite.

Mesmo que o jogador volte fora do tempo limite, ele ainda terá a opção de salvar seus dados com a pontuação realizada.

## Resumo técnico
Cada componente foi separado utilizando-se o conceito de Container/Presentation, onde o Container (Container.js) trata os dados que serão exibidos e o Presentation (index.js) trata como esses dados serão exibidos, a parte visual. Desta forma, a maneira como cada componente trata seus dados pode facilmente ser modificada. Um exemplo seria colocando um flux para tratar os dados.

Cada componente possui uma documentação nos PropTypes, tanto os Containers como os Index.js. Dessa maneira, fica fácil visualizar o que cada componente espera receber e exibir.

Além disso, cada componente possui docstrings apropriadas quando necessárias no componente e em seus métodos.

Foi utilizado css modules para encapsular cada componente para que ele possua todas as informações que ele precisa para funcionar.

Os dados do jogo são salvos no state dos componentes e quando necessário no localStorage.

As imagens do jogo são salvas em uma pasta apropriada e exportadas como um objeto, onde cada atributo desse objeto é um array contendo as imagens disponíveis para cada personagem. Dessa forma, um mesmo personagem pode ter diversas imagens exibidas em diferentes jogos.

Não foi utilizado integração com uma API de imagens devido a limitação de busca e/ou preço das API's disponíves.

O projeto foi iniciado usando-se o [react-create-app](https://github.com/facebook/create-react-app)

## Getting Started

Esse arquivo possui uma visão geral do projeto, bem como instruções para rodá-lo localmente.

### Prerequisites

O que você precisa instalar

```
Node
```

### Installing

Copie o projeto e instale os pacotes:
```npm install```

Inicie o servidor local:
```npm start```

## Deployment

```npm run build```

## Authors

* **Bruno Lucena** - (https://github.com/brunolucena)