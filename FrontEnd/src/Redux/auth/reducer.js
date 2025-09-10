import * as types from "./types";

const TOKEN = localStorage.getItem("token");

const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: null,
  },
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    // LOGIN REQUEST
    case types.LOGIN_NURSE_REQUEST:
    case types.LOGIN_ADMIN_REQUEST:
    case types.LOGIN_DOCTOR_REQUEST:
      return {
        ...state,
        userLogin: { loading: true, error: false, message: "" },
      };

    // LOGIN SUCCESS
    case types.LOGIN_NURSE_SUCCESS:
    case types.LOGIN_ADMIN_SUCCESS:
    case types.LOGIN_DOCTOR_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          isAuthenticated: !!payload.token,
          token: payload.token,
          user: payload.user,
        },
      };

    // LOGIN ERROR
    case types.LOGIN_NURSE_ERROR:
    case types.LOGIN_ADMIN_ERROR:
    case types.LOGIN_DOCTOR_ERROR:
      return {
        ...state,
        userLogin: { loading: false, error: true, message: payload.message },
      };

    // EDIT USER
    case types.EDIT_NURSE_SUCCESS:
    case types.EDIT_DOCTOR_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          user: payload,
        },
      };

    // RESET
    case "AUTH_LOGIN_RESET":
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
      };

    // LOGOUT
    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
        userLogout: { message: "Logout Successfully" },
        data: {
          isAuthenticated: false,
          token: null,
          user: null,
        },
      };

    default:
      return state;
  }
}
