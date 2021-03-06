import Container from "../core/Container"
import SideBar from "../core/SideBar"
import Header from "../core/Header"

const Home = () => {
    return <Container>
        <SideBar>
            Buenas
        </SideBar>
        <Container flexDirection='column'>
            <Header>contenido</Header>
            <Container>hoal</Container>
        </Container>
    </Container>
}

export default Home
