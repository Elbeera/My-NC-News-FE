import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { getArticles, getCommentsByArticleId, postComment } from "../utils/api";
import styled from "styled-components";

const Article = styled.span`
  font-weight: bold;
`;

const CommentList = styled.span`
  font-weight: bold;
`;

const List = styled.li`
  border: black solid;
  list-style-type: none;
  margin: 10px;
`;

const EachComment = styled.li`
  border: blue solid;
  list-style-type: none;
  margin: 10px;
`;

const Section = styled.section`
  border-radius: 3%;
  background-color: lightgreen;
  margin: 0;
  padding: 10px;
`;

const AddComment = styled.h3`
  border-top: black solid;
  width: auto;
`;

const CommentToAdd = styled.textarea`
  width: 500px;
  height: 100px;
`;

const SubmitComment = styled.button`
  margin: 10px;
  width: 100px;
  padding: 8px;
`;

const Body = ({
  currentFilter,
  article,
  setArticle,
  viewComments,
  setViewComments,
}) => {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myComments, setMyComments] = useState([]);

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

  useEffect(() => {
    {
      viewComments &&
        getCommentsByArticleId(article.article_id)
          .then((commentsFromApi) => {
            setError(null);
            setMyComments(commentsFromApi.comments);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
    }
  }, [article]);

  function handleSubmit(e) {
    e.preventDefault();
    const insertedComment = e.target.comment_body.value;
    const commentToPost = {
      username: user.users[0].username,
      body: insertedComment,
    };
    // console.log(commentToPost);
    // console.log(article.article_id);
    console.log(myComments.comments);

    postComment(commentToPost, article.article_id)
      .then((response) => {
        console.log(response);
        setMyComments((currentComments) => {
          console.log(currentComments);
          return [...currentComments, response.comment];
        });
        setError(null);
      })
      .catch((err) => {
        console.dir(err);
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
            {myComments.map((comment) => {
              return (
                <EachComment>
                  <li key={comment.comment_id}>
                    <CommentList>Author: </CommentList> {comment.author} <br />
                    <CommentList>Comment: </CommentList> {comment.body}
                    <br />
                    <CommentList>Date Created:</CommentList>
                    {comment.created_at.substr(0, 10)}
                    <br />
                    <button>
                      <CommentList>Votes: </CommentList>
                      {comment.votes}
                    </button>
                  </li>
                </EachComment>
              );
            })}
          </ul>
          <AddComment>Add a comment: </AddComment>
          <p>User: {`${user.users[0].username}`}</p>
          <form onSubmit={handleSubmit} action="">
            <CommentToAdd name="comment_body" cols="30" rows="10" />
            <br />
            <SubmitComment type="submit">Submit</SubmitComment>
          </form>
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
                <Article>Article Body:</Article> {article.body}
                <br />
                <button>
                  <Article>Votes: </Article>
                  {article.votes}
                </button>
                <br />
                <button
                  onClick={() => {
                    setArticle(article);
                    setViewComments(true);
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

export default Body;
