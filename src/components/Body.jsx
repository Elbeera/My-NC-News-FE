import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { getArticles, getCommentsByArticleId } from "../utils/api";
import styled from "styled-components";

const Body = ({ currentFilter, article, setArticle }) => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myComments, setMyComments] = useState([]);

  console.log(user);

  useEffect(() => {
    getArticles()
      .then((articlesFromApi) => {
        setError(null);
        setArticles(articlesFromApi.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  function viewComments(article_id) {
    getCommentsByArticleId(article_id)
      .then((commentsFromApi) => {
        setError(null);
        setMyComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }

  return (
    <Section>
      {error && <p>{error.response.data.msg}</p>}
      {loading && <p>Loading.....</p>}
      {article ? (
        <>
          <List>
            <Article>Article Title:</Article> {article.title}.<br />
            <Article>Topic:</Article> {article.topic}
            <br />
            <Article>Author:</Article> {article.author}
            <br />
            <Article>Article Body:</Article> {article.body}
            <br />
            <Article>Date Created:</Article>
            {article.created_at.substr(0, 10)}
          </List>
          <h2>Comments: </h2>

          <ul>
            {/* {myComments.comments.map((comment) => {
              return (
                <li>
                  <Article>Author: </Article> {comment.author} <br />
                  <Article>Comment: </Article> {comment.body} <br />
                  <Article>Likes: </Article> {comment.votes}
                </li>
              );
            })} */}
          </ul>
          <form action=""></form>
        </>
      ) : (
        <ul>
          {(currentFilter
            ? articles.filter((article) => article.topic === currentFilter)
            : articles
          ).map((article) => {
            return (
              <List name="article" value={article} key={article.article_id}>
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
                <br />
                <button
                  onClick={() => {
                    viewComments(article.article_id);
                    setArticle(article);
                  }}
                >
                  See more...
                </button>
              </List>
            );
          })}
        </ul>
      )}
    </Section>
  );
};

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

export default Body;
