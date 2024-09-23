"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import { ArrowUpDown } from "lucide-react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColumnDef } from "@tanstack/react-table";

const searchFormSchema = z
  .object({
    query: z.string().optional(),
    intitle: z.string().optional(),
    inauthor: z.string().optional(),
  })
  .refine((data) => data.query || data.intitle || data.inauthor, {
    message: "At least one field must be filled out",
    path: ["query"],
  });

type SearchFormData = z.infer<typeof searchFormSchema>;

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "thumbnail",
    header: "Cover",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail || "https://via.placeholder.com/130x200"}
        alt={row.original.title}
        style={{ maxWidth: "75px", maxHeight: "100px", objectFit: "cover" }}
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "authors",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Authors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categories
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export const SearchBox = () => {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      intitle: "",
      inauthor: "",
    },
  });

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SearchFormData) => {
    setLoading(true);
    setError(null);
    setResults([]);

    const params = new URLSearchParams();

    if (data.query) params.append("query", data.query);
    if (data.intitle) params.append("intitle", data.intitle);
    if (data.inauthor) params.append("inauthor", data.inauthor);

    try {
      const response = await fetch(
        `/api/book-search/search?${params.toString()}`
      );

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error || "An error occurred");
      } else {
        const resultData = await response.json();
        setResults(resultData);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl space-y-4 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <div className="flex justify-between space-x-4">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Search query" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
                <AccordionTrigger />
              </div>
              <AccordionContent>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="intitle"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center space-x-2">
                          <FormLabel>Title:</FormLabel>
                          <FormControl>
                            <Input placeholder="Search by title" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inauthor"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center space-x-2">
                          <FormLabel>Author:</FormLabel>
                          <FormControl>
                            <Input placeholder="Search by author" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 && (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={results} />
        </div>
      )}
    </div>
  );
};
