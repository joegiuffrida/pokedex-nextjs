import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <MainContainer>{children}</MainContainer>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  background-color: hsl(240, 100%, 91.2%);
`;

const MainContainer = styled.main`
  margin: 0 auto;
  width: 80%;
  min-height: 100vh;
`;

export default Layout;
