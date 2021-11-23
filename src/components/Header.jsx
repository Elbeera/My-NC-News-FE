import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Section = styled.section`
  display: flex;
  flex-direction: columns;
  background-color: #eb1717;
  padding: 1px;
`;

const Divone = styled.div`
  margin-left: 45%;
`;

const Divtwo = styled.div`
  margin-left: 400px;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: white;
`;

const ProfileImage = styled.img`
  width: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Greeting = styled.p`
  color: #ede8e8;
  font-weight: bold;
`;

const Header = ({ user, setUser }) => {
  return (
    <Section>
      <Divone>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>NC News</Title>
        </Link>
        {user && (
          <>
            <Greeting>Welcome {user.users[0].name}!</Greeting> <br />
          </>
        )}
      </Divone>
      <Divtwo>
        {user && (
          <>
            <ProfileImage
              style={{ marginTop: "10px" }}
              src={user.users[0].avatar_url}
              alt="users profile"
            />{" "}
            <br />
            <Button
              style={{
                height: "30px",
                color: "#eb1717",
                backgroundColor: "#ede8e8",
              }}
              onClick={() => {
                setUser("");
              }}
              variant="contained"
            >
              Sign Out
            </Button>
          </>
        )}
      </Divtwo>
    </Section>
  );
};

export default Header;
