"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/actions/send-email";
import { contactFormSchema } from "@/lib/schema";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const response = await sendContactEmail(formData);

    if (response.success) {
      toast({
        title: "Message sent!",
        description: "I'll get back to you soon.",
      });
      reset();
    } else {
      toast({
        title: "Not so fast!",
        description: response.error || "Something went wrong. Try again later.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            {...register("name")}
            disabled={loading}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-sm text-purple-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            {...register("email")}
            disabled={loading}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-purple-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="subject">Subject</label>
        <Input
          id="subject"
          {...register("subject")}
          disabled={loading}
          placeholder="Enter the subject"
        />
        {errors.subject && (
          <p className="text-sm text-purple-500">{errors.subject.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <Textarea
          id="message"
          {...register("message")}
          disabled={loading}
          placeholder="Enter your message"
        />
        {errors.message && (
          <p className="text-sm text-purple-500">{errors.message.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="outline"
        disabled={loading}
        className="hover:bg-transparent hover:border-purple-400"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
