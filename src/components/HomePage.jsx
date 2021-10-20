import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { useState } from "react";
import { getUserByName } from "../utils/api";
import { UserContext } from "../context/User";
import { useContext } from "react";

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
      <Section>
        <Header />
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

          <Button type="submit">Log in</Button>
        </form>
        {error && <p>{error.response.data.msg}</p>}
        <Sub>Thank you for visiting our webpage!</Sub>
      </Section>
      <Footer />
    </>
  );
};

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

export default HomePage;
