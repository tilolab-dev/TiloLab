// import { readMultipartFormData } from "h3";
// import path from "path";
import { prisma } from "@/prisma/prisma";
// import supabase from "@/utils/supabase";

interface IOptions {
  optionImg: string | null;
  optionPrice: number;
  translations: {
    language: string;
    title: string;
    description: string;
    productColor: string;
    productMaterial: string;
  };
}

async function addProduct(event: any) {
  const body = await readBody<{
    categoryId: number;
    visibility: boolean;
    img: string[];
    productPrice: number;
    stockState: boolean;
    stockValue: number;
    discountPercent: number;
    productSize: string;
    translations: any;
    options: IOptions[];
  }>(event);

  if (!body) {
    return {
      statusCode: 400,
      message: "No data received!"
    };
  }

  const { categoryId, productPrice, stockState, stockValue, translations } = body;

  if (
    categoryId === undefined ||
    productPrice === undefined ||
    stockValue === undefined ||
    stockState === undefined ||
    !translations ||
    typeof stockState !== "boolean"
  ) {
    console.log("Missing required fields!");

    return {
      statusCode: 400,
      message: "Missing required fields!"
    };
  }

  try {
    // const formData = await readMultipartFormData(event);

    // if (!formData) {
    //     return { message: 'No data received!' };
    // }

    // const textField = formData.find((field) => field.name === 'data');

    // if (!textField) {
    //     return {message: 'No product data found'}
    // }

    // const productData = JSON.parse(textField.data.toString());

    // console.log(productData)
    // return
    const newProduct = await prisma.product.create({
      data: {
        categoryId: Number(body.categoryId),
        visible: Boolean(body.visibility),
        productPrice: Number(body.productPrice),
        stockState: Boolean(body.stockState),
        stockValue: Number(body.stockValue),
        discountPercent: Number(body.discountPercent),
        productSize: String(body.productSize),

        translations: {
          create: body.translations.map((t: any) => ({
            language: t.language,
            title: t.title,
            productDescription: t.description,
            productColor: t.productColor,
            productMaterial: t.productMaterial,
            productManufacture: t.productManufacture
          }))
        },

        img: {
          create: body.img.map((imgPath: string) => ({
            path: imgPath
          }))
        },

        options: {
          create: body.options.map((option: any) => ({
            optionImg: option.fileImg[0] || null,
            optionPrice: Number(option.optionPrice),

            translations: {
              create: option.translations.map((tr: any) => ({
                language: tr.language,
                optionInfo: tr.optionInfo,
                productDescription: tr.description,
                productColor: tr.productColor,
                productMaterial: tr.productMaterial
              }))
            }
          }))
        }
      }
    });

    return {
      statusCode: 200,
      message: "Product created successfully",
      product: newProduct
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: `${error} something went wrong`
    };
  }
}

export default addProduct;
