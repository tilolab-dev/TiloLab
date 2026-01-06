import type { IProduct } from "./product";

export interface ICategoryTranslation {
  id: number;
  categoryId: number;
  language: string;
  title: string;
  description?: string;
  groupText?: string;
}
export interface ICategory {
  id: number;
  group: string;
  listPosition: number;
  parentId?: number;
  visible: boolean;
  categoryImg: string;

  products: IProduct[];
  translations: ICategoryTranslation[];
}
