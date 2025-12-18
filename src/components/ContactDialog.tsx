"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ScrollArea } from "./ui/scroll-area"

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packageTitle?: string | null
}

const serviceOptions = [
  "Starter Website",
  "Branding + Website",
  "Full Startup Package",
  "AI Integration",
  "Logo Design",
  "Graphics Pack",
  "Monthly Maintenance",
  "Not sure yet (help me choose)",
]

const designStyleOptions = ["Minimal + clean", "Bold + colorful", "Luxury + modern", "Fun + creative", "Not sure yet"]

const timelineOptions = ["ASAP", "1–2 weeks", "3–4 weeks", "Flexible"]

const budgetOptions = ["Under $150", "$150–$300", "$300–$600", "$600–$1,000+", "Not sure yet"]

const sourceOptions = ["Groupon", "Instagram", "TikTok", "Referral", "Other"]

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    businessName: z.string().optional(),
    serviceInterest: z.array(z.string()).min(1, "Please select at least one service"),
    websitePurpose: z.string().min(1, "Please specify the main purpose"),
    businessDescription: z.string().min(10, "Please describe your business (at least 10 chars)"),
    existingWebsite: z.enum(["yes", "no"]),
    existingWebsiteUrl: z.string().optional(),
    designStyle: z.array(z.string()).optional(),
    timeline: z.string().min(1, "Please select a timeline"),
    budget: z.string().min(1, "Please select a budget range"),
    source: z.string().min(1, "Please tell us how you heard about us"),
    additionalInfo: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.existingWebsite === "yes" && (!data.existingWebsiteUrl || data.existingWebsiteUrl.trim() === "")) {
        return false
      }
      return true
    },
    {
      message: "URL is required if you have an existing website",
      path: ["existingWebsiteUrl"],
    },
  )

type FormValues = z.infer<typeof formSchema>

export const ContactDialog = ({ open, onOpenChange, packageTitle }: ContactDialogProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      businessName: "",
      serviceInterest: [],
      websitePurpose: "",
      businessDescription: "",
      existingWebsite: "no",
      existingWebsiteUrl: "",
      designStyle: [],
      timeline: "",
      budget: "",
      source: "",
      additionalInfo: "",
    },
  })

  // Reset form when dialog opens/closes or packageTitle changes
  useEffect(() => {
    if (open) {
      if (packageTitle) {
        // You could pre-select a service based on packageTitle if it matches
        // For now, we'll just leave it clean or user can select manually
        // Or if you want to pre-fill the "serviceInterest" based on packageTitle:
        // const match = serviceOptions.find(s => packageTitle.includes(s));
        // if (match) form.setValue('serviceInterest', [match]);
      }
    } else {
      form.reset()
    }
  }, [open, packageTitle, form])

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    // Construct the formatted message
    const formattedMessage = `
Full Name: ${data.fullName}
Business Name: ${data.businessName || "N/A"}
Services Interested In: ${data.serviceInterest.join(", ")}

Main Purpose of Website/Project:
${data.websitePurpose}

Business Description:
${data.businessDescription}

Existing Website: ${data.existingWebsite === "yes" ? data.existingWebsiteUrl : "No"}

Preferred Design Style: ${data.designStyle && data.designStyle.length > 0 ? data.designStyle.join(", ") : "Not specified"}

Timeline: ${data.timeline}
Budget Range: ${data.budget}
Source: ${data.source}

Additional Info:
${data.additionalInfo || "N/A"}
    `.trim()

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          message: formattedMessage,
          type: "inquiry",
          packageTitle: packageTitle || "General Inquiry",
        }),
      })

      const resData = await response.json()

      if (!response.ok) {
        throw new Error(resData.error || "Failed to send inquiry")
      }

      toast.success("Inquiry sent successfully! We'll be in touch soon.")
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to send inquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 bg-zinc-950 text-white border-zinc-800 flex flex-col overflow-hidden">
        <DialogHeader className="px-4 py-3 sm:px-6 sm:py-4 border-b border-zinc-800 flex-shrink-0">
          <DialogTitle>Inquire about {packageTitle || "Services"}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Tell us about your project so we can create something amazing together.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* 1. Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-zinc-900 border-zinc-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. Email Address */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        className="bg-zinc-900 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 3. Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Business Name (if applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} className="bg-zinc-900 border-zinc-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 4. Service Interest (Checkboxes) */}
              <FormField
                control={form.control}
                name="serviceInterest"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-zinc-200">What service are you interested in?</FormLabel>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {serviceOptions.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="serviceInterest"
                          render={({ field }) => {
                            return (
                              <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(field.value?.filter((value) => value !== item))
                                    }}
                                    className="border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-zinc-300">{item}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 5. Website Purpose */}
              <FormField
                control={form.control}
                name="websitePurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">What’s the main purpose of your website or project?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: booking clients, selling products, portfolio..."
                        {...field}
                        className="bg-zinc-900 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 6. Business Description */}
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Briefly describe your business or idea.</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what makes your business unique..."
                        className="min-h-[100px] bg-zinc-900 border-zinc-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 7. Existing Website */}
              <FormField
                control={form.control}
                name="existingWebsite"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-zinc-200">Do you have an existing website?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" className="border-zinc-600 text-white fill-white" />
                          </FormControl>
                          <FormLabel className="font-normal text-zinc-300">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" className="border-zinc-600 text-white fill-white" />
                          </FormControl>
                          <FormLabel className="font-normal text-zinc-300">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("existingWebsite") === "yes" && (
                <FormField
                  control={form.control}
                  name="existingWebsiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-200">Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} className="bg-zinc-900 border-zinc-700" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* 8. Preferred Design Style */}
              <FormField
                control={form.control}
                name="designStyle"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-zinc-200">Preferred design style (optional):</FormLabel>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {designStyleOptions.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="designStyle"
                          render={({ field }) => {
                            return (
                              <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item])
                                        : field.onChange((field.value || []).filter((value) => value !== item))
                                    }}
                                    className="border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-zinc-300">{item}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 9. Timeline */}
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Timeline</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-300">
                          <SelectValue placeholder="Select a timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                        {timelineOptions.map((t) => (
                          <SelectItem key={t} value={t} className="focus:bg-zinc-800 focus:text-white">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 10. Budget */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Budget Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-300">
                          <SelectValue placeholder="Select a budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                        {budgetOptions.map((b) => (
                          <SelectItem key={b} value={b} className="focus:bg-zinc-800 focus:text-white">
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-zinc-500">Filters out the chaos.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 11. Source */}
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Where did you hear about ZeroRender?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-300">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                        {sourceOptions.map((s) => (
                          <SelectItem key={s} value={s} className="focus:bg-zinc-800 focus:text-white">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 12. Additional Info */}
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Anything else you'd like me to know?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Optional details..." className="bg-zinc-900 border-zinc-700" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-lg"
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
