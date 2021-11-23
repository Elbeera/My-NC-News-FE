import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { getArticles, getCommentsByArticleId, postComment } from "../utils/api";
import { CommentVoter, ArticleVoter } from "./IncVotes";
import styled from "styled-components";
import Background from "../images/NCNewsBG.jpeg";

const Article = styled.span`
  font-weight: bold;
`;

const CommentList = styled.span`
  font-weight: bold;
`;

const DeleteButton = styled.button`
  color: #e3e1e1;
  height: 30px;
  border-radius: 15%;
  margin: 5px;
  background-color: #eb1717;
  border: none;
  font-weight: bold;
`;

const Seemore = styled.button`
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  background: transparent;
`;

const List = styled.li`
  border: black solid;
  list-style-type: none;
  margin: 10px 35px 15px 0px;
`;

const ListIn = styled.li`
  border: none;
  list-style-type: none;
  margin: 100px 30px;
`;

const EachComment = styled.li`
  border: #3baaad solid;
  list-style-type: none;
  margin: 10px 35px 15px 0px;
`;

const Section = styled.section`
  margin: 0;
  padding: 10px;
`;

const AddComment = styled.h3`
  width: auto;
`;

const CommentToAdd = styled.textarea`
  width: 500px;
  height: 100px;
`;

const SubmitComment = styled.button`
  color: #e3e1e1;
  background-color: #3baaad;
  border: none;
  border-radius: 15%;
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
  const [didVote, setDidVote] = useState(false);

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

    postComment(commentToPost, article.article_id)
      .then((response) => {
        setMyComments((currentComments) => {
          return [...currentComments, ...response.comment];
        });
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <Section style={{ backgroundImage: `url(${Background})` }}>
      {error && <p>{error.response.data.msg}</p>}
      {loading && <p>Loading.....</p>}
      {article ? (
        <>
          <ListIn key={article.article_id}>
            <Article>Article Title:</Article> {article.title}.<br />
            <Article>Topic:</Article> {article.topic}
            <br />
            <Article>Author:</Article> {article.author}
            <br />
            <Article>Article Body:</Article> {article.body}
            <br />
            <Article>Date Created:</Article>
            {article.created_at.substr(0, 10)}
          </ListIn>
          <h2>Comments: </h2>
          <ul>
            {myComments.map((comment) => {
              if (comment.author === user.users[0].username) {
                return (
                  <EachComment key={comment.comment_id}>
                    <CommentList>Author: </CommentList> {comment.author} <br />
                    <CommentList>Comment: </CommentList> {comment.body}
                    <br />
                    <CommentList>Date Created:</CommentList>
                    {comment.created_at.substr(0, 10)}
                    <br />
                    <br />
                    <CommentList>
                      Votes:{" "}
                      <CommentVoter
                        votes={comment.votes}
                        id={comment.comment_id}
                      />
                    </CommentList>
                    <DeleteButton>Delete my comment!</DeleteButton>
                  </EachComment>
                );
              }
              return (
                <EachComment key={comment.comment_id}>
                  <CommentList>Author: </CommentList> {comment.author} <br />
                  <CommentList>Comment: </CommentList> {comment.body}
                  <br />
                  <CommentList>Date Created:</CommentList>
                  {comment.created_at.substr(0, 10)}
                  <br />
                  <br />
                  <CommentList>
                    Votes:{" "}
                    <CommentVoter
                      votes={comment.votes}
                      id={comment.comment_id}
                    />
                  </CommentList>
                </EachComment>
              );
            })}
          </ul>
          <AddComment>Add a comment: </AddComment>
          <p>User: {`${user.users[0].username}`}</p>
          <form onSubmit={handleSubmit} action="">
            <CommentToAdd name="comment_body" cols="30" rows="10" required />
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
                <br />
                <Article>
                  Votes:
                  <ArticleVoter votes={article.votes} id={article.article_id} />
                </Article>
                <Seemore
                  onClick={() => {
                    setArticle(article);
                    setViewComments(true);
                  }}
                >
                  See more...
                </Seemore>
              </List>
            );
          })}
        </ul>
      )}
    </Section>
  );
};

export default Body;
