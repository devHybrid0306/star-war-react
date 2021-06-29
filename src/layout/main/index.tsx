import React from 'react';
import styled from 'styled-components';

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.white};
  padding: 1em;
`;

interface IMainLayoutProps {
  children: JSX.Element;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return <MainLayoutWrapper>{children}</MainLayoutWrapper>;
};

export default MainLayout;
