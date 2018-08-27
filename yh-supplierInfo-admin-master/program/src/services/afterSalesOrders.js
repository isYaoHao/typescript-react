import lyRequest from '../utils/lyRequest';
import { ORDER_URL } from '../constant/config';

export async function queryOrders(params) {
    const { offset = 0, limit = 10, is_type = 3, is_all = 1, status = 11, ...others } = params;
    return lyRequest(`${ORDER_URL}/v1/user/order`, {
        params: {
            offset,
            limit,
            is_type,
            is_all,
            status,
            ...others,
        },
    });
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

