export default (state, action) => {
  switch (action.type) {
    
    case "JOINED":
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      };

    case "setUsers":
      return {
        ...state,
        users: action.payload,
      };

    case "setData":
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case "newMessages":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
