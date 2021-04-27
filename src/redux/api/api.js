import axios from 'axios';

export const fetchProductList = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/products/")
            .then(r => {
                resolve(r.data);
            })
            .catch(err => {
                reject(err.message);
            })
    })

}
