import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { useState } from "react";
import { getUserByName } from "../utils/api";
import { UserContext } from "../context/User";
import { useContext } from "react";
import Background from "../images/NCNewsBG.jpeg";

const HomePage = () => {
  const { setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    getUserByName(newUser)
      .then((response) => {
        setUser(response);
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <>
      <Section style={{ backgroundImage: `url(${Background})` }}>
        <Header />
        <Sign>
          <h2>Please Sign In Below! </h2>

          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>

            <input
              type="text"
              required
              name="username"
              value={newUser}
              onChange={(e) => {
                setNewUser(e.target.value);
              }}
            />
            <br />
            <Button type="submit">Log in</Button>
          </form>
          {error && <p>{error.response.data.msg}</p>}
        </Sign>
        <Sub>Thank you for visiting our webpage!</Sub>
      </Section>
      <Footer />
    </>
  );
};

const Section = styled.section`
  background-color: #e3e1e1;
  height: 800px;
  text-align: center;
`;

const Sign = styled.section`
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 5%;
  border-radius: 15%;
  margin-right: 40%;
  margin-left: 40%;
  height: 250px;
  border-width: 5px;
  border: solid;
  border-color: #eb1717;
  text align: center;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 100px;
  color: #e3e1e1;
  border: none;
  height: 30px;
  border-radius: 15%;
  background-color: #eb1717;
`;

const Sub = styled.p`
  margin-top: 50px;
  text-align: center;
  font-weight: bold;
`;

export default HomePage;
