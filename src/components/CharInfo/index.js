import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container'
import styles from './styles.scss';


const CharInfo = (props) => {
	const { birth_year, eye_color, films, gender, hair_color, height,
			homeworld, imageUrl, mass, skin_color, species, starships, vehicles } = props;

	const imageStyles = {
		display: 'inline-block',
		float: 'left',
		backgroundImage: `url(${imageUrl})`,
		backgroundSize: '150px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '150px',
		width: '150px',
		margin: '0 1rem 1rem 0'
	};

	let hasHomeworld = homeworld.name;
	let hasFilms = true;
	let hasSpecies = true;
	let hasStarships = true;
	let hasVehicles = true;

	if (species.length < 1) {
		hasSpecies = false;
	} else {
		species.every(specie => {
			if (!specie.name) {
				hasSpecies = false;

				return false
			}
		})
	}

	if (films.length < 1) {
		hasFilms = false;
	} else {
		films.every(film => {
			if (!film.title) {
				hasFilms = false;

				return false
			}
		})
	}

	if (starships.length < 1) {
		hasStarships = false;
	} else {
		starships.every(starship => {
			if (!starship.name) {
				hasStarships = false;

				return false
			}
		})
	}

	if (vehicles.length < 1) {
		hasVehicles = false;
	} else {
		vehicles.every(vehicle => {
			if (!vehicle.name) {
				hasVehicles = false;

				return false
			}
		})
	}

	return (
		<div className={styles.charInfoWrapper}>
			<div className={styles.top}>
				Detalhes!
			</div>
			
			<div>Teste</div>

			<div className={styles.charInfo}>
				<div className={styles.image} style={imageStyles}>
				</div>
				{
					hasSpecies &&
						<div>
							Espécie: {
								species.map((specie, i) => (
									`${specie.name}${i + 1 < species.length ? ', ' : '.'}`
								))
							}
						</div>
				}
				<div>
					Altura: {height}
				</div>
				<div>
					Cor do Cabelo: {hair_color}
				</div>
				{
					hasHomeworld &&
						<div>
							Planeta: {homeworld.name}
						</div>
				}
				<div>
					Ano de Nascimento: {birth_year}
				</div>
				<div>
					Cor dos Olhos: {eye_color}
				</div>
				<div>
					Sexo: {gender}
				</div>
				<div>
					Peso: {mass}
				</div>
				<div>
					Cor da Pele: {skin_color}
				</div>
				{
					hasFilms &&
						<div>
							Filmes: {
								films.map((film, i) => (
									`${film.title}${i + 1 < films.length ? ', ' : '.'}`
								))
							}
						</div>
				}
				{
					hasStarships &&
						<div>
							Naves: {
								starships.map((starship, i) => (
									`${starship.name}${i + 1 < starships.length ? ', ' : '.'}`
								))
							}
						</div>
				}
				{
					hasVehicles &&
						<div>
							Veículos: {
								vehicles.map((vehicle, i) => (
									`${vehicle.name}${i + 1 < vehicles.length ? ', ' : '.'}`
								))
							}
						</div>
				}
			</div>
		</div>
	);
}

CharInfo.propTypes ={
	birth_year: PropTypes.string,
	eye_color: PropTypes.string,
	films: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string
		})),
	]),
	gender: PropTypes.string,
	hair_color: PropTypes.string,
	height: PropTypes.string,
	homeworld: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			name: PropTypes.string
		}),
	]),
	imageUrl: PropTypes.string,
	mass: PropTypes.string,
	skin_color: PropTypes.string,
	species: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string
		})),
	]),
	starships: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string
		})),
	]),
	vehicles: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string
		})),
	])
};

export default Container(CharInfo);
