import * as ActionTypes from './ActionTypes';

/* 
    Initially, the isLoading property is true because the dishes is empty here. 
    So, that means that you'll need to load the dishes' information from somewhere 
    before the details of the dishes become available within your state. 
*/

    export const Dishes = (state = {
            isLoading: true,
            errMess: null,
            dishes: []
        }, action) => {
        switch(action.type){
            case ActionTypes.ADD_DISHES:
                    return{...state, isLoading: false, errMess: null, dishes: action.payload}

            case ActionTypes.DISHES_LOADING:
                return{...state, isLoading: true, errMess: null, dishes: []}

            case ActionTypes.DISHES_FAILED:
                    return{...state, isLoading: false, errMess: action.payload, dishes: []}

            default: 
                return state;
        }
}