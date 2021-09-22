// 1. 图片加载刷新频繁的防抖函数
export function debounce(func,delay){
  let timer=null
  return function (...args){        //...可以传多个参数
    if (timer) clearTimeout(timer)  //因为上面回调非常频繁，所以这里在延迟时间内不断删除timer
    timer=setTimeout(()=>{
      func.apply(this,args)         //真正执行刷新函数
    },delay)
  }
}

// 2. 解析时间戳
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
