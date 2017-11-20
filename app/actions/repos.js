import axios from "axios";

//ACTION TYPES
const GET_REPOS = "GET_REPOS";


//ACTION CREATORS
export const getRepos = repos => ({ type: GET_REPOS, repos });

//THUNK CREATORS
export const fetchRepos = (username) => dispatch =>
  axios
    .get(`https://api.github.com/users/${username}/repos`)
    .then(res => dispatch(getRepos(res.data)))
    .catch(err => console.log(err));

