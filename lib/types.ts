export interface ProductImage {
  id: string;
  imageUrl: string;
  imageType: 'front' | 'back' | 'side' | 'detail' | 'lifestyle';
  displayOrder: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductDimensions {
  height: number;
  width: number;
  length: number;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  subcategory: string;
  usageType: 'Residential' | 'Commercial' | 'Outdoor';
  price: number;
  stock: number;
  dimensions: ProductDimensions;
  woodType: string;
  finishType: string;
  shortDesc: string;
  longDesc: string;
  images: ProductImage[];
  reviews: ProductReview[];
  has360View: boolean;
  hasVideo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomProject {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
}

export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  description?: string;
}
