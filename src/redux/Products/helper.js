export const returnUpdatedProducts = (products, payload) => {

    let newProducts = [...products];
    let idx = newProducts.findIndex(ele => ele.id === payload.id);
    let product = newProducts[idx];
    product = { ...product, title: payload.title, body: payload.description };
    newProducts[idx] = product;
    return newProducts;
}