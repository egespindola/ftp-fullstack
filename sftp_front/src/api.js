import AXIOS from 'axios';

const baseurl = 'http://localhost:8000'

// AXIOS.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// const headers = {
//    'Content-Type': 'application/json',
//    'Access-Control-Allow-Origin': '*',
// };

// const instance = AXIOS.create({
//    baseURL: "http://localhost:8000",
//    timeout: 100000,
//    headers: headers,
// });

export function getFiles(){
  return AXIOS.get(`${baseurl}`)
}
// axios.get("/user/12345").then(function (response) {
//   console.log(response.data);
//   console.log(response.status);
//   console.log(response.statusText);
//   console.log(response.headers);
//   console.log(response.config);
// });



