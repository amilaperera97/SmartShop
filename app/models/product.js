class Product {
  constructor(id, ownerId, title, imageUrl, description, price, quantity) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}

export default Product;
