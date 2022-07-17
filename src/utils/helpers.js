const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };


exports.parseObject = (data) => {

   return JSON.parse(JSON.stringify(data, getCircularReplacer()));

}


exports.parseProducts = (data) => {
    let newProducts = [];
    let products = JSON.parse(JSON.stringify(data, getCircularReplacer()));
    products.forEach(a => {
        const obj = {
          ...a,
          labels: a.labels.map(ab => { return ab.id }),
          folder: a.deletedAt ? 'trash' : 'products'
        }
          newProducts.push(obj);
        });
        return newProducts;
 }



