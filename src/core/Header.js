import styled from "styled-components";
import Container from "../core/Container";

const Header = styled.header`
  background: #ffffff;
  position: fixed;
  width: calc(100% - 298px);
  height: 55px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;

  ${Container} {
    flex: none;
    width: 50%;
    padding-right: 10px;

    input {
      outline: none;
      border: 0px;
      border-bottom: 1px solid #c3bfbf;
      line-height: 30px;
    }

    span {
      padding-left: 8px;
      margin-right: 50px;
      color: #c3bfbf;
    }
  }
`;

export default Header;
