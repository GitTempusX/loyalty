export default (state = null, action) => {
    switch(action.type){
        case 'select_product':
            return action.payload;
        default:
            return state;
    }
};