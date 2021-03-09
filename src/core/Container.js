import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
`;

export default Container;
