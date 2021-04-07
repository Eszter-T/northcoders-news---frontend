import axios from 'axios';

const request = axios.create({
  baseURL: "https://nc-news-eszter.herokuapp.com/api",
});

export const fetchTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticles = (topic) => {
  return request.get("/articles", { params: { topic: topic }}).then(({ data }) => {
    return data.articles;
  });
};

export const fetchArticle = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  })
};