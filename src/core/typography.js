import styled from "styled-components";

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
`;

export const Subtitle = styled.p`
  font-weight: normal;
  font-size: 16px;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  text-transform: ${(props) => props.textTransform};
`;

export const BoldSubtitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  text-transform: ${(props) => props.textTransform};
`;

export const TextContent = styled.p`
  font-weight: normal;
  font-size: 14px;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  text-transform: ${(props) => props.textTransform};
`;
