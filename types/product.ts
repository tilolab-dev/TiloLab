export interface ProductImg {
  id: number;
  imgId: number;
  path: string;
}

export interface Category {
  id: number;
  group: string;
  listPosition: number;
  visible: boolean;
  categoryImg: string | null;
  parentId?: number | null;
}

export interface ProductOptions {
  id: number;
  optionId: number;
  optionImg: string;
  optionPrice?: number | null;
  optionTranslations: ProductOptionTranslation[];
}

export interface ProductOptionTranslation {
  id: number;
  productId: number;
  language: string;
  title: string;
  productDescription?: string;
  productColor: string;
  productMaterial: string;
  productManufacture?: string;
}

export interface IProduct {
  id: number;
  categoryId: number;
  visible: boolean;
  stockState: boolean;
  stockValue?: number | null;
  stockReserved?: number | null;
  discountPercent?: number | null;
  productPrice: number | string;
  productSize: string;

  img: ProductImg[];
  options: ProductOptions[];
  translations: ProductOptionTranslation[];
  category: Category;
}
