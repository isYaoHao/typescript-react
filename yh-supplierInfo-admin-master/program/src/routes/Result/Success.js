import React from 'react';
import { Button, Card } from 'antd';
import Result from 'components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Result
        type="success"
        title="支付成功"
        description="订单支付成功,请等待商家接单......"
        actions={<Button type="primary"><a href="/#/orderManage/orderList">返回列表</a></Button>
        }
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderLayout>
);
