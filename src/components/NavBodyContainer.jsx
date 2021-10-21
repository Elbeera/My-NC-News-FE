import Body from "./Body";
import Nav from "./Nav";
import { useState } from "react";

const NavBodyContainer = () => {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [article, setArticle] = useState(null);

  return (
    <>
      <Nav
        setCurrentFilter={setCurrentFilter}
        article={article}
        setArticle={setArticle}
      />
      <Body
        currentFilter={currentFilter}
        article={article}
        setArticle={setArticle}
      />
    </>
  );
};

export default NavBodyContainer;
