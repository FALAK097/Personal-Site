/* eslint-disable no-unused-vars */
"use client";

import React, {useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/hooks/use-toast";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // Add your form submission logic here
      console.log(data);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      event.currentTarget.reset();
    } catch (_) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input required disabled={isLoading} id="name" name="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            required
            disabled={isLoading}
            id="email"
            name="email"
            placeholder="Your email"
            type="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="subject">
          Subject
        </label>
        <Input
          required
          disabled={isLoading}
          id="subject"
          name="subject"
          placeholder="What is this regarding?"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <Textarea
          required
          className="min-h-[150px]"
          disabled={isLoading}
          id="message"
          name="message"
          placeholder="Your message"
        />
      </div>
      <Button className="w-full" disabled={isLoading} type="submit">
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
