"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/schemas/contact.schema";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CustomPhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
const ContactUs = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
      defaultValues: {
      services: "",   
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          message: {
            subject: `Leads from Contact Us Page`,
            body: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Services: ${data.services}

Project Details:
${data.details}
          `,
          },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

   reset();
        toast.success("Your message has been sent successfully " ,{
      className: "bg-[#48057D]! border-[#48057D]! text-white!",
      position: "top-center",

    } );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <Image
        src={"/images/blue-hue.png"}
        alt="bg"
        width={1500}
        height={1500}
        className="absolute z-20 top-0 w-screen  left-0  object-cover"
      />
      {/* <Image
        src={"/images/contact-us/grad.png"}
        alt="bg"
        width={1200}
        height={1200}
        className="absolute z-10 top-0 w-screen  left-0  object-cover"
      /> */}
      <div className="max-w-screen-2xl mx-auto relative py-20 z-20">
        <h1 className="text-3xl md:text-6xl leading-[1.2] md:w-[40%] w-full mx-auto text-center font-bold">
          Wondering if Dexnive is the right fit?
        </h1>
        <p className="text-base md:w-[40%]  w-[95%] pt-4 mx-auto text-center">
          Talk to our team today and make your decision. Because the best
          partnerships start with the right questions, not rushed decisions.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[50%] w-[95%] mx-auto  space-y-6 mt-24"
        >
          {/* Name + Email */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full space-y-1">
              <label className="text-sm  font-medium text-white">
                Who’s Behind This Idea?
              </label>
              <input
                {...register("name")}
                placeholder="Name"
                className="w-full mt-1 outline-none rounded-lg border border-[#840ECD] bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:ring-1 focus:ring-purple-500"
              />
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="w-full space-y-1">
              <label className="text-sm font-medium text-white">
                Where Can We Reach You?
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="Email"
                className="w-full mt-1 outline-none rounded-lg border border-[#840ECD] bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:ring-1 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone + Services */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full space-y-1">
              <label className="text-sm font-medium text-white">
                Where Can We Connect With You?
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <CustomPhoneInput
                    {...field}
                    placeholder="Number"
                    defaultCountry="US"
                    className="w-full mt-1 rounded-lg border border-[#840ECD] bg-white/10 text-sm text-white focus-within:ring-1 focus-within:ring-purple-500"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>

            <div className="w-full space-y-1">
              <label className="text-sm font-medium text-white">
                What Are You Looking For?
              </label>

              <Controller
                name="services"
                
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""} // ensure default is string, not undefined
                  >
                    <SelectTrigger className="w-full  mt-1 rounded-lg outline-none border border-[#840ECD] bg-white/10 py-5.5 text-white placeholder:text-white/40 focus:ring-purple-500">
                      <SelectValue
                        defaultValue={""}
                        placeholder="Select a service"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-[#840ECD] z-30 top-12">
                      <SelectGroup>
                        <SelectItem value="Web App Development">
                          Web App Development
                        </SelectItem>
                        <SelectItem value="Mobile App Development">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="Custom Software Development">
                          Custom Software Development
                        </SelectItem>
                        <SelectItem value="BPO Services">
                          BPO Services
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.services && (
                <p className="text-xs text-red-400">
                  {errors.services.message}
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white">
              Tell Us About Your Idea
            </label>
            <textarea
              {...register("details")}
              rows={3}
              placeholder="Project Details"
              className="w-full outline-none mt-1 rounded-lg border border-[#840ECD] bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:ring-1 focus:ring-purple-500"
            />
            {errors.details && (
              <p className="text-xs text-red-400">{errors.details.message}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            {" "}
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className=" mt-1 h-4 w-10 appearance-none rounded border-2 border-purple-600 bg-transparent checked:bg-purple-600 checked:before:content-['✓'] checked:before:text-white checked:before:text-[12px] checked:before:font-bold checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full checked:before:absolute relative focus:outline-none focus:ring-0 outline-none focus:ring-purple-500 "
            />{" "}
            <label
              htmlFor="terms"
              className={cn(
                "text-sm text-white/70",
                errors.terms && "text-red-400",
              )}
            >
              {" "}
              By checking this box, I agree to receive SMS from Dexnive at the phone number provided. Msg & data rates may
                  apply. Msg frequency varies. For help, reply HELP or email us
                  at hello@dexnive.com. You can opt out at any time by
                    replying STOP. Privacy & Policy & Terms & Conditions.{" "}
            </label>{" "}
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer flex mx-auto mt-16 px-8 items-center justify-center rounded-full bg-linear-to-r from-[#840ECD] to-[#53029B] py-3 text-lg font-medium text-white disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Let's Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
