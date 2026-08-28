import type { IProduct } from "./product";

export interface ITagTranslation {
  id: number;
  tagId: number;
  language: string;
  title: string;
  description?: string;
  groupText?: string;
}
export interface ITag {
  id: number;
  group: string;
  listPosition: number;
  parentId?: number;
  visible: boolean;
  tagImg: string;

  products: IProduct[];
  translations: ITagTranslation[];
}
