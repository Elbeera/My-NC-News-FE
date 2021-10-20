import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "../context/User";
import { useContext } from "react";

const Section = styled.section`
  background-color: lightgreen;
  height: 800px;
  text-align: center;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const Sub = styled.p`
  text-align: center;
  margin-top: 500px;
  font-weight: bold;
`;

const HomePage = () => {
  const [ourUsers, setOurUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const { setUser } = useContext(UserContext);

  function signIn(e) {
    e.preventDefault();
    const form = e.target;
    const userToAdd = form.signIn.value;
    console.log(userToAdd);
    console.log(ourUsers);
    const checkUser = ourUsers.users.filter((user) => {
      return user.username === userToAdd;
    });
    if (checkUser.length !== 0) {
      setUser(checkUser[0].username);
    }
  }

  useEffect(() => {
    getUsers()
      .then((usersFromApi) => {
        setOurUsers(usersFromApi);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  return (
    <>
      <Section>
        <Header />
        <h2>Please Sign In Below! </h2>
        <form action="" onSubmit={signIn}>
          <label htmlFor="signIn">Username: </label>
          <input
            type="text"
            required
            name="signIn"
            value={newUser}
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
          />
          <Button type="submit">Log in</Button>
        </form>
        <Sub>Thank you for visiting our webpage!</Sub>
      </Section>
      <Footer />
    </>
  );
};

export default HomePage;
