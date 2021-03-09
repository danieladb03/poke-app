import styled from 'styled-components';
import {H1, Subtitle} from './typography';
import profileImg from '../assets/profile.png';
import Container from './Container';

const Wrapper = styled(Container)`
background: #FF3D67;
width: 298px;
height: 100vh;
`;

const Name = styled.p`
font-size: 18px;
color: #FFFFFF;
margin: 6px 0;
`;

const ProfileImage = styled.img`
width: 155px;
height: 155px;
border-radius: 50%;
margin: 16px 0;
`;

const SideBar = () => (
<Wrapper flexDirection='column' alignItems='center'>
    <H1 color='#FFFFFF' margin='16px 0'>Poke</H1>
    <ProfileImage src={profileImg}></ProfileImage>
    <Name>Daniela DB</Name>
    <Subtitle color='#FFFFFF'>Poke Master</Subtitle>
    <Subtitle color='#FFFFFF' margin='12px 0'>Lvl 25</Subtitle>
</Wrapper>
);

export default SideBar;
