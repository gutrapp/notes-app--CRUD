import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  getNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany();
  }),
  createNote: publicProcedure.input(z.object({
    title: z.string().max(80),
    content: z.string()
  })).mutation(async ({ input: { title, content }, ctx }) => {
    return await ctx.prisma.note.create({
      data: {
        content,
        title
      }
    })
  }),
  deleteNote: publicProcedure.input(z.object({
    id: z.string()
  }))
  .mutation(async ({ input: { id }, ctx }) => {
    return await ctx.prisma.note.delete({
      where: {
        id
      }
    })
  }),
  updateNote: publicProcedure.input(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
  })).mutation(async ({ input: { id, title, content }, ctx }) => {
    return await ctx.prisma.note.update({
      where: {
        id
      },
      data: {
        title,
        content
      }
    })
  }),
  getNoteById: publicProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input: { id }, ctx}) => {
    return await ctx.prisma.note.findUnique({
      where: {
        id
      }
    })
  })
});
