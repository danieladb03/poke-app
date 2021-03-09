import Container from '../core/Container';
import SideBar from '../core/SideBar';

const Layout = ({children}) => {
  return (
    <Container>
      <SideBar />
      {children}
    </Container>
  );
};

export default Layout;
