interface IHomeworld {
  name: string;
}

interface ISpecies {
  name: string;
}

interface IEdges {
  cursor: string;
}

export interface ICharacter {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  homeworld: IHomeworld;
  species: ISpecies;
  isFavorite: boolean;
}
