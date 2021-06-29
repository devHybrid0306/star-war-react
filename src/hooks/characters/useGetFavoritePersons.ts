import { gql, useQuery } from '@apollo/client';
import { ICharacter } from '../../types/character';

const GET_FAVORITE_PERSONS = gql`
  query GetFavoritePersons {
    allPeople {
      people {
        id
        name
        birthYear
        gender
        homeworld {
          name
        }
        species {
          name
        }
        isFavorite @client
      }
    }
  }
`;

export const useGetFavoritePersons = (): ICharacter[] | undefined => {
  const { data } = useQuery(GET_FAVORITE_PERSONS, {
    fetchPolicy: 'cache-and-network',
  });

  return data?.allPeople?.people?.filter(({ isFavorite }: ICharacter) => isFavorite);
};
