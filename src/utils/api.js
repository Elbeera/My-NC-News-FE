import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://hothyfa-nc-news.herokuapp.com/api",
});

export const getUsers = () => {
  return ncNewsApi.get("/users").then(({ data }) => {
    return data;
  });
};

export const getUserByName = (username) => {
  return ncNewsApi.get(`/users/${username}`).then(({ data }) => {
    return data;
  });
};

export const getTopics = () => {
  return ncNewsApi.get("/topics").then(({ data }) => {
    return data;
  });
};

export const getArticles = (sort_by = "") => {
  return ncNewsApi.get(`/articles?sort_by=${sort_by}`).then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const postComment = (comment, article_id) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => {
      return data;
    });
};

export const patchCommentVotes = (voteObj, comment_id) => {
  return ncNewsApi.patch(`comments/${comment_id}`, voteObj).then(({ data }) => {
    return data;
  });
};

export const patchArticleVotes = (voteObj, article_id) => {
  return ncNewsApi.patch(`articles/${article_id}`, voteObj).then(({ data }) => {
    return data;
  });
};
