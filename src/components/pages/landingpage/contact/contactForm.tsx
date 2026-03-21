"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-primaryT mb-5 font-medium text-2xl leading-8">
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-[#1B2E5E1A] rounded-[16px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:primaryT focus:border-transparent"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border border-[#1B2E5E1A] rounded-[16px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:primaryT focus:border-transparent"
            required
          />
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#1B2E5E1A] rounded-[16px] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:primaryT focus:border-transparent"
            required
          >
            <option value="">Select a subject</option>
            <option value="general inquiry">General Inquiry</option>
            <option value="loan query">Loan Query</option>
            <option value="membership">Membership</option>
            <option value="technical support">Technical Support</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows={6}
            className="w-full px-4 py-2 border border-[#1B2E5E1A] rounded-[16px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:primaryT focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 px-4 cursor-pointer text-white font-medium rounded transition-colors duration-200"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800">
            Error sending message. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
