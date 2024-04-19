"use client"

import { updateUsername } from "@/actions/user"
import { userSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { signOut } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { LoadingText } from "../site/loaders"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"

export default function UpdateUsernameForm({
  currentUsername
}: {
  currentUsername: string
}) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: ""
    }
  })

  async function onSubmit(values: z.infer<typeof userSchema>) {
    const res = await updateUsername(values.username)

    if (res.message === "success") {
      signOut()
      toast.message("Kindly login again!")
    } else {
      toast.error(res.message)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder={`@${currentUsername}`}
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                {field.value
                  ? "You will be logged out after changes are completed."
                  : "This will be used for sharing your team in public."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <LoadingText text="updating" className="text-primary-foreground" />
          ) : (
            "Change Username"
          )}
        </Button>
      </form>
    </Form>
  )
}
