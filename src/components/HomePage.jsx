import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";

const Section = styled.section`
  background-color: lightgreen;
  height: 90vh;
`;

const Div = styled.div`
  text-align: center;
  margin-top: 50%;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const Sub = styled.p`
  text-align: center;
  margin-top: 50px;
  font-weight: bold;
`;

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  console.log(users);

  useEffect(() => {
    getUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  function 

  return (
    <>
      <Section>
        <Header />
        <Div>
          <h2>Please Sign In Below! </h2>
          <form action="">
            <label htmlFor="signIn">Username: </label>
            <input type="text" 
            required 
            name="username" 
            value={user}
            onChange={(e) => {
                checkUser(e.target.value)
            }}
            />
            <Button type="submit">Log in</Button>
          </form>
        </Div>
        <Sub>Thank you for visiting our webpage!</Sub>
      </Section>
      <Footer />
    </>
  );
};

export default HomePage;
