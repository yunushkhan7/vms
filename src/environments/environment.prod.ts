// export const environment = {
//   production: true,
//   APIEndpoint: 'http://58.182.54.115:5452/JTCServices/api/',
//   defaultLangCode: 'en',
//   language: [
//     { code: 'en', key: 'english', value: 'English' },
//     { code: 'ja', key: 'Japanese', value: '日本' },
//     { code: 'chi', key: 'Chinese', value: '中國人' },
//   ],
//   defaultPageLimit: 10,
//   pageLimit: [5, 10, 15, 20, 25],
//   imageurllink:"http://58.182.54.115:5452/JTC/",
//   frontEndURL: ''
// };


export const environment = {
  production: false,
  // APIEndpoint: 'http://58.182.54.115:5452/JTCServices/api/',
  APIEndpoint: 'http://mad-doge.ddns.net:4001/api/',
  defaultLangCode: 'en',
  language: [
    { code: 'en', key: 'english', value: 'English' },
    { code: 'ja', key: 'Japanese', value: '日本' },
    { code: 'chi', key: 'Chinese', value: '中國人' },
  ],
  defaultPageLimit: 10,
  pageLimit: [5, 10, 15, 20, 25],
  // imageurllink:"http://58.182.54.115:5452/JTC/",
  imageurllink:"http://mad-doge.ddns.net:4001/JTC/",
  frontEndURL: '' 
};
