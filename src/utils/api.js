import axios from 'axios'


export const fetchTopics = () => {
  axios.get('https://nc-news-hayeskg.herokuapp.com/api/topics').then(({ data }) => {
    return data.topics;
  })
}