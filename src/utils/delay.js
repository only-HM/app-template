const delay = (fun, data, time = 1500) => {
  new Promise(resolve => {
    let T = setTimeout(() => {
      fun && typeof fun === 'function' && fun(data);
      clearTimeout(T);
      T = null;
      resolve(`delay：${time}ms`);
    }, time);
  });
};
export default delay;