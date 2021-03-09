import Container from "../core/Container"
import SideBar from "../core/SideBar"
import Header from "../core/Header"
import Layout from './Layout'

const Home = () => {
    return <Layout>
        <Container flexDirection='column'>
            <Header>contenido</Header>
            <Container>hoal</Container>
        </Container>
    </Layout>
}

export default Home
