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
  Modal,
  message,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { UPLOAD_URL, IMAGE_TYPES } from '../../constant/config';
import styles from './new.less';

const { TextArea } = Input;


// const plainOptions = [
//   'gno',
//   'product_name',
//   'brand_name',
//   'english_name',
//   'partnumber',
//   'prodution_place',
//   'category',
//   'stock',
//   'price',
//   'supplier_name',
//   'min_buy',
//   'audit_status',
//   'publish_status',
//   'created_time',
// ]; // 所有选项

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let uuid = 0;
let uuuid = 0;
let imgFormArrayNum = 0;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function changeUrl(file) {
   return `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`;
}
// 应用select组件
const businessSelectModel = ['弧焊','点焊','激光焊接','切割','上下料','搬运','码垛','喷涂','打磨','抛光','冲压','污水处理'];
const children=[];
for (let i = 0; i < businessSelectModel.length; i++) {
  children.push(<Option key={businessSelectModel[i]}>{businessSelectModel[i]}</Option>);
}

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
  
}))
// 表单回填功能;
@Form.create({
    mapPropsToFields(props) {
     const { chart } = props;
      const fields = {};
      Object.keys(chart.formListItem).forEach((key) => {
          if (key === 'business') {
           const newArr = chart.formListItem[key];
           for (let i = 0; i < newArr.length; i++) {
            // fields[key] = Form.createFormField({
            //     value: chart.formListItem[key],
            //   });
            Object.keys(newArr[i]).forEach((index) => {
                fields[index] = Form.createFormField({
                    value: newArr[i][index],
                  });
            });
           }
           return; 
          }
        fields[key] = Form.createFormField({
          value: chart.formListItem[key],
        });
      });
      return {
        ...fields,
      };
    },
  })

