import axios from 'axios'

const request = axios.create({ baseURL: 'https://nc-news-hayeskg.herokuapp.com/api' })

export const fetchTopics = async () => {
  const { data: { topics } } = await request.get('/topics');
  return topics;

}

export const fetchArticles = async (topic) => {
  const { data: { articles } } = await request.get('/articles', { params: { topic: topic } });
  return articles;
}

export const fetchArticleByID = async (id) => {
  const { data: { article } } = await request.get(`/articles/${id}`);
  return article;
}

export const fetchCommentsByID = async (id) => {
  const { data: { comments } } = await request.get(`/articles/${id}/comments`);
  return comments;
}

export const patchArticleByID = async (id, incVotes) => {
  const { data: { article: { votes } } } = await request.patch(`/articles/${id}`, { inc_votes: incVotes });
  return votes;
}

export const patchCommentByID = async (id, incVotes) => {
  const { data: { comment: { votes } } } = await request.patch(`/comments/${id}`, { inc_votes: incVotes })
  return votes;
}

export const postNewCommentByArticleID = async (id, newComment) => {
  const { data: { comment } } = await request.post(`/articles/${id}/comments`, newComment)
  return comment;
}

export const removeCommentByID = async (id) => {
  await request.delete(`/comments/${id}`);
}