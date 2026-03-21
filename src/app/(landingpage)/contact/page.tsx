import { ContactForm } from "@/components/pages/landingpage/contact/contactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
const ContactUs = [
  {
    id: 1,
    icon: MapPin,
    title: "Office Address",
    text: "Redeemer's University, Akoda, Ede, Osun State",
  },
  { id: 2, icon: Phone, title: "Phone Number ", text: "+234 803 123 4567" },
  {
    id: 3,
    icon: Mail,
    title: "Email Address",
    text: "cooperative@run.edu.ng",
  },
  {
    id: 4,
    icon: Clock,
    title: "Office Hours",
    text: "Monday - Friday: 9:00 AM - 4:00 PM",
  },
];

export default function CantactUsPage() {
  return (
    <div className="w-full font-sans lg:py-18 md:py-14 py-12 px-4 md:px-8">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-primaryT md:text-4xl text-2xl leading-10 font-medium text-center">
              Contact Us
            </h2>
            <p className="text-[#64748B] leading-6 text-base max-w-166 text-center">
              Have questions or need assistance? We're here to help. Reach out
              to us using the information below or send us a message.
            </p>
          </div>
          <div className="grid md:grid-cols-2 md:gap-5 gap-8 px-6">
            <div className="space-y-6">
              <h3 className="text-primaryT font-medium text-2xl leading-8">
                Get in Touch
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {ContactUs.map((info) => (
                  <div className="flex gap-4 items-start " key={info.id}>
                    <div className="py-3 px-3 w-fit rounded-[12px] bg-[#1B2E5E1A]">
                      <info.icon color="#1B2E5E" size={20} />
                    </div>
                    <div>
                      <div className="text-primaryT text-sm leading-5">
                        {info.title}
                      </div>
                      <p className="max-w-150 text-[#64748B] leading-6">
                        {info.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
