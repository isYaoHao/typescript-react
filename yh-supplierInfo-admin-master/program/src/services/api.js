import { stringify } from 'qs';
import request from '../utils/lyRequest';
import { AGGREGATOR_URL, SERVICE_URL } from '../constant/config';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// 发送供应商详情展示请求
export async function getSupplierlist() {
  return request(`${AGGREGATOR_URL}/aggregators`, { method: 'GET' });
}

// 通过id供应商详情展示请求
export async function getSupplierlistById(id) {
  return request(`${AGGREGATOR_URL}/aggregators/${id}`, { method: 'GET' });
}
// 通过id删除
export async function getSupplierDeleteById(id) {
    return request(`${AGGREGATOR_URL}/aggregators/${id}`, { method: 'DELETE' });
}
  

export async function fetchToken() {
  return request(`${SERVICE_URL}/qiniu/upload_token?bucket_name=roboimg`);
}
// 提交供应商表单

export async function getSupplierlistForm(params) {
    return request(`${AGGREGATOR_URL}/aggregators`, { 
        method: 'POST', 
        data: params,  
    });
  }
  
