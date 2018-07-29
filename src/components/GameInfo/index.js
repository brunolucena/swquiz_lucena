import React from 'react';

import Container from './Container'
import styles from './styles.scss';


const GameInfo = (props) => {
	return (
		<div className={styles.gameInfoWrapper}>
			<h3>Instruções</h3>
			<p>Você conhece os personagens de Star Wars?</p>
			<p>Sim? Então mostre-nos!</p>
			<p>Com esse quiz você terá oportunidade de identificar os principais personagens de Starwars, marcar pontos e se tornar um expert nesta série de filmes maravilhosa!</p>
			<h3>Como jogar</h3>
			<p>É simples! Escreva o nome do personagem que aparece na imagem.</p>
			<p>Você terá dois minutos para dar o máximo de respostas que conseguir.</p>
			<p>Cada resposta correta vale 10 pontos.</p>
			<p>Você também pode consultar os dados do personagem clickando em "Info...". Mas ATENÇÃO, uma resposta correta consultando as informações vale a metade dos pontos.</p>
			<p>Se você sair do jogo, ainda poderá retornar dentro do tempo limite.</p>
			<p>Ao final do jogo, coloque seu nome e e-mail e entre para o ranking do StarWars Quiz.</p>
		</div>
	);
}

export default Container(GameInfo);