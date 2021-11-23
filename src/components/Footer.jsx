import styled from "styled-components";

const Section = styled.section`
  background-color: #eb1717;
  height: 50px;
  text-align: center;
`;

const Copyright = styled.h2`
  margin: initial;
  color: white;
  font-size: 20px;
  font-weight: 150;
`;

const Footer = () => {
  return (
    <Section>
      <Copyright>Copyright</Copyright>
    </Section>
  );
};

export default Footer;
