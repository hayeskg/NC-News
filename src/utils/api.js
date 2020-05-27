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

export const patchArticleByID = (id, incVotes) => {
  return axios.patch(`${baseURL}/articles/${id}`, { inc_votes: incVotes }).then(({ data }) => {
    return data.article.votes;
  })
}

export const patchCommentByID = (id, incVotes) => {
  return axios.patch(`${baseURL}/comments/${id}`, { inc_votes: incVotes }).then(({ data }) => {
    return data.comment.votes;
  })
}

export const postNewCommentByArticleID = (id, newComment) => {
  return axios.post(`${baseURL}/articles/${id}/comments`, newComment).then(({ data }) => {
    return data.comment;
  })
}

export const removeCommentByID = (id) => {
  return axios.delete(`${baseURL}/comments/${id}`);
}