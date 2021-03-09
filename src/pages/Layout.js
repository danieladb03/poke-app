import Container from "../core/Container"
import SideBar from "../core/SideBar"
import Header from "../core/Header"

const Layout = ({children}) => {
    return <Container>
        <SideBar/>   
        {children}
    </Container>
};

export default Layout
