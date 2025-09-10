import * as types from "./types";
import axios from "axios";

const BASE_URL = "http://localhost:5001";  // ✅ Fixed to your backend port

// ================== LOGIN ==================
export const NurseLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_NURSE_REQUEST });
    const res = await axios.post(`${BASE_URL}/nurses/login`, data);

    dispatch({
      type: types.LOGIN_NURSE_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_NURSE_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const DoctorLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_DOCTOR_REQUEST });
    const res = await axios.post(`${BASE_URL}/doctors/login`, data);

    dispatch({
      type: types.LOGIN_DOCTOR_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_DOCTOR_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(`${BASE_URL}/admin/login`, data);

    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

// ================== REGISTER ==================
export const DoctorRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_DOCTOR_REQUEST });
    const res = await axios.post(`${BASE_URL}/doctors/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_DOCTOR_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const NurseRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_NURSE_REQUEST });
    const res = await axios.post(`${BASE_URL}/nurses/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_NURSE_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const AdminRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_ADMIN_REQUEST });
    const res = await axios.post(`${BASE_URL}/admin/register`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_ADMIN_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const AmbulanceRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_AMBULANCE_REQUEST });
    const res = await axios.post(`${BASE_URL}/ambulances/add`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_AMBULANCE_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

// ================== UPDATE ==================
export const UpdateNurse = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_NURSE_REQUEST });
    const res = await axios.patch(`${BASE_URL}/nurses/${id}`, data);

    dispatch({ type: types.EDIT_NURSE_SUCCESS, payload: res.data.user });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.EDIT_NURSE_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

export const UpdateDoctor = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DOCTOR_REQUEST });
    const res = await axios.patch(`${BASE_URL}/doctors/${id}`, data);

    dispatch({ type: types.EDIT_DOCTOR_SUCCESS, payload: res.data.user });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.EDIT_DOCTOR_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

// ================== PASSWORD ==================
export const SendPassword = (data) => async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/password`, data);
    return res.data;
  } catch (error) {
    return { message: error.response?.data?.message || error.message };
  }
};

export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.FORGET_PASSWORD_REQUEST });
    const res = await axios.post(`${BASE_URL}/admin/forgot`, data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.FORGET_PASSWORD_ERROR,
      payload: { message: error.response?.data?.message || error.message },
    });
  }
};

// ================== LOGOUT ==================
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
