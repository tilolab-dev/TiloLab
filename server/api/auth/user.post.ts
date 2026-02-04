import { prisma } from "@/prisma/prisma";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabaseUser = await serverSupabaseUser(event);
  if (!supabaseUser) return { error: "Not authenticated" };

  let user = await prisma.user.findUnique({
    where: { email: supabaseUser.email! },
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: true
            }
          },
          shippingInfo: true
        }
      },
      adresses: true
    }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: supabaseUser.user_metadata?.full_name || supabaseUser.email!,
        email: supabaseUser.email!,
        role: "user"
      },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                product: true
              }
            },
            shippingInfo: true
          }
        },
        adresses: true
      }
    });
  }

  return { user };
});
