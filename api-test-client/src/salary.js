

 export default function salary(){
        fetch('http://localhost:4030/salary', {
            method: 'GET'
          })
            .then(res => res.json())
            .then(data => {
             return data;
            })
    }

    