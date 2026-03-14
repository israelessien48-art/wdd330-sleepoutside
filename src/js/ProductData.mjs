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
    // Determine correct path based on current document location
    const pathParts = document.currentScript?.src.split('/') || window.location.pathname.split('/');
    const isSrcFolder = pathParts.some(part => part === 'src');
    const jsonPath = isSrcFolder ? `../json/${this.category}.json` : `./json/${this.category}.json`;
    this.path = jsonPath;
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
