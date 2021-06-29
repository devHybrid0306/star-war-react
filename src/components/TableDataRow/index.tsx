import React from 'react';
import styled from 'styled-components';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { ICharacter } from '../../types/character';

const TableDRWrapper = styled.tr`
  font-size: 3vh;
  border: 1px solid LightGrey;
  text-align: center;
  vertical-align: middle;
`;

const TableDataWrapper = styled.td`
  font-size: 3vh;
  border: 1px solid LightGrey;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 5px;
`;

interface ITableDataRowProps {
  character: ICharacter;
  handleFavorite?: any;
  isFavorite?: boolean;
}

const TableDataRow: React.FC<ITableDataRowProps> = ({ character, handleFavorite, isFavorite }) => {
  return (
    <TableDRWrapper>
      <TableDataWrapper>{character.name}</TableDataWrapper>
      <TableDataWrapper>{character.birthYear}</TableDataWrapper>
      <TableDataWrapper>{character.gender}</TableDataWrapper>
      <TableDataWrapper>{character.homeworld?.name}</TableDataWrapper>
      <TableDataWrapper>{character.species?.name}</TableDataWrapper>
      {handleFavorite && (
        <TableDataWrapper onClick={() => handleFavorite(character.id)}>
          {isFavorite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
        </TableDataWrapper>
      )}
    </TableDRWrapper>
  );
};

export default TableDataRow;
