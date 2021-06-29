import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MainLayout } from '../../layout';
import { TableDataRow, TableHeaderRow, Button } from '../../components';
import { useGetFavoritePersons } from '../../hooks';
import { paths } from '../../constants';

const StyledFavoritePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  border: 1px solid #ddd;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const TB_ROW_DATA = ['name', 'birth year', 'gender', 'home world', 'species'];

const FavoritePage = () => {
  const favoritePersons = useGetFavoritePersons();

  return (
    <MainLayout>
      <>
        <h1>Favorite Page</h1>
        <HeaderWrapper>
          <h2>You can see all characters you like in this page</h2>
          <StyledLink to={paths.main}>
            <Button text={'Goto MainPage'} />
          </StyledLink>
        </HeaderWrapper>
        <StyledFavoritePage>
          <Table>
            <TableHeaderRow data={TB_ROW_DATA}></TableHeaderRow>
            {favoritePersons &&
              favoritePersons.map((item, index) => <TableDataRow key={index} character={item} />)}
          </Table>
        </StyledFavoritePage>
      </>
    </MainLayout>
  );
};

export default FavoritePage;
