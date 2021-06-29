import { gql, useQuery } from '@apollo/client';
import { ICharacter } from '../../types/character';

const GET_CHARACTERS = gql`
  query GetCharacters($first: Int!, $after: String) {
    allPeople(first: $first, after: $after) {
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

export const useGetCharacters = (
  countsPage: number,
  cursorFirst: string,
): ICharacter[] | undefined => {
  const { data } = useQuery(GET_CHARACTERS, {
    variables: { first: countsPage, after: cursorFirst },
    fetchPolicy: 'cache-and-network',
  });

  return data?.allPeople?.people;
};
