import React from 'react';

import Container from './Container'
import styles from './styles.scss';


const CharInfo = (props) => {
	const { birth_year, eye_color, films, gender, hair_color, height,
			homeworld, imageUrl, mass, skin_color, species, starships, vehicles
	} = props;

	return (
		<div className={styles.charInfoWrapper}>
			birth_year {birth_year}
			eye_color {eye_color}
			films {
				films.map(film => (
					film.title
				))
			}
			gender {gender}
			hair_color {hair_color}
			height {height}
			homeworld {homeworld.name}
			imageUrl {imageUrl}
			mass {mass}
			skin_color {skin_color}
			species {
				species.map(specie => (
					specie.name
				))
			}
			starships {
				starships.map(starship => (
					starship.name
				))
			}
			vehicles {
				vehicles.map(vehicle => (
					vehicle.name
				))
			}
		</div>
	);
}

export default Container(CharInfo);
