import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Input,
  Card,
  Row,
  Col,
  Cascader,
  Table,
  Divider,
  Popconfirm, 
  message,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './list.less';

const plainOptions = [
  'gno',
  'product_name',
  'brand_name',
  'english_name',
  'partnumber',
  'prodution_place',
  'category',
  'stock',
  'price',
  'supplier_name',
  'min_buy',
  'audit_status',
  'publish_status',
  'created_time',
]; // 所有选项

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
@Form.create()
export default class Supplierlist extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        uploadToken: {},
    };
  }

  componentDidMount() {
    this.handleGetFormList();
    // upload拿token
    this.props.dispatch({
        type: 'chart/fetchToken',
        callback: (uploadToken) => {
          this.setState({
            uploadToken,
          });
        },
      });
  }

  // 方法集
  // 重置
  handleReset = () => {
    this.props.form.resetFields();
  };
  // 修改点击事件;
  handleReviseChange = (data) => {
    const id = data.id;
    this.props.dispatch(routerRedux.push(`/supplier/revise/?id=${id}`));
  };
  // 点击删除
  handleDeleteList=(data) => {
    console.log(data);
    const { dispatch } = this.props;

    dispatch({
        type: 'chart/fetchDeleteById',
        payload: data.id,
        callback: (res) => {
            if (res.status === 200) {
                dispatch({
                    type: 'chart/fetch',
                  });
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        },
    });
  }
  // 获取列表数据
  handleGetFormList = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chart/fetch',
    });
  };

  // 新增跳转路由

  handleRouteAdd=() => {
      this.props.dispatch(routerRedux.push('/supplier/new'));
  }

  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={6} md={30}>
            <FormItem label="供应商名称" colon>
              {getFieldDecorator('formname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col lg={6} md={12}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.chart.formList || [];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    // 表头
    const columns = [
      { title: '供应商ID', dataIndex: 'id', key: '1', width: 150, align: 'center' },
      { title: '供应商名称', dataIndex: 'name', key: '2', width: 150, align: 'center' },
      {
        title: '公司logo',
        dataIndex: 'logoUrl',
        key: '3',
        width: 150,
        align: 'center',
        render: url => (
          <div>
            <img className={styles.tableLogoImg} src={url} />
          </div>
        ),
      },

      { title: '所在地', dataIndex: 'place', key: '7', width: 150, align: 'center' },
      { title: '规模大小', dataIndex: 'scale', key: '8', width: 150, align: 'center' },
      { title: '领域', dataIndex: 'field', key: '9', width: 150, align: 'center' },
      { title: '应用', dataIndex: 'address', key: '10', width: 150, align: 'center' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        width: 160,
        render: data => (
          <span>
            <a href="javascript:;">详情</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.handleReviseChange.bind(this, data)}>
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除?" onConfirm={this.handleDeleteList.bind(this, data)}>
                <a href="javascript:;" >删除</a>
            </Popconfirm>
            
          </span>
        ),
      },
    ];
    // 数据

    const tabData = [];
    for (let i = 0; i < formList.length; i++) {
      console.log(formList);
      tabData.push({
        key: i,
        id: formList[i].id,
        name: formList[i].name,
        logoUrl: formList[i].logo_url,
        place: formList[i].place,
        scale: formList[i].scale,
        field: formList[i].field,
        address: formList[i].field,
      });
    }

    return (
      <PageHeaderLayout title="供应商列表">
        <Card bordered={false} className={styles['search-wrap']} title="搜索条件">
          <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
        </Card>

        <Card
          bordered={false}
          style={{ marginTop: 20 }}
          className={styles['search-wrap']}
          title="详情展示"
        >
            <Button type="primary" style={{ marginBottom: 20 }} onClick={this.handleRouteAdd}>新建</Button>
          <Table columns={columns} dataSource={tabData} scroll={{ x: 1500, y: 400 }} />
        </Card>
        <Card bordered={false} />
      </PageHeaderLayout>
    );
  }
}
