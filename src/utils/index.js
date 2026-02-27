const axios = require('axios');
const glob = require('glob');
// 创建一个只使用IPv4的代理
const http = require('http');
const https = require('https');

// 创建强制使用IPv4的Agent
const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

const headers = {
  validmark:
    'aKVEnBbJF9Nip2Wjf4de/fSvA8W3X3iB4L6vT0Y5cxvZbEfEm17udZKUD2qy37dLRY3bzzHLDv+up/Yn3OTo5Q==',
  "Accept": "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "Connection": "keep-alive",
  "DNT": 1,
  "Sec-Fetch-Dest": "script",
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
  "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "macOS",
};

const deviceId = '874C427C-7C24-4980-A835-66FD40B67605';
const version = '6.8.5';
const baseData = {
  product: 'EFund',
  deviceid: deviceId,
  MobileKey: deviceId,
  plat: 'Iphone',
  PhoneType: 'IOS15.1.0',
  OSVersion: '15.5',
  version,
  ServerVersion: version,
  Version: version,
  appVersion: version,
};
// 发送请求
const request = async (url, params, header) => {
  try {
    const res = await axios.get(url, {
      headers: {
        ...headers,
        header
      },
      params: {
        ...baseData,
        ...params,
      },
      timeout: 10000
    });
    return res.data;
  } catch (e) {
    return {
      code: 400,
      error: e
    }
  }
};
const get = async (url, params, header) => {
  try {
    const res = await axios.get(url, {
      headers: {
        ...headers,
        header
      },
      params,
      httpAgent,
      httpsAgent,
      timeout: 300000
    });
    return { code: res.status, data: res.data };
  } catch (e) {
    console.log('eindex: ', e);
    return {
      code: 400,
      error: 'AxiosError'
    }
  }
};

const post = async (url, data, header) => {
  const res = await axios.post(
    url,
    new URLSearchParams({
      ...baseData,
      ...data,
    }),
    {
      headers: { ...headers, header },
    }
  );
  return res.data;
};

const xjPost = async (url, data) => {
  const res = await axios.post(
    url,
    data
  );
  return res.data;
};

// 发送 jsonp 请求
const jsonp = async (url, callback, params) => {
  const res = await axios(url, { params });
  const js = res.data.replace(/[\n]/g, '').replace(/\r/g, '');
  return JSON.parse(js.slice(callback.length + 1, js.length - 1));
};

const getModules = () => {
  const files = glob.sync('./src/module/*.js');
  return files.map((path) => {
    const fileName = path.replaceAll('\\', '/').replace('src/module/', '').replace('.js', '');
    return {
      fileName,
      path: path.replace('src', './'),
    };
  });
};

const sse = async (url, params, headers) => {

  try {
    const res = await axios(url, {
      headers,
      params: {
        ...baseData,
        ...params,
      },
      responseType: 'stream',
      httpAgent,
      httpsAgent
    });
    return res.data;
  } catch (err) {
    console.log('err: ', err);
    return err
  }
};

module.exports = {
  request,
  post,
  jsonp,
  getModules,
  sse,
  get,
  xjPost
};
