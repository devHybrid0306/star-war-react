import React from 'react';
import styled from 'styled-components';

const FilterName = styled.input`
  color: ${({ theme }) => theme.color.black};
  font-size: 1em;
  border: 2px solid ${({ theme }) => theme.color.copper_coin};
  border-radius: 3px;
  padding: 1em;
  margin-bottom: 1em;
  width: 50%;
`;

interface ISearchBoxProps {
  handleNameChange: any;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ handleNameChange }) => {
  return (
    <FilterName
      type="text"
      onChange={(e) => handleNameChange(e.target.value)}
      placeholder={"Type a character's name"}
      autoFocus
    />
  );
};

export default SearchBox;
