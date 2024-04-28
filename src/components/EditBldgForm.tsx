//@ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { useCallback, useRef, useState } from "react";
import { ConfigProvider, DatePicker } from "antd";
import { FormSchema } from "@/lib/types";
import { schools, locations } from "@/data/data.js";
import { z } from "zod";
import moment from "moment";
import dayjs from "dayjs";

import axios from "../../api/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { useBuildingContext } from "../hooks/useBuildingContext";

function EditBldgForm() {
  const { building, dispatch } = useBuildingContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      school: building && building.school,
      name: building && building.name,
      location: building && building.location,
      year: building && building.year,
      storey: building && building.storey,
      building_type: building && building.building_type,
      structure_type: building && building.structure_type,
      occupancy: building && building.occupancy,
      rvs_score: building && building.rvs_score,
      vulnerability: building && building.vulnerability,
      physical_conditions: building && building.physical_conditions,
      compliance: building && building.compliance,
      remarks: building && building.remarks,
      mitigation_actions: building && building.mitigation_actions,
    },
  });
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    setError,
  } = form;

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [year, setYear] = useState("");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // e.preventDefault();
    data["year"] = year;

    try {
      const response = await axios.put(`/edit/${id}`, data);
      console.log("Response:", response.data);
      dispatch({ type: "SET_BUILDING", payload: response.data });
    } catch (error) {
      console.error("Error:", error);
      // const errorMsg = error.response.data.error;
      // setError("name", {
      //   type: "server",
      //   message: errorMsg,
      // });
    }
  }

  if (isSubmitSuccessful) {
    toast({
      title: "Successfully updated building.",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
  }
  // console.log(errors);

  // Deleting building

  const deleteBldg = async () => {
    try {
      const response = await axios.delete(`/${id}`);
      console.log("Response:", response.data);
      if (response) {
        toast({
          title: "Successfully deleted building!",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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
                        : building && building.school}
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
              <label className="text-sm font-medium" htmlFor="year">
                Year Established
              </label>
              <FormControl>
                <ConfigProvider theme={{ token: { colorPrimary: "#16a34a" } }}>
                  <DatePicker
                    // status={
                    //   isSubmitted == undefined || year == "" ? "error" : ""
                    // }
                    defaultValue={
                      building && building.year
                        ? dayjs(`'${building && building.year}'`)
                        : ""
                    }
                    className="w-full py-2 font-['Poppins'] focus:outline-primary"
                    picker="year"
                    id="year"
                    // value={building && building.year}
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
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Location</FormLabel>
              <Popover open={openLocation} onOpenChange={setOpenLocation}>
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
                        ? locations.find(
                            (location) => location.value === field.value,
                          )?.label
                        : building && building.location}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 sm:w-[38rem]">
                  <Command>
                    <CommandInput placeholder="Search school..." />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {locations.map((location) => (
                          <CommandItem
                            value={location.label}
                            key={location.value}
                            onSelect={() => {
                              form.setValue("location", location.value);

                              setOpenLocation(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                location.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {location.label}
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
          name="storey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Storey</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="" {...field} />
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
          name="mitigation_actions"
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
        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Save Changes"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button type="button" variant="destructive">
                Delete Building
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  building and remove the data from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBldg}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
}

export default EditBldgForm;
