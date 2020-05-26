import axios from 'axios'

const baseURL = 'https://nc-news-hayeskg.herokuapp.com/api';

export const fetchTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics;
  })
}

export const fetchArticles = (topic) => {
  return axios.get(`${baseURL}/articles`, { params: { topic: topic } }).then(({ data }) => {
    return data.articles;
  })
}

export const fetchArticleByID = (id) => {
  return axios.get(`${baseURL}/articles/${id}`).then(({ data }) => {
    return data.article;
  })
}

export const fetchCommentsByID = (id) => {
  return axios.get(`${baseURL}/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  })
}