/*
* 后台管理系统常量：
* sso：      https://login.robo2025.com
* 后台管理API：http://139.199.96.235:9002
* */

const IS_PRODUCT = false;

const protocol = window.location.protocol + '//';

const DOMAIN = IS_PRODUCT ? 'api.robo2025.com' : 'testapi.robo2025.com';

// 单点登录URL
const URL = IS_PRODUCT ? 'https://login.robo2025.com' : 'https://testlogin.robo2025.com';

// 注册URL
const REGISTER_URL = URL + '/register';

// （测试）电商首页
const INDEX_URL = IS_PRODUCT ? 'https://www.robo2025.com' : 'https://test-home.robo2025.com';

const TOKEN_NAME = IS_PRODUCT ? 'access_token' : 'test_access_token';

const API = protocol + DOMAIN;

// 分页：每页显示多少记录
const PAGE_SIZE = 10;

// 文件服务器URL
const FILE_SERVER = '//imgcdn.robo2025.com/';

// 静态web服务器地址,端口和地址必须要写，80端口可不写
const myHost = protocol + window.location.host;

// 前端登录验证URL
const NEXT_URL = myHost + '/#/test';

// 前端首页URL
const HOME_PAGE = myHost + '/#/dashboard/analysis';

// 前端验证URL
const VERIFY_PAGE = myHost + '/#/user';

// 支付成功地址
const PAYMENTSUCCESS_URL = myHost + '/#/result/success';

// 订单相关接口
const ORDER_URL = `${API}/order`;

const SLN_ORDER_URL = `${API}/sln-order`;

// 用户管理系统接口
const API_URL = `${API}/user`;

// 公共服务接口
const SERVICE_URL = `${API}/common`;

// 支付接口
const PAYMENT_URL = `${API}/pay`;

// 电商平台接口
const SHOP_URL = `${API}/shop`;

// 方案中心接口
const SLNCENTER_URL = `${API}/slncenter`;

// sso
const SSO_URL = `${API}/sso`;

// aggregators
const AGGREGATOR_URL = `${API}/aggregator`;

// 验证登录接口URL
const LOGIN_URL = SSO_URL + '/server/authorize';

// 登录接口URL
const LOGOUT_URL = SSO_URL + '/logout';

// 文件（图片）上传地址
const UPLOAD_URL = '//upload.qiniup.com';

// 快递100物流查询网站
const LOGISTICS_URL = 'https://www.kuaidi100.com/chaxun';

// 购物车
const SHOPCAR_URL = INDEX_URL + '/#/shopcar';

// 商品详情接口
const DETAIL_URL = INDEX_URL + '/#/modalNumberInfo';


// 支持上传的图片文件类型
export const IMAGE_TYPES = ['jpg', 'png', 'gif', 'jpeg'];

// 方案详情接口
const SLNDETAIL_URL = INDEX_URL + '/#/solutionInfo';

 const SUCCESS_STATUS = 10000; // 操作成功

export {
  TOKEN_NAME,
  PAGE_SIZE,
  FILE_SERVER,
  URL,
  SSO_URL,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  NEXT_URL,
  HOME_PAGE,
  VERIFY_PAGE,
  PAYMENTSUCCESS_URL,
  ORDER_URL,
  SLN_ORDER_URL,
  API_URL,
  SERVICE_URL,
  PAYMENT_URL,
  SHOP_URL,
  SLNCENTER_URL,
  UPLOAD_URL,
  LOGISTICS_URL,
  INDEX_URL,
  SHOPCAR_URL,
  DETAIL_URL,
  SLNDETAIL_URL,
  AGGREGATOR_URL,
  SUCCESS_STATUS,
};
