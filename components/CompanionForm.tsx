"use client"

import { z } from "zod"
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion is required" }).max(50),
    subject: z.string().min(1, { message: "subject is required" }).max(50),
    topic: z.string().min(1, { message: "topic is required" }).max(50),
    voice: z.string().min(1, { message: "voice is required" }).max(50),
    style: z.string().min(1, { message: "style is required" }).max(50),
    duration: z.coerce.number().min(1, { message: "duration is required" }).max(50),
}) 


type FormValues = z.infer<typeof formSchema>

const CompanionForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })
 
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Companion name</FormLabel>
                        <FormControl>
                            <input
                                className="w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your companion name"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                
            />
             <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                            <Select
                             onValueChange={field.onChange}
                             value={field.value}
                             defaultValue={field.value}>
                             
  <SelectTrigger className="w-[180px] input capitalize">
    <SelectValue placeholder="select subject" />
  </SelectTrigger>
  <SelectContent>
    {subjects.map((subject) => (
        <SelectItem 
        value={subject} 
        key={subject}
        className="capitalize">
            {subject}
        </SelectItem>
    ))}
  </SelectContent>
</Select>
                        </FormControl>
                    
                        <FormMessage />
                    </FormItem>
                )}
                
            />
             <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                            <textarea
                                className="w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Ex. Derivatives & Integrals"
                                {...field}
                            />
                        </FormControl>
                      
                        <FormMessage />
                    </FormItem>
                )}
                
            />
            <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voice</FormLabel>
                        <FormControl>
                            <Select
                             onValueChange={field.onChange}
                             value={field.value}
                             defaultValue={field.value}>
                             
  <SelectTrigger className="w-[180px] input">
    <SelectValue placeholder="Select the voice" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="male">
                    Male
    </SelectItem>
    <SelectItem value="female">
                    Female
    </SelectItem>
  </SelectContent>
</Select>
                        </FormControl>
                    
                        <FormMessage />
                    </FormItem>
                )}
                
            />
             
             <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>style</FormLabel>
                        <FormControl>
                            <Select
                             onValueChange={field.onChange}
                             value={field.value}
                             defaultValue={field.value}>
                             
  <SelectTrigger className="w-[180px] input">
    <SelectValue placeholder="Select a style" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Formal">
                    Formal
    </SelectItem>
    <SelectItem value="Informal">
                    Informal
    </SelectItem>
  </SelectContent>
</Select>
                        </FormControl>
                    
                        <FormMessage />
                    </FormItem>
                )}
                
            />
             <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estimated session duration in minutes</FormLabel>
                        <FormControl>
                            <input type="number"
                                className="input w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="15"
                                {...field}
                            />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                )}
                
            />
            <Button type="submit" className="w-full cursor-pointer mb-5">Build your companion</Button>
        </form>
    </Form>
    
  )
}

export default CompanionForm
