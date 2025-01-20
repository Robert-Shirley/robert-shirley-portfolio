export type Rating = {
  rate: number;
  count: number;
};

export type ProductData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  inventoryCount: number;
  image: string;
  rating: Rating;
};

export type ProductCategory = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  inventoryCount: string;
  categoryId: string;
  ratings: Rating;
};
