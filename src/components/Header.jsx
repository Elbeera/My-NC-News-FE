import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  background-color: lightblue;
  padding: 20px;
  margin: 5px 0px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Header = () => {
  return (
    <Section>
      <Link to="/">
        <Title>NorthCoder's News!</Title>
      </Link>
    </Section>
  );
};

export default Header;
