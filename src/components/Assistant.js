// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { questionSchema } from "@/lib/validation/question";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// export default function Assistant() {
//   // 1. Define your form.
//   const form = useForm({
//     resolver: zodResolver(questionSchema),
//     defaultValues: {
//       question: "",
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="question"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Question</FormLabel>
//               <FormControl>
//                 <Input placeholder="Question..." {...field} />
//               </FormControl>
//               <FormDescription>Ask a question...</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

'use client';

import { useChat } from 'ai/react';

export default function Assistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="border-2 flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}