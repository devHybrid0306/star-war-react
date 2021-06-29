import { gql, useQuery } from '@apollo/client';
import { COUNTS_PER_PAGE } from '../../constants';

const GET_PEOPLE_PAGE_INFO = gql`
  query GetPeoplePageInfo {
    allPeople {
      edges {
        cursor
      }
      totalCount
    }
  }
`;

export const useGetPeoplePageInfo = () => {
  const { data } = useQuery(GET_PEOPLE_PAGE_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    totalPages: Number(data?.allPeople?.totalCount / COUNTS_PER_PAGE),
    totalCursors: data?.allPeople?.edges,
  };
};
