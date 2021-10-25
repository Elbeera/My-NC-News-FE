import Body from "./Body";
import Nav from "./Nav";
import { useState } from "react";

const NavBodyContainer = () => {
  const [currentFilter, setCurrentFilter] = useState(null);
  // const [currSortyBy, setSortBy] = useState(null);
  const [article, setArticle] = useState(null);
  const [viewComments, setViewComments] = useState(false);

  return (
    <>
      <Nav
        // setSortBy={}
        setCurrentFilter={setCurrentFilter}
        article={article}
        setArticle={setArticle}
        setViewComments={setViewComments}
      />
      <Body
        currentFilter={currentFilter}
        article={article}
        setArticle={setArticle}
        viewComments={viewComments}
        setViewComments={setViewComments}
      />
    </>
  );
};

export default NavBodyContainer;
