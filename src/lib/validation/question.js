import { z } from "zod"
 
export const questionSchema = z.object({
  question: z.string().min(1, {
    message: "Question is required.",
  }),
})
