import lyRequest from '../utils/lyRequest';
import { API_URL } from '../constant/config';

export async function query() {
    return lyRequest(`${API_URL}/api/customer/invoices`);
}

export async function addAddress(params) {
    return lyRequest(`${API_URL}/api/customer/invoices`, {
        method: 'post',
        data: params,
    });
}
export async function deleteAddress(params) {
    return lyRequest(`${API_URL}/api/customer/invoices/${params}`, {
        method: 'delete',
    });
}
export async function modifyAddress(params) {
    const { id, ...others } = params;
    return lyRequest(`${API_URL}/api/customer/invoices/${id}`, {
        method: 'put',
        data: others,
    });
}
