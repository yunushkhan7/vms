// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
