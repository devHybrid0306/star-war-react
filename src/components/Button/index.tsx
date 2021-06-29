import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: auto;
  height: 50px;
  background-color: ${({ theme }) => theme.color.copper_coin};
  color: ${({ theme }) => theme.color.white};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${({ theme }) => theme.color.copper_coin};
  border-radius: 3px;
`;

interface IButtonProps {
  text: string;
}

const Button: React.FC<IButtonProps> = ({ text }) => {
  return <StyledButton>{text}</StyledButton>;
};

export default Button;
