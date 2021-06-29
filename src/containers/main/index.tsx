import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import useMedia from 'use-media';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { MainLayout } from '../../layout';
import { Button, SearchBox, TableDataRow, TableHeaderRow } from '../../components';
import { useGetCharacters, useGetPeoplePageInfo } from '../../hooks';
import { ICharacter } from '../../types/character';
import { favoriteItemsVar } from '../../cache';
import { COUNTS_PER_PAGE, paths } from '../../constants';

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;

  .pagination {
    margin: 3em auto;
    display: flex;
    list-style: none;
    outline: none;
  }
  .pagination > .active > a {
    background-color: ${({ theme }) => theme.color.copper_coin};
    border-color: ${({ theme }) => theme.color.copper_coin};
    color: ${({ theme }) => theme.color.white};
  }
  .pagination > li > a {
    border: 1px solid ${({ theme }) => theme.color.copper_coin};
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    background-color: ${({ theme }) => theme.color.copper_coin};
    border-color: ${({ theme }) => theme.color.copper_coin};
    outline: none;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: ${({ theme }) => theme.color.copper_coin};
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Table = styled.table`
  border: 1px solid #ddd;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const TB_ROW_DATA = ['name', 'birth year', 'gender', 'home world', 'species', 'favorite'];

const MainPage = () => {
  const isMobile = useMedia({ maxWidth: 768 });
  const [currentPageInfo, setCurrentPageInfo] = useState({
    curNum: 0,
    curCursor: '',
  });
  const { totalPages, totalCursors } = useGetPeoplePageInfo();
  const characters = useGetCharacters(COUNTS_PER_PAGE, currentPageInfo.curCursor);
  const [filterName, setFilterName] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const favoriteItems = useReactiveVar(favoriteItemsVar);

  const handleNameChange = (name: string) => {
    setFilterName(name);
  };

  const handleSortName = (key: string) => {
    if (key === 'name') {
      setIsAscending(!isAscending);
    }
  };

  const handleFavorite = (id: string) => {
    const favoriteCharacters = favoriteItems ? JSON.parse(favoriteItems) : [];

    if (_.includes(favoriteCharacters, id)) {
      const removed = favoriteCharacters.filter(
        (character: string) => character !== id,
      ) as string[];
      localStorage.setItem('FAVORITE', JSON.stringify(removed));
      favoriteItemsVar(JSON.stringify(removed));
    } else {
      const added = [...favoriteCharacters, id];
      localStorage.setItem('FAVORITE', JSON.stringify(added));
      favoriteItemsVar(JSON.stringify(added));
    }
  };

  const filteredChars = characters?.filter((char) => {
    return char.name.toUpperCase().includes(filterName.toUpperCase());
  }) as ICharacter[];

  let orderedChars = [];

  if (isAscending) {
    orderedChars = _.orderBy(filteredChars, ['name'], ['asc']);
  } else {
    orderedChars = _.orderBy(filteredChars, ['name'], ['desc']);
  }

  const handlePageClick = (e: any) => {
    if (totalCursors?.length > 0)
      setCurrentPageInfo({
        curNum: e.selected + 1,
        curCursor: totalCursors[e.selected * COUNTS_PER_PAGE - 1]?.cursor,
      });
  };

  return (
    <MainLayout>
      <>
        <h1>Main Page</h1>
        <HeaderWrapper>
          <h2>
            Please sort, search table by character name and hit ❤ to like characters in this page
          </h2>
          <StyledLink to={paths.favorite}>
            <Button text={'Goto Favorite'} />
          </StyledLink>
        </HeaderWrapper>
        <StyledMainPage>
          <SearchBox handleNameChange={handleNameChange} />
          <Table>
            <TableHeaderRow
              isAscending={isAscending}
              data={TB_ROW_DATA}
              handleSortName={handleSortName}
            ></TableHeaderRow>
            {orderedChars &&
              orderedChars.map((item, index) => (
                <TableDataRow
                  key={index}
                  character={item}
                  handleFavorite={handleFavorite}
                  isFavorite={item.isFavorite}
                />
              ))}
          </Table>
          {totalCursors !== null && (
            <ReactPaginate
              initialPage={currentPageInfo.curNum}
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={isMobile ? '' : '...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              marginPagesDisplayed={isMobile ? 0 : 2}
              pageRangeDisplayed={isMobile ? 2 : 5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          )}
        </StyledMainPage>
      </>
    </MainLayout>
  );
};

export default MainPage;
