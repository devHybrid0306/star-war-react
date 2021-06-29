import { InMemoryCache, makeVar } from '@apollo/client';

export const favoriteItemsVar = makeVar(localStorage.getItem('FAVORITE'));

export const cache = new InMemoryCache({
  typePolicies: {
    Person: {
      fields: {
        isFavorite: {
          read(_, { readField }) {
            const personID = readField('id') as string;
            const favoriteItems = favoriteItemsVar();
            return favoriteItems ? favoriteItems.includes(personID) : false;
          },
        },
      },
    },
  },
});
