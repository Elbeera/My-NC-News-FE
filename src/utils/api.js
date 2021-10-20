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

export const getArticles = () => {
  return ncNewsApi.get("/articles").then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};
