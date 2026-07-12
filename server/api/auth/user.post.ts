import { prisma } from "@/prisma/prisma";
import { serverSupabaseUser } from "#supabase/server";
import { waitForDbConnection } from "~/server/utils/dbHealthCheck";
// import { Prisma } from "@/prisma/generated/client";

export default defineEventHandler(async (event) => {
  const isDbConnected = await waitForDbConnection(3000);

  if (!isDbConnected) {
    throw createError({
      statusCode: 503,
      statusMessage: "Database temporarily unavailable"
    });
  }

  const maxRetries = 3;
  const retryDelay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const supabaseUser = await serverSupabaseUser(event);

      if (!supabaseUser) {
        return {
          error: "Not authenticated"
        };
      }

      const metadata = supabaseUser.user_metadata ?? {};

      const include = {
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
      };

      let user = await prisma.user.findUnique({
        where: {
          email: supabaseUser.email!
        },
        include
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            username: metadata.given_name || supabaseUser.email!,
            userFamily: metadata.family_name || null,
            phoneNumber: metadata.phone_number || null,
            fullName: `${metadata.full_name}`,
            email: supabaseUser.email!,
            role: "user"
          },
          include
        });

        return { user };
      }

      const updateData: {
        username?: string;
        userSurname?: string;
        phoneNumber?: string;
        fullName?: string;
      } = {};

      if (!user.username && metadata.full_name) {
        updateData.username = metadata.full_name;
      }

      if (!user.userSurname && metadata.last_name) {
        updateData.userSurname = metadata.last_name;
      }

      if (!user.phoneNumber && metadata.phone_number) {
        updateData.phoneNumber = metadata.phone_number;
      }

      if (!user.fullName && metadata.full_name && metadata.last_name) {
        updateData.fullName = `${metadata.full_name} ${metadata.last_name}`;
      }

      if (Object.keys(updateData).length > 0) {
        user = await prisma.user.update({
          where: {
            id: user.id
          },
          data: updateData,
          include
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

      await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
    }
  }
});
