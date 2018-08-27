import lyRequest from '../utils/lyRequest';
import { ORDER_URL, SERVICE_URL, PAYMENT_URL } from '../constant/config';

export async function queryOrders(params) {
    const { offset = 0, limit = 10, is_type = 0, is_all = 1, ...others } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order`, {
        params: {
            offset,
            limit,
            is_type,
            is_all,
            ...others,
        },
    });
}
export async function cancelOrder(params) {
    const { cancel_desc, id } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order/${id}?order_type=2`, {
        method: 'delete',
        data: {
            cancel_desc,
        },
    });
}
export async function returnOrder(params) {
    const { remarks, id, img_url } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order/${id}`, {
        method: 'put',
        data: {
            status: 2,
            remarks,
            img_url,
        },
    });
}
export async function confirmReceipt(params) {
    const { id } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order/${id}`, {
        method: 'put',
        data: {
            status: 3,
        },
    });
}
export async function fetchToken() {
    return lyRequest(`${SERVICE_URL}/qiniu/upload_token?bucket_name=roboimg`);
}
export async function logisticsFormSubmit(params) {
    const { id, ...others } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order/${id}`, {
        method: 'put',
        data: {
            status: 1,
            ...others,
        },
    });
}
export async function queryDetail(params) {
    const { id } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order/${id}`);
}
export async function payOrder(params) {
    return lyRequest(`${PAYMENT_URL}/payment/unionpay`, {
        method: 'post',
        data: {
            ...params,
        },
    });
} 
