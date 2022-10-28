import axios from 'axios';

export default axios.create({
  withCredentials: false,
  baseURL: "https://nen2ir3hxj.execute-api.us-east-1.amazonaws.com/prod/",
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    }
});
