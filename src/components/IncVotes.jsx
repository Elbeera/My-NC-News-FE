import { useState } from "react";
import { patchCommentVotes, patchArticleVotes } from "../utils/api";

export const CommentVoter = ({ votes, id }) => {
  const [newVote, setNewVote] = useState(0);
  const [error, setError] = useState(false);
  function handleIncVote() {
    const incObj = { inc_votes: 1 };

    patchCommentVotes(incObj, id)
      .then((apiResponse) => {
        setError(false);
        setNewVote((currVotes) => currVotes + 1);
        console.log(apiResponse);
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
        console.log(apiResponse);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes + 1);
        setError(true);
      });
  }

  return (
    <>
      <p>
        <button onClick={handleIncVote}>
          {votes + newVote}
          <span role="img" aria-label="thumbs_up">
            👍
          </span>
        </button>
        <button onClick={handleDecVote}>
          {votes + newVote}
          <span role="img" aria-label="thumbs_down">
            👎
          </span>
        </button>
      </p>
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
        console.log(apiResponse);
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
        console.log(apiResponse);
      })
      .catch((err) => {
        setNewVote((currVotes) => currVotes - 1);
        setError(true);
      });
  }

  return (
    <>
      <p>
        <button onClick={handleIncVote}>
          {votes + newVote}
          <span role="img" aria-label="thumbs_up">
            👍
          </span>
        </button>
        <button onClick={handleDecVote}>
          {votes + newVote}
          <span role="img" aria-label="thumbs_down">
            👎
          </span>
        </button>
      </p>
      {error && <p>Sorry, please try again!</p>}
    </>
  );
};
