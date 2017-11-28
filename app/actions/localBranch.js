import axios from "axios";

//ACTION TYPES
const GET_LOCAL_BRANCHES = 'GET_LOCAL_BRANCHES';


//ACTION CREATORS
export const getLocalBranches = branches => ({ type: GET_LOCAL_BRANCHES, branches });


