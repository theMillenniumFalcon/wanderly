export const runtime = "edge";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { formSchema } from "@/lib/schema/formSchema";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromLocation: ""
    },
  })

  const onSubmit = () => {}

  return (
    <div className="w-full mt-8">
      <h1 className="md:text-4xl sm:text-3xl text-2xl mb-4 font-semibold">
        Wanderly
      </h1>
      <div className="text-muted-foreground">
        Check the project out on{" "}
        <a
          href="https://github.com/themillenniumfalcon/wanderly"
          target="_blank"
        >
          <Button className=" p-0 h-auto text-base" variant="link">
            GitHub
          </Button>
        </a>
        .
      </div>
      <Separator className="my-8" />
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 mb-24"
        >
          <FormField
            control={form.control}
            name="fromLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where are you travelling from?</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. New Delhi, IN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
