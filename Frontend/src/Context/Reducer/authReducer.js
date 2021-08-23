export default (state, { type, payload }) => {
  switch (type) {
    case "Login_Success":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLogin: true,
          token: payload,
        },
      };
    case "Logout":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLogin: false,
          token: null,
        },
      };

    default:
      return state;
  }
};
