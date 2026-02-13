import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { noteId } = body;

  if (!noteId) {
    return {
      statusCode: 404,
      message: "Note Id is required",
      data: []
    };
  }

  try {
    const deleteNoteRes = await prisma.adminNotification.delete({
      where: {
        id: noteId
      }
    });

    return {
      statusCode: 200,
      message: `Success`,
      data: deleteNoteRes
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`,
      data: []
    };
  }
});
