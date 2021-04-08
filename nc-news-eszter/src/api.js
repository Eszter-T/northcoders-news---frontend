import axios from 'axios';

const request = axios.create({
  baseURL: "https://nc-news-eszter.herokuapp.com/api",
});

export const fetchTopics = () => {
  return request.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticles = (topic, p) => {
  return request.get("/articles", { params: { topic: topic, p: p }}).then(({ data }) => {
    return data;
  });
};

export const fetchArticle = (article_id) => {
  return request.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  })
};

export const fetchComments = (article_id) => {
  return request.get(`/articles/${article_id}/comments`, { params: { limit: 20 }}).then(({ data }) => {
    return data.comments;
  });
};

export const changeVotes = (type, id, increment) => {
  return request.patch(`/${type}/${id}`, { inc_votes: increment });
};

