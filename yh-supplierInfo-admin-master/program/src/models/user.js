import Cookies from 'js-cookie';
import { queryCurrent, logout } from '../services/user';
import Services from '../utils/customerService';
import { queryString } from '../utils/tools';
import { setAuthority } from '../utils/authority';
import {
  TOKEN_NAME,
  LOGIN_URL,
  VERIFY_PAGE,
  HOME_PAGE,
} from '../constant/config.js';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      Cookies.remove('user_info');
      Cookies.set('user_info', JSON.stringify(response.data));
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
      // 注册客服;
    //   Services.service.initService({
    //     username: response.data.username,
    //     mobile: response.data.mobile,
    //     email: response.data.email,
    //   });
    },
    *logout(_, { call, put }) {
      yield call(logout);
    },
    *changeAuthorityUrl(_, { call }) {
      yield call(queryCurrent);
      setAuthority('admin');
      location.href = `${HOME_PAGE}`;
    },
    *verify(_, { call, put }) {
      const { href } = window.location;
      const paramas = queryString.parse(href);
      const token = Cookies.get(TOKEN_NAME);
      if (paramas.access_token) {
        /* 判断url是否有access_token,如果有则将其存储到cookie */
        const accessToken = paramas.access_token.split('#/')[0];
        if (location.host.indexOf('robo2025') !== -1) {
          Cookies.set(TOKEN_NAME, accessToken, {
            expires: 7,
            path: '/',
            domain: '.robo2025.com',
          });
        } else {
          Cookies.set(TOKEN_NAME, accessToken);
        }
        yield put({ type: 'changeAuthorityUrl' });
      } else if (token) {
        yield put({ type: 'changeAuthorityUrl' });
      } else {
        window.location.href = `${LOGIN_URL}?next=${VERIFY_PAGE}&from=supplier`;
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
};
