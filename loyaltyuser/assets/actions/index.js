export const selectProduct = (product) => {
    return {
        type: 'select_product',
        payload: product
    };
};

export const selectFooter = (name) => {
    return {
        type: 'select_footer',
        payload: name
    }
}