import axios from 'axios';

export const fetchProductList = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(r => {
                console.log("saga: ", r.data);
                resolve(r.data);
            })
            .catch(err => {
                reject(err.message);
            })
    })

}
