export const detectMobile = () =>
  navigator.userAgent.toLowerCase().indexOf('mobile') > 0 ? true : false
