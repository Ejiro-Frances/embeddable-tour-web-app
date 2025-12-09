"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  Building,
  Phone,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.enum(["sales", "support", "partnership", "other"]),
});

type FormData = z.infer<typeof formSchema>;
type CategoryType = "sales" | "support" | "partnership" | "other";

const categories: Array<{
  value: CategoryType;
  label: string;
  color: string;
}> = [
  { value: "sales", label: "Sales Inquiry", color: "#eabe7b" },
  { value: "support", label: "Technical Support", color: "#f5c98e" },
  { value: "partnership", label: "Partnership", color: "#e0b068" },
  { value: "other", label: "Other", color: "#d4a35e" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("sales");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "sales",
    },
  });

  // Update both local state and form state
  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    setValue("category", category);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      reset();
      setIsSuccess(false);
      setSelectedCategory("sales"); // Reset category too
    }, 3000);
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm font-medium border-amber-300/20 accent-bg/10 accent-text"
          >
            <Send className="h-3 w-3 mr-2" />
            Get in Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Send Us a <span className="gradient-text">Message</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within 2
            hours
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm overflow-hidden border border-white/10">
            <CardContent className="p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 accent-bg/10">
                    <CheckCircle className="h-10 w-10 accent-text" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for contacting us. We&apos;ll get back to you
                    within 2 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="border-amber-300/30 accent-text hover:accent-bg/10"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Category Selection */}
                  <div>
                    <Label className="text-lg font-medium mb-4 block text-white">
                      What can we help you with?
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((category) => (
                        <motion.button
                          key={category.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategoryChange(category.value)}
                          className={`p-4 rounded-xl text-center transition-all font-medium ${
                            selectedCategory === category.value
                              ? "text-black"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                          style={
                            selectedCategory === category.value
                              ? { background: category.color }
                              : { background: "rgb(10 10 10)" }
                          }
                        >
                          {category.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-2 mb-2 text-gray-300"
                        >
                          <User className="h-4 w-4" />
                          Full Name *
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            placeholder="John Doe"
                            {...register("name")}
                            className={`pl-10 h-12 bg-white/5 border-white/10 ${
                              errors.name ? "border-red-500/50" : ""
                            }`}
                          />
                          {errors.name && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.name && (
                          <p className="text-sm text-red-400 mt-2">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="company"
                          className="flex items-center gap-2 mb-2 text-gray-300"
                        >
                          <Building className="h-4 w-4" />
                          Company
                        </Label>
                        <Input
                          id="company"
                          placeholder="Acme Inc."
                          {...register("company")}
                          className="pl-10 h-12 bg-white/5 border-white/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2 mb-2 text-gray-300"
                        >
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                            className={`pl-10 h-12 bg-white/5 border-white/10 ${
                              errors.email ? "border-red-500/50" : ""
                            }`}
                          />
                          {errors.email && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-400 mt-2">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="flex items-center gap-2 mb-2 text-gray-300"
                        >
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          {...register("phone")}
                          className="pl-10 h-12 bg-white/5 border-white/10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label
                      htmlFor="subject"
                      className="mb-2 block text-gray-300"
                    >
                      Subject *
                    </Label>
                    <div className="relative">
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        {...register("subject")}
                        className={`h-12 bg-white/5 border-white/10 ${
                          errors.subject ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.subject && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="text-sm text-red-400 mt-2">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label
                      htmlFor="message"
                      className="mb-2 block text-gray-300"
                    >
                      Message *
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or question..."
                        rows={5}
                        {...register("message")}
                        className={`resize-none bg-white/5 border-white/10 ${
                          errors.message ? "border-red-500/50" : ""
                        }`}
                      />
                      {errors.message && (
                        <div className="absolute right-3 top-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="text-sm text-red-400 mt-2">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-medium group relative overflow-hidden bg-gradient-to-r from-[#eabe7b] to-[#dd9222] hover:from-[#e3a84f] hover:to-[#c7841f] text-black"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      By submitting, you agree to our Privacy Policy
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
