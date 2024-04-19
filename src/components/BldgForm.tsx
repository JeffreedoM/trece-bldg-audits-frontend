"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ConfigProvider, DatePicker } from "antd";
import { FormSchema } from "@/lib/types";
import { schools } from "@/data/schools";
import { z } from "zod";

type BldgForm = {
  openAddBldgForm: boolean;
  setOpenAddBldgForm: boolean;
};

export default function BldgForm({
  openAddBldgForm,
  setOpenAddBldgForm,
}: BldgForm) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
  } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setOpenAddBldgForm(false);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  }
  console.log(errors);
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>School</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? schools.find((school) => school.value === field.value)
                            ?.label
                        : "Select school"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 sm:w-[38rem]">
                  <Command>
                    <CommandInput placeholder="Search school..." />
                    <CommandEmpty>No school found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {schools.map((school) => (
                          <CommandItem
                            value={school.label}
                            key={school.value}
                            onSelect={() => {
                              form.setValue("school", school.value);

                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                school.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {school.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium" htmlFor="birthdate">
                Year Established
              </label>
              <FormControl>
                <ConfigProvider theme={{ token: { colorPrimary: "#16a34a" } }}>
                  <DatePicker
                    // status={
                    //   isSubmitted == undefined || year == "" ? "error" : ""
                    // }
                    className="w-full py-2 font-['Poppins'] focus:outline-primary"
                    picker="year"
                    onChange={(date, dateString) => {
                      setYear(dateString);
                    }}
                  />
                </ConfigProvider>
              </FormControl>
              {/* <p className="text-sm font-medium text-destructive">
                {isSubmitted == undefined || year == "" ? "Required" : ""}
              </p> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Storey</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="building_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Building</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="structure_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Structure</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occupancy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Design Occupancy</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Separator className="mb-3 mt-6" /> */}
        <h3 className="my-4 font-semibold">Summary Report</h3>

        <FormField
          control={form.control}
          name="rvs_score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RVS Score</FormLabel>
              <FormControl>
                <Input type="number" step={0.1} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vulnerability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vulnerability</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physical_conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Conditions</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="compliance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compliance to Accessibility Law (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks for Compliance to Accessibility Law</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hazard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hazard/Risk Mitigation Actions</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
