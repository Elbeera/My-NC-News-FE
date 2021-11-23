import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
  background-color: #eb1717;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  text-decoration: none;
`;

const ProfileImage = styled.img`
  width: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Greeting = styled.p`
  font-weight: bold;
`;

const Header = ({ user, setUser }) => {
  return (
    <Section>
      <Link to="/">
        <Title>NC News</Title>
      </Link>
      {user && (
        <>
          <Greeting>Welcome {user.users[0].name}!</Greeting>{" "}
          <ProfileImage src={user.users[0].avatar_url} alt="users profile" />{" "}
          <br />
        </>
      )}
      {user && (
        <button
          onClick={() => {
            setUser("");
          }}
        >
          Sign Out
        </button>
      )}
    </Section>
  );
};

export default Header;
