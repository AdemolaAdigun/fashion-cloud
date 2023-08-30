export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  category: string;

  constructor(public product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.image = product.image;
    this.brand = product.brand;
    this.category = product.category;
  }
}
