"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { formSchema } from "@/lib/schema/formSchema";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type DataType = {
  location: string;
  itinerary: string;
  flight: string;
} | null;

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromLocation: "",
      description: "",
      openai: "",
      serp: "",
    },
  })

  const [data, setData] = useState<DataType>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <div className="w-full mt-8">
      <h1 className="md:text-4xl sm:text-3xl text-2xl mb-4 font-semibold">
        Wanderly
      </h1>
      <div className="text-muted-foreground">
        Built with Next.js 14 on the edge, Cloudflare Workers &amp; Pages,
        OpenAI Function Calling, and Langchain. Check it out on{" "}
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your ideal trip:</FormLabel>
                <FormControl>
                  <Input placeholder="I want to go to..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pb-4 flex w-full sm:flex-row flex-col sm:space-y-0 space-y-4 sm:space-x-4 items-start">
            <FormField
              control={form.control}
              name="openai"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel>OpenAI key:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your API key" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create an OpenAI account, then find your key at{" "}
                    <a
                      href="https://platform.openai.com/account/api-keys"
                      target="_blank"
                    >
                      <Button
                        variant="link"
                        className="p-0 ml-0.5 text-xs h-auto"
                      >
                        https://platform.openai.com/account/api-keys
                      </Button>
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serp"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel>SerpApi key:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your API key" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a SerpApi account, then find your key at{" "}
                    <a
                      href="https://serpapi.com/manage-api-key"
                      target="_blank"
                    >
                      <Button
                        variant="link"
                        className="p-0 ml-0.5 text-xs h-auto"
                      >
                        https://serpapi.com/manage-api-key
                      </Button>
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} type="submit" size="lg">
            {loading ? "Generating..." : "Create travel plans"}
            {loading ? null : <ArrowRightIcon className="w-4 h-4 ml-3" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}