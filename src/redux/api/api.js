import axios from 'axios';

export const fetchProductList = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://jsonplaceholder.typicode.com/posts")
            .then(r => {
                resolve(r.data);
            })
            .catch(err => {
                reject(err.message);
            })
    })

}
