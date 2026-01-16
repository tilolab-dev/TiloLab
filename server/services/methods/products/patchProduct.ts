// import supabase from "@/utils/supabase";
import { prisma } from "@/prisma/prisma";

async function patchProduct(id: number, event: any) {
  const body = await readBody(event);

  console.log(body, "body");
  console.log(id, "id");

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "Invalid id" });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        categoryId: Number(body.categoryId),
        visible: Boolean(body.visibility),
        productPrice: Number(body.productPrice),
        stockState: Boolean(body.stockState),
        stockValue: Number(body.stockValue),
        discountPercent: Number(body.discountPercent),
        productSize: String(body.productSize),

        // TRANSLATIONS
        translations: {
          deleteMany: {},
          create:
            body.translations?.map((t: any) => ({
              language: t.language ?? "uk",
              title: t.title ?? "",
              productDescription: t.description ?? "",
              productColor: t.productColor ?? "",
              productMaterial: t.productMaterial ?? "",
              productManufacture: t.productManufacture ?? "-"
            })) || []
        },

        // IMAGES
        img: {
          deleteMany: {},
          create:
            body.img?.map((imgPath: string) => ({
              path: imgPath
            })) || []
        },

        // OPTIONS
        options: {
          deleteMany: {},
          create:
            body.options?.map((option: any) => ({
              optionImg: option.optionImg,
              optionPrice: Number(option.optionPrice) || 0,
              translations: {
                create:
                  option.translations?.map((tr: any) => ({
                    language: tr.language ?? "uk",
                    optionInfo: tr.optionInfo ?? ""
                  })) || []
              }
            })) || []
        }
      }
    });

    return {
      statusCode: 200,
      message: "Product updated successfully",
      data: updatedProduct
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Failed to update product",
      error
    };
  }
}

export default patchProduct;
