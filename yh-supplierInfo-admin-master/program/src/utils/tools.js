import { VERIFY_PAGE } from '../constant/config';


// 未登录状态跳转到验证页面
export function jumpToVerify() {
  window.location.href = VERIFY_PAGE;
}

// 解析url
export const queryString = {
  parse(url) {
    const parseObj = {};
    if (!url) {
      return false;
    }
    let argStr = '';
    if (url.split('?').length > 1) {
      argStr = url.split('?')[1];
      const argArr = argStr.split('&');
      argArr.forEach((val) => {
        const args = val.split('=');
        if (args.length > 1) {
          parseObj[args[0]] = args[1];
        }
      });
    }
    return parseObj;
  },
};

// 验证文件类型
export function checkFile(filename, fileArr) {
  const postfix = filename.split('.')[1];
  for (let i = 0, fileLen = fileArr.length; i < fileLen; i++) {
    if (postfix === fileArr[i]) {
      return true;
    }
  }
}

// 时间戳转年月日时分秒
export function timeStampToDate(timeStamp) {
  const date = new Date(timeStamp);
  const time = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    H: date.getHours(),
    M: date.getMinutes(),
    S: date.getSeconds(),
  };
  return {
    ...time,
    timeStr: `${time.year}-${time.month}-${time.day} ${time.H}:${time.M}:${
      time.S
    }`,
  };
}
