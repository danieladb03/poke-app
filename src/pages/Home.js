import Container from '../core/Container';
import Header from '../core/Header';
import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <Container flexDirection="column">
        <Header>contenido</Header>
        <Container>hoal</Container>
      </Container>
    </Layout>
  );
};

export default Home;
