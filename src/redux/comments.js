import * as ActionTypes from './ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export const Comments = (
  state = {
    errMess: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: []
      };

    case ActionTypes.ADD_COMMENT: {
      const comment = action.payload;
      // comment.id = state.comments.length;
      // comment.date = new Date().toISOString();
      return {
        ...state,
        comments: state.comments.concat(comment)
      };
    }
    default:
      return state;
  }
};
