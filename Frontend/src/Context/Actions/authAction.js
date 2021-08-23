export const login = (token) => (dispatch) => {
  dispatch({ type: "Login_Success", payload: token });
};

export const logout = () => (dispatch) => {
  dispatch({ type: "Logout" });
};
