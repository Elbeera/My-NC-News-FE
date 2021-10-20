import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import styled from "styled-components";

const Article = styled.span`
  font-weight: bold;
`;

const List = styled.li`
  border: black solid;
  list-style-type: none;
  margin: 10px;
`;

const Section = styled.section`
  border-radius: 3%;
  background-color: lightgreen;
  margin: 0;
  padding: 10px;
`;

const Body = ({ currentFilter }) => {
  const [articles, setArticles] = useState([]);
  console.log(currentFilter);
  useEffect(() => {
    getArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi.articles);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [currentFilter]);

  return (
    <Section>
      <ul>
        {(currentFilter
          ? articles.filter((article) => article.topic === currentFilter)
          : articles
        ).map((article) => {
          return (
            <List key={article.article_id}>
              <Article>Article Title:</Article> {article.title}.<br />
              <Article>Topic:</Article> {article.topic}
              <br />
              <Article>Author:</Article> {article.author}
              <br />
              <Article>Article Body:</Article> {article.body}
              <br />
              <Article>Date Created:</Article>
              {article.created_at.substr(0, 10)}
              <br />
              <button>
                <Article>Votes: </Article>
                {article.votes}
              </button>
            </List>
          );
        })}
      </ul>
    </Section>
  );
};

export default Body;
