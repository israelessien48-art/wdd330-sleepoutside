function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    // Calculate depth from pathname: how many slashes indicate nesting
    // /index.html = root (0 levels deep)
    // /cart/index.html = 1 level deep
    // /product_pages/index.html = 1 level deep (not 2, trailing / doesn't count)
    const parts = window.location.pathname.split('/').filter(p => p && p !== 'index.html' && !p.includes('.html'));
    const depth = parts.length;
    const prefix = depth > 0 ? Array(depth + 1).join('../') : './';
    this.path = `${prefix}json/${category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
