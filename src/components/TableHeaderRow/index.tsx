import React from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const TableHRWrapper = styled.tr`
  height: 80px;
  font-size: 3vh;
  background-color: ${({ theme }) => theme.color.copper_coin};
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
`;

interface ITableHeaderRowProps {
  data: string[];
  handleSortName?: any;
  isAscending?: boolean;
}

const TableHeaderRow: React.FC<ITableHeaderRowProps> = ({ isAscending, data, handleSortName }) => {
  return (
    <TableHRWrapper data-testId="Table-HR-Wrapper">
      {data.map((item, index) => (
        <th key={index} onClick={() => handleSortName?.(item)}>
          {item}
          {handleSortName && (
            <>{index === 0 ? isAscending ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : null}</>
          )}
        </th>
      ))}
    </TableHRWrapper>
  );
};

export default TableHeaderRow;
