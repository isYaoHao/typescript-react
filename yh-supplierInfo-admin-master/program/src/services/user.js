import Cookies from 'js-cookie';
import lyRequest from '../utils/lyRequest';
import {
  SSO_URL,
  LOGIN_URL,
  LOGOUT_URL,
  VERIFY_PAGE,
  HOME_PAGE,
  TOKEN_NAME,
  API_URL,
} from '../constant/config';

export async function query() {
  return lyRequest('/api/users');
}

export async function queryCurrent() {
  return lyRequest(SSO_URL + '/server/verify');
}

// 获取用户信息
export async function getUserInfo() {
  return lyRequest(SSO_URL + '/server/verify');
}
export async function queryDetail({ userId }) {
  return lyRequest(API_URL + '/service/customers/' + userId);
}
// 登出
export function logout() {
  localStorage.removeItem('antd-pro-authority');
  Cookies.remove('user_info');
  const accessToken = Cookies.get(TOKEN_NAME);
  if (accessToken) {
    Cookies.remove(TOKEN_NAME);
    window.location.href = `${LOGOUT_URL}?access_token=${accessToken}&next=${encodeURIComponent(
      VERIFY_PAGE
    )}`;
  } else {
    window.location.href = `${LOGOUT_URL}`;
  }
}

// 登录操作
export function login() {
  window.location.href = LOGIN_URL + `?next=${encodeURIComponent(VERIFY_PAGE)}`;
}

// 纯跳转到登录页
export function jumpToLogin() {
  Cookies.remove('user_info');
  window.location.href = `${LOGIN_URL}?next=${encodeURIComponent(VERIFY_PAGE)}&disable_redirect=1`;
}
