import {
  setLoginSuccess,
  setLoginFailed,
  setLoginRequest,
  setLogoutUser,
} from "../actions/auth";

const LoginThunk = (data, navigate) => async (dispatch) => {
  dispatch(setLoginRequest());
  //make call to backend to autheniticate the user by verifying the token and dispatch Login Success action and navigate to home page
  dispatch(setLoginSuccess(data));
  navigate("/");
  // if any error is returned from backend then dispatch login failed action
  // dispatch(setLoginFailed(data));
};

const LogoutThunk = (navigate) => async (dispatch) => {
  localStorage.clear();
  sessionStorage.clear();
  dispatch(setLogoutUser());
};

export { LoginThunk, LogoutThunk };
