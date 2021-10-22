import { useState } from "react";
import { patchCommentVotes, patchArticleVotes } from "../utils/api";
import styled from "styled-components";

const VoteBox = styled.p`
  padding: 0;
  margin: 0 0 5px 0;
`;

const Thumb = styled.span`
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

export const CommentVoter = ({ votes, id }) => {
  const [newVote, setNewVote] = useState(0);
  const [error, setError] = useState(false);
  function handleIncVote() {
    const incObj = { inc_votes: 1 };

    patchCommentVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote((currVotes) => currVotes + 1);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes - 1);
        setError(true);
      });
  }
  function handleDecVote() {
    const incObj = { inc_votes: -1 };

    patchCommentVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote((currVotes) => currVotes - 1);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes + 1);
        setError(true);
      });
  }

  return (
    <>
      <VoteBox>
        <Thumb role="img" aria-label="thumbs_up" onClick={handleIncVote}>
          👍
        </Thumb>
        {votes + newVote}
        <Thumb role="img" aria-label="thumbs_down" onClick={handleDecVote}>
          👎
        </Thumb>
      </VoteBox>
      {error && <p>Sorry, please try again!</p>}
    </>
  );
};

export const ArticleVoter = ({ votes, id }) => {
  const [newVote, setNewVote] = useState(0);
  const [error, setError] = useState(false);

  function handleDecVote() {
    const incObj = { inc_votes: -1 };

    patchArticleVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote((currVotes) => currVotes - 1);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes + 1);
        setError(true);
      });
  }
  function handleIncVote() {
    const incObj = { inc_votes: 1 };

    patchArticleVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote((currVotes) => currVotes + 1);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes - 1);
        setError(true);
      });
  }

  return (
    <>
      <VoteBox>
        <Thumb role="img" aria-label="thumbs_up" onClick={handleIncVote}>
          👍
        </Thumb>
        {votes + newVote}
        <Thumb role="img" aria-label="thumbs_down" onClick={handleDecVote}>
          👎
        </Thumb>
      </VoteBox>
      {error && <p>Sorry, please try again!</p>}
    </>
  );
};
