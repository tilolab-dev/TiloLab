// import supabase from "@/utils/supabase";
import { prisma } from "@/prisma/prisma";

// async function patchProduct(id: number, event: any) {
//   const body = await readBody(event);

//   console.log(body, "body");
//   console.log(id, "id");

//   if (!body) {
//     return { statusCode: 400, message: "No data received" };
//   }

//   if (!Number.isInteger(id)) {
//     throw createError({ statusCode: 400, message: "Invalid id" });
//   }

//   // try {
//   //   const resPatchProduct = await prisma.product.update({
//   //     where: { id: +id },
//   //     data: {
//   //       categoryId: body.categoryId,
//   //       visible: body.visibility,
//   //       productPrice: body.productPrice,
//   //       stockState: body.stockState,
//   //       stockValue: body.stockValue,
//   //       discountPercent: body.discountPercent,
//   //       productSize: body.productSize,

//   //       img: {
//   //         deleteMany: {},
//   //         create: body.img.map((url: any) => ({
//   //           imgUrl: url
//   //         }))
//   //       },

//   //       options: {
//   //         deleteMany: {},
//   //         create: body.options.map((opt: any) => ({
//   //           optionImg: opt.fileImg[0],
//   //           optionPrice: opt.optionPrice,
//   //           translations: {
//   //             create: opt.translations.map((t: any) => ({
//   //               language: t.language,
//   //               optionInfo: t.optionInfo
//   //             }))
//   //           }
//   //         }))
//   //       },

//   //       translations: {
//   //         deleteMany: {},
//   //         create: body.translations.map((t: any) => ({
//   //           language: t.language,
//   //           title: t.title,
//   //           productDescription: t.description,
//   //           productColor: t.productColor,
//   //           productMaterial: t.productMaterial,
//   //           productManufacture: t.productManufacture
//   //         }))
//   //       }
//   //     }
//   //   });

//   //   return {
//   //     statusCode: 200,
//   //     message: "Product updated successfully",
//   //     data: resPatchProduct
//   //   };
//   //   // console.log(body);
//   // } catch (error) {
//   //   console.log(error);
//   //   return {
//   //     statusCode: 400,
//   //     message: "Failed to update product",
//   //     data: null
//   //   };
//   // }

//   try {
//     const updatedProduct = await prisma.product.update({
//       where: { id: Number(id) },

//       data: {
//         categoryId: Number(body.categoryId),
//         visible: Boolean(body.visibility),
//         productPrice: Number(body.productPrice),
//         stockState: Boolean(body.stockState),
//         stockValue: Number(body.stockValue),
//         discountPercent: Number(body.discountPercent),
//         productSize: String(body.productSize),

//         // translations: {
//         //   deleteMany: {},
//         //   create: body.translations.map((t: any) => ({
//         //     language: t.language,
//         //     title: t.title,
//         //     productDescription: t.description,
//         //     productColor: t.productColor,
//         //     productMaterial: t.productMaterial,
//         //     productManufacture: t.productManufacture
//         //   }))
//         // },
//         translations: {
//           deleteMany: {},
//           create:
//             body.translations?.map((t: any) => ({
//               language: t.language ?? "uk",
//               title: t.title ?? "",
//               productDescription: t.description ?? "",
//               productColor: t.productColor ?? "",
//               productMaterial: t.productMaterial ?? "",
//               productManufacture: t.productManufacture ?? "-"
//             })) || []
//         },

//         img: {
//           deleteMany: {},
//           create: body.img?.map((imgPath: string) => ({ path: imgPath })) || []
//         },

//         // options: {
//         //   deleteMany: {},
//         //   create: body.options.map((option: any) => ({
//         //     optionImg: option.fileImg[0],
//         //     optionPrice: Number(option.optionPrice),

//         //     translations: {
//         //       create: option.translations.map((tr: any) => ({
//         //         language: tr.language,
//         //         optionInfo: tr.optionInfo,
//         //         productDescription: tr.description,
//         //         productColor: tr.productColor,
//         //         productMaterial: tr.productMaterial
//         //       }))
//         //     }
//         //   }))
//         // }
//         options: {
//           deleteMany: {},
//           create:
//             body.options?.map((option: any) => ({
//               optionImg: option.optionImg,
//               optionPrice: Number(option.optionPrice) || 0,
//               translations: {
//                 create:
//                   option.translations?.map((tr: any) => ({
//                     language: tr.language ?? "uk",
//                     optionInfo: tr.optionInfo ?? "",
//                     productColor: tr.productColor ?? "",
//                     productMaterial: tr.productMaterial ?? "",
//                     productDescription: tr.description ?? ""
//                   })) || []
//               }
//             })) || []
//         }
//       }
//     });

//     return {
//       statusCode: 200,
//       message: "Product updated successfully",
//       product: updatedProduct
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       message: "Failed to update product",
//       error
//     };
//   }
// }

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
          deleteMany: {}, // удалить все старые переводы
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
          deleteMany: {}, // удалить старые картинки, если нужно заменить
          create:
            body.img?.map((imgPath: string) => ({
              path: imgPath
            })) || []
        },

        // OPTIONS
        options: {
          deleteMany: {}, // удалить старые опции
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
