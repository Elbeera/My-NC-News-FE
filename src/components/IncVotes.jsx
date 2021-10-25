import { useState } from "react";
import { patchCommentVotes, patchArticleVotes } from "../utils/api";
import styled from "styled-components";

const VoteBox = styled.p`
  padding: 0;
  margin: 0 0 5px 0;
`;

const Thumb = styled.button`
  margin: 5px 10px 5px 5px;
  background-color: Transparent;
  border: none;
  cursor: pointer;
`;

export const CommentVoter = ({ votes, id }) => {
  const [newVote, setNewVote] = useState(votes);
  const [error, setError] = useState(false);
  const [upDisable, setUpDisable] = useState(false);
  const [downDisable, setDownDisable] = useState(false);

  function handleIncVote() {
    const incObj = { inc_votes: 1 };

    patchCommentVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote(apiResponse.comment.votes);
      })
      .catch((err) => {
        setError(true);
      });
  }
  function handleDecVote(e) {
    const incObj = { inc_votes: -1 };

    patchCommentVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote(apiResponse.comment.votes);
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <>
      <VoteBox>
        <Thumb
          disabled={upDisable}
          role="img"
          aria-label="thumbs_up"
          onClick={() => {
            handleIncVote();
            setUpDisable(true);
          }}
        >
          👍
        </Thumb>
        {votes + newVote}
        <Thumb
          disabled={downDisable}
          role="img"
          aria-label="thumbs_down"
          onClick={() => {
            handleDecVote();
            setDownDisable(true);
          }}
        >
          👎
        </Thumb>
      </VoteBox>
      {error && <p>Sorry, please try again!</p>}
    </>
  );
};

export const ArticleVoter = ({ votes, id }) => {
  const [newVote, setNewVote] = useState(votes);
  const [error, setError] = useState(false);
  const [upDisable, setUpDisable] = useState(false);
  const [downDisable, setDownDisable] = useState(false);

  function handleDecVote() {
    const incObj = { inc_votes: -1 };

    patchArticleVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote(apiResponse.article.votes);
      })
      .catch((err) => {
        setError(true);
      });
  }
  function handleIncVote() {
    const incObj = { inc_votes: 1 };

    patchArticleVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote(apiResponse.article.votes);
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <>
      <VoteBox>
        <Thumb
          disabled={upDisable}
          role="img"
          aria-label="thumbs_up"
          onClick={() => {
            handleIncVote();
            setUpDisable(true);
          }}
        >
          👍
        </Thumb>
        {newVote}
        <Thumb
          disabled={downDisable}
          role="img"
          aria-label="thumbs_down"
          onClick={() => {
            handleDecVote();
            setDownDisable(true);
          }}
        >
          👎
        </Thumb>
      </VoteBox>
      {error && <p>Sorry, please try again!</p>}
    </>
  );
};
