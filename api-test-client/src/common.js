import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'))

// export default function salary() {
//   fetch('http://localhost:4030/salary', {
//     method: 'GET'
//   })
//     .then(res => res.json())
//     .then(data => {
//       return data;
//     })
// }

export async function userDetails () {
let fuser;
  if (user) {
    fuser =   await axios.get(`http://localhost:4040/get-user/${user?.email}`)

  }
  return fuser
}

