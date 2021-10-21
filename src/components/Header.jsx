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

const ProfileImage = styled.img`
  width: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Header = ({ user, setUser }) => {
  return (
    <Section>
      <Link to="/">
        <Title>NorthCoder's News!</Title>
      </Link>
      {user && (
        <>
          <p>Welcome {user.users[0].username}!</p>{" "}
          <ProfileImage src={user.users[0].avatar_url} alt="users profile" />{" "}
          <br />
        </>
      )}
      {user && (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Sign Out
        </button>
      )}
    </Section>
  );
};

export default Header;
