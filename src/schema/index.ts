import z from "zod";

const genre = z.enum(["ADVENTURE", "FANTASY", "SCI-FI", "ROMANCE", "HORROR"]);

export type Genre = z.infer<typeof genre>;

export const shortStoryChema = z.object({
  genre,
  wordLong: z.coerce.number().int().min(100).max(500),
});
