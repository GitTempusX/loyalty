export default (state = 'search', action) => {
    switch(action.type){
        case 'select_footer':
            return action.payload;
        default:
            return state;
    }
};