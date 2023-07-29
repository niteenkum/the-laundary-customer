let _Environments = {
  production: {
    BASE_URL: 'https://thelaundrymachine.in/api', //http://172.105.35.91/thelaundrymachine/public/api',
    // BASE_URL: "http://65.0.42.219/api",
    WEB_URL: 'https://demo.ambrogiolavanderia.com',
  },

  development: {
    BASE_URL: 'https://thelaundrymachine.in/api', //'http://172.105.35.91/thelaundrymachine/public/api',
    // BASE_URL: "http://65.0.42.219/api",
    WEB_URL: 'https://demo.ambrogiolavanderia.com',
  },
};

const getEnvironment = () => {
  let platform = getPlatform();
  return _Environments[platform];
};

const getPlatform = () => {
  let environment = '';
  if (__DEV__) {
    environment = 'development';
  } else {
    environment = 'production';
  }
  return environment;
};

export const Environment = getEnvironment();