@Form.create()
export default class Suppliernew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadToken: {},
      previewVisible: false,
      previewImage: '',
      fileList: [],
      imgFormArray: [], // 合作伙伴url数组
      imgFormArrayItem: [],
      fileList4:[]
    };
  }

  handleCancel = (info) => {
    this.setState({ previewVisible: false });
   }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  setAddItem=() => {
    const { setFieldsValue } = this.props.form;
    const { formListItem } = this.props.chart;
    for (let i = 0; i < formListItem.business.length; i++) {
        this.add();
        setFieldsValue({ [`business[${i}].skill`]: formListItem.business[i].skill });
        setFieldsValue({ [`business[${i}].desc`]: formListItem.business[i].desc });
    }
  }

  // handleChange = ({ fileList }) => this.setState({ fileList });

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetchToken',
      callback: (uploadToken) => {
        this.setState({
          uploadToken,
        });
      },
    });
    // this.addItem();
    this.renderRouteDom();
  }

  componentWillUnmount() {
    uuid = 0;
    
  }
  beforeUpload = (file) => {
    const { dispatch } = this.props;
    const tmpTypeArray = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
   // const isJPG = file.type.toLowerCase() === ('image/jpeg' || 'image/png' || 'image/gif' || 'image/jpg');   
   let isJPG = false;
   tmpTypeArray.forEach((value) => {
    if (file.type.toLowerCase() === value) {
        isJPG = true;
    }
});
    
    
    if (!isJPG) {
   message.error('图片格式有误!');
   return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!');
        return false;
    }

    dispatch({
      type: 'chart/fetchToken',
      callback: (uploadToken) => {
        this.setState({
          uploadToken,
        });
      },
    });
  };
  // 方法集
  // 重置

  // 获取列表数据
  handleGetFormList = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chart/fetch',
    });
  };

  // 跳转路由方法;
  renderRouteDom=() => {
      const { search } = this.props.history.location;
      const id = search.split('?')[1].split('=')[1];
      this.props.dispatch({
        type: 'chart/fetchDataById',
        payload: id,
        callback: (res) => {
            // 请求business
            setTimeout(() => {
                this.setAddItem();
            }, 500);
           if (res.rescode !== '10000') {
               message.error(res.msg);
           }
        },
      });
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // 获取上传图片url
  handleChange = (num = -1, info) => {
      const { form } = this.props;
      //form.setFieldsValue('', value);
    console.log(info.file);
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    }

    if (info.file.status === 'removed') {
        if (num === 4) {
            this.setState(() => {
                 const index = this.state.imgFormArray.indexOf(changeUrl(info.file));
                if (index !== -1) {
                    console.log(this.state.imgFormArray.splice(index, 1));
                } 
            });
         }
        return;
      }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    console.log(11111)
      getBase64(info.file.originFileObj, (imageUrl) => {
        // 将数据保存至对象上

        this[`imgFormUpdata${num}`] = imageUrl;

        if (num === 4) {
          console.log('fileList4')
           this.setState(() => {
                this.state.imgFormArray.push(changeUrl(info.file));

                this.state.fileList4=info.fileList
           });
        }

        if (num === 5) {
            this[`imgFormUpdata${num}${imgFormArrayNum}`] = imageUrl;
            this.setState(() => {
                this.state.imgFormArrayItem.push(changeUrl(info.file));
            });
            imgFormArrayNum++;
         }
 

        this.setState({
          loading: false,
          //fileList: info.fileList,
          previewImage: info.url || info.thumbUrl,
        });
      });
    }
  };
  // 获取表单数据
  handleSubmit = (e) => {
    e.preventDefault();
    const { imgFormArray, imgFormArrayItem } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log(values);
    //     const display_url = values.display_url.file.response.key;
    //     const image_url = values.image_url.file.response.key;
    //     const logo_url = values.logo_url.file.response.key;
    //     const { name, about, scale, desc, skill, applications, urldesc, field, culture, background, place } = values;
    //     const partner_urls = imgFormArray;
    //     const business = [];
    //     // 处理business
    //     for (let i = 0; i < skill.length; i++) {
    //         business.push({ skill: skill[i], desc: desc[i] });
    //     }
        

    // //     imgFormArray: [], // 合作伙伴url数组
    // //   imgFormArrayItem: [],
    //     // qualifi_urls
    //     const qualifi_urls = [];
    //     for (let i = 0; i < imgFormArrayItem.length; i++) {
    //        qualifi_urls.push({ url: imgFormArrayItem[i], desc: urldesc[i] });
    //     }
    //     const newDate = { name, place, display_url, image_url, logo_url, about, scale, business, partner_urls, applications, field, culture, background, qualifi_urls };
    //     // console.log(newDate);
    //     this.props.dispatch({
    //         type: 'chart/fetchDataForm',
    //         payload: newDate,
    //         callback: (res) => {
    //             if (res.rescode === '10000') {
    //                 message.success(res.msg);
    //                 setTimeout(() => { this.props.dispatch(routerRedux.push('/supplier/list')); }, 1000);
    //             } else {
    //                 message.error(res.msg);
    //             }
    //         },
    //     });
      }
    });
  };
  // 多表单删除数据
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  // 多表单增加数据
  add = (num) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  addItem = () => {
    const { form } = this.props;
    // can use data-binding to get
    const item = form.getFieldValue('item');
    const nextKeys = item.concat(uuuid);
    uuuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
        item: nextKeys,
    });
  };

  render() {
      console.log(this.props);
      console.log(this.state)
    const { getFieldDecorator, getFieldProps, getFieldValue } = this.props.form;
    const { uploadToken, previewVisible, previewImage, fileList,fileList4, imgFormArray } = this.state;
    const { formListItem } = this.props.chart;
    console.log(fileList4)



    // 数据
    // const imageUrl = this.state.imageUrl;

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
    // button 按钮
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 18,
        },
      },
    };

    const tailFormItemLayoutAdd = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 14,
        },
      },
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    // 多选框提交
    const formItemLayoutWithOutLabel = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };

    
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={k}>
          <FormItem
            {...formItemLayoutWithOutLabel}
            // label={'业务范围' + (k + 1)}
            required
            key={'one' + k}
          >
            {getFieldDecorator(`business[${k}].skill`, {
                initialValue: [],
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  message: '必填字段',
                },
              ],
            })(<Input style={{ width: '90%', marginRight: 2 }} placeholder={`业务范围${k + 1}`} />)}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </FormItem>
          <FormItem
            {...formItemLayoutWithOutLabel}
            // label={'专业领域' + (k + 1)}
            required={false}
            key={'two' + k}
          >
            {getFieldDecorator(`business[${k}].desc`, {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  message: '必填字段',
                },
              ],
            })(
              <TextArea
                style={{ width: '90%', marginRight: 0 }}
                placeholder={`专业领域描述${k + 1}`}
              />
            )}
          </FormItem>
        </div>
      );
    });

    // 创建多行数据方法
    getFieldDecorator('item', { initialValue: [] });
    const item = getFieldValue('item');
    const formQualifi = item.map((k, index) => {
        const { imgFormArrayItem } = this.state;

        const imgFormUpdata = this[`imgFormUpdata5${k}`];
      return (
        <div key={k}>

        <FormItem {...formItemLayout} >
              {getFieldDecorator('url', {
              })(
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={UPLOAD_URL}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange.bind(this, 5)}
                  data={(file) => {
                    return {
                      token: uploadToken,
                      key: `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`,
                    };
                  }}
                >
                  {imgFormUpdata ? (
                    <img src={imgFormUpdata} alt="file" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
        </FormItem>


          <FormItem
            {...formItemLayoutWithOutLabel}
            // label={'专业领域' + (k + 1)}
            required={false}
            key={'two' + k}
          >
            {getFieldDecorator(`urldesc[${k}]`, {
              validateTrigger: ['onChange'],
            })(
              <TextArea
                style={{ width: '90%', marginRight: 0 }}
                placeholder={`奖牌证书描述${k + 1}`}
              />
            )}
          </FormItem>
        </div>
      );
    });

    return (
      <PageHeaderLayout title="供应商信息修改">
        <Card bordered={false} className={styles['formnew-wrap']} title="修改">

        <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="供应商ID">
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<Input disabled />)}
            </FormItem>

            <FormItem {...formItemLayout} label="公司名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout}  label="公司logo">
              {getFieldDecorator('logo_url', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={UPLOAD_URL}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange.bind(this, 1)}
                  data={(file) => {
                    return {
                      token: uploadToken,
                      key: `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`,
                    };
                  }}
                >
                  {this.imgFormUpdata1 ? (
                    <img src={this.imgFormUpdata1} alt="file" />
                  ) : (
                    <img src={formListItem.logo_url} alt="file" />
                  )}
                </Upload>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="公司图片">
              {getFieldDecorator('image_url', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={UPLOAD_URL}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange.bind(this, 2)}
                  data={(file) => {
                    return {
                      token: uploadToken,
                      key: `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`,
                    };
                  }}
                >
                  {this.imgFormUpdata2 ? (
                    <img src={this.imgFormUpdata2} alt="file" />
                  ) : (
                    <img src={formListItem.image_url} alt="file" />
                  )}
                </Upload>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="展示图片">
              {getFieldDecorator('display_url', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={UPLOAD_URL}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange.bind(this, 3)}
                  data={(file) => {
                    return {
                      token: uploadToken,
                      key: `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`,
                    };
                  }}
                >
                  {this.imgFormUpdata3 ? (
                    <img src={this.imgFormUpdata3} alt="file" />
                  ) : (
                    <img src={formListItem.display_url} alt="file" />
                  )}
                </Upload>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="公司介绍">
              {getFieldDecorator('about', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<TextArea />)}
            </FormItem>

            <FormItem {...formItemLayout} label="所在地区">
              {getFieldDecorator('place', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="公司规模">
              {getFieldDecorator('scale', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="领域">
              {getFieldDecorator('field', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="业务范围及专业领域">
              {formItems}
              <FormItem {...tailFormItemLayoutAdd}>
                <Button type="dashed" onClick={this.add} style={{ width: '30%' }}>
                  <Icon type="plus" /> 增加
                </Button>
              </FormItem>
            </FormItem>

            <FormItem {...formItemLayout} label="应用">
              {getFieldDecorator('applications', {
                rules: [
                  {
                    required: true,
                    message: '必填字段',
                  },
                ], 
              })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择"
              >              
                {children}
                 </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label="公司背景">
              {getFieldDecorator('background')(<TextArea />)}
            </FormItem>

            <FormItem {...formItemLayout} label="企业文化">
              {getFieldDecorator('culture')(<TextArea />)}
            </FormItem>

            <FormItem {...formItemLayout} label="合作伙伴图片">
              {getFieldDecorator('partner_urls', {})(
                <div>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>

                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    action={UPLOAD_URL}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange.bind(this, 4)}
                    fileList={this.state.fileList4}
                    onPreview={this.handlePreview}
                    data={(file) => {
                      return {
                        token: uploadToken,
                        key: `supplier/images/info/${file.uid}.${file.name.split('.').slice(-1)[0]}`,
                      };
                    }}
                  >
                    {imgFormArray.length >= 10 ? null : uploadButton}
                  </Upload>
                </div>
              )}
            </FormItem>
              

              <FormItem {...formItemLayout} label="奖牌证书">
              {formQualifi}
              <FormItem {...tailFormItemLayoutAdd}>
                <Button type="dashed" onClick={this.addItem} style={{ width: '30%' }}>
                  <Icon type="plus" /> 增加
                </Button>
              </FormItem>
              </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
        </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
