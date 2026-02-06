import { prisma } from "@/prisma/prisma";
import { serverSupabaseUser } from "#supabase/server";
import { waitForDbConnection } from "~/server/utils/dbHealthCheck";

export default defineEventHandler(async (event) => {
  // Check database connection first
  const isDbConnected = await waitForDbConnection(3000);
  if (!isDbConnected) {
    throw createError({
      statusCode: 503,
      statusMessage: "Database temporarily unavailable"
    });
  }

  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const supabaseUser = await serverSupabaseUser(event);
      if (!supabaseUser) return { error: "Not authenticated" };

      let user = await prisma.user.findUnique({
        where: { email: supabaseUser.email! },
        include: {
          orders: {
            include: {
              orderItems: {
                include: {
                  product: {
                    include: {
                      img: true,
                      translations: true,
                      category: true
                    }
                  }
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
                    product: {
                      include: {
                        img: true,
                        translations: true,
                        category: true
                      }
                    }
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
    } catch (error) {
      console.error(`Attempt ${attempt} failed in /api/auth/user:`, error);

      if (attempt === maxRetries) {
        throw createError({
          statusCode: 500,
          statusMessage: "Database connection failed after retries"
        });
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
    }
  }
});
