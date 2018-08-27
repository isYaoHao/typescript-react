import { fakeChartData, getSupplierlist, fetchToken, getSupplierlistById, getSupplierlistForm, getSupplierDeleteById } from '../services/api';
import { SUCCESS_STATUS } from '../constant/config';

export default {
  namespace: 'chart',
  state: {
    formList: [],
    upload_token: '',
    formListItem: '',
  },
  effects: {
    // 获取异步form的数据
    *fetch({ success, error }, { call, put }) {
      const response = yield call(getSupplierlist);
      yield put({
        type: 'save',
        payload: {
          formList: response.data,
        },
      });
    },
    *fetchToken({ callback }, { call, put, select }) {
      const token = yield select(state => state.chart.upload_token);
      if (token === '') {
        const response = yield call(fetchToken);
        yield put({
          type: 'saveUploadToken',
          payload: response.data,
        });
        if (callback) {
          callback(response.data);
        }
      }
    },

    *fetchDataById({ payload, callback }, { call, put, select }) {
      const response = yield call(getSupplierlistById.bind(this, payload));
      if(callback){
          callback(response)
      }
      yield put({
        type: 'change',
        payload: {
          formListItem: response.data,
        },
      });
    },

    // 提交form

    *fetchDataForm({ payload, callback }, { call, put, select }) {
        console.log(payload);
        const response = yield call(getSupplierlistForm.bind(this, payload));

        if (callback) {
            callback(response);
        }
      },
      // 删除单条;
      *fetchDeleteById({ payload, callback }, { call, put, select }) {
        console.log(payload);
        const response = yield call(getSupplierDeleteById.bind(this, payload));
        if (callback) {
            callback(response);
        }
      },

    // 测试
    *fetchSalesData({ success, error }, { call, put }) {
      const res = yield call(fakeChartData);
      if (res.rescode >> 0 === SUCCESS_STATUS) {
        if (typeof success === 'function') {
          success(res);
        }
      } else if (typeof error === 'function') {
        error(res);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          salesData: res.salesData,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    change(state, { payload }) {
      return {
        ...payload,
      };
    },
    clear() {
      return {
        formList: [],
      };
    },
  },
};
