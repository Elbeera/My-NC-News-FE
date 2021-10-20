import Body from "./Body";
import Nav from "./Nav";
import { useState } from "react";

const NavBodyContainer = () => {
  const [currentFilter, setCurrentFilter] = useState(null);
  return (
    <>
      <Nav setCurrentFilter={setCurrentFilter} />
      <Body currentFilter={currentFilter} />
    </>
  );
};

export default NavBodyContainer;
