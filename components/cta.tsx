"use client";

import { ContactFormValues, contactSchema } from "@/lib/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { CustomPhoneInput } from "./ui/phone-input";
import { toast } from "sonner";
interface Props {
  header: string;
  p: string;
  btnText: string;
  imgPath: string;
  service?: string;
}

export default function CallToAction({
  header,
  p,
  btnText,
  imgPath,
  service,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      services: service || "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: `Leads from CTA Form`,
            name: data.name,
            email: data.email,
            phone: data.phone,
            services: data.services,
            details: data.details,
          },
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong");

   toast.success("Your message has been sent successfully " ,{
      className: "bg-[#48057D]! border-[#48057D]! text-white!",
      position: "top-center",

    } );
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  return (
    <section className="relative py-32">
      <div className="absolute inset-0  -z-10 bg-linear-to-b from-black/10 via-[#500790] to-black/10 blur-3xl" />

      <div className="mx-auto md:w-[65%] max-w-screen-2xl rounded-2xl border border-white/10 bg-white/15 backdrop-blur-2xl p-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-stretch">
          {/* LEFT */}
          <div className="flex h-full flex-col justify-center">
            <h3 className="text-4xl font-semibold lg:pr-16 text-white">
              {header}
            </h3>

            <p className="mt-3 max-w-md text-base">{p}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              {/* Name + Email */}
              <div className="flex gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="w-full">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <CustomPhoneInput
                      {...field}
                      placeholder="Phone Number"
                      defaultCountry="US"
                      className="w-full rounded-lg border border-white/10 bg-white/10 text-sm text-white focus-within:ring-1 focus-within:ring-purple-500"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400">{errors.phone.message}</p>
                )}
              </div>

              {/* Services using ShadCN Select */}
              <Controller
                name="services"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full rounded-lg border border-white/10 bg-white/10 py-3 text-white placeholder:text-white/40 focus:ring-purple-500">
                      <SelectValue
                        placeholder="Select a service"
                        className="text-white"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-[#490077] z-30 top-12">
                      <SelectGroup>
                        <SelectItem value="Web App Development">
                          Web App Development
                        </SelectItem>
                        <SelectItem value="Mobile App Development">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="Custom Software">
                          Custom Software
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
                <p className="text-xs -mt-4 text-red-400">
                  {errors.services.message}
                </p>
              )}

              {/* Details */}
              <div className="w-full">
                <textarea
                  rows={3}
                  placeholder="Project Details"
                  {...register("details")}
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                {errors.details && (
                  <p className="text-xs text-red-400">
                    {errors.details.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                {" "}
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms")}
                  className=" mt-1 h-4 w-16 appearance-none rounded border-2 border-purple-600 bg-transparent checked:bg-purple-600 checked:before:content-['✓'] checked:before:text-white checked:before:text-[12px] checked:before:font-bold checked:before:flex checked:before:items-center checked:before:justify-center checked:before:w-full checked:before:h-full checked:before:absolute relative focus:outline-none focus:ring-0 outline-none focus:ring-purple-500 "
                />{" "}
                <label
                  htmlFor="terms"
                  className={cn(
                    "text-sm text-white/70",
                    errors.terms && "text-red-400",
                  )}
                >
                  {" "}
                  By checking this box, I agree to receive SMS from Dexnive at
                  the phone number provided. Msg & data rates may apply. Msg
                  frequency varies. For help, reply HELP or email us at
                  hello@dexnive.com. You can opt out at any time by replying
                  STOP. Privacy & Policy & Terms & Conditions.{" "}
                </label>{" "}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {" "}
                {isSubmitting ? "Submitting..." : `${btnText}`}
                <svg
                  width="32"
                  height="16"
                  viewBox="0 0 32 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  {" "}
                  <g style={{ mixBlendMode: "screen" }}>
                    {" "}
                    <rect
                      x="31.8071"
                      width="15.2675"
                      height="31.8072"
                      transform="rotate(90 31.8071 0)"
                      fill="url(#pattern0_40_3614)"
                    />{" "}
                  </g>{" "}
                  <defs>
                    {" "}
                    <pattern
                      id="pattern0_40_3614"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      {" "}
                      <use
                        xlinkHref="#image0_40_3614"
                        transform="matrix(0.0127564 -0.00722969 0.0150618 0.00612309 -0.849119 0.572321)"
                      />{" "}
                    </pattern>{" "}
                    <image
                      id="image0_40_3614"
                      width="100"
                      height="100"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,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"
                    />{" "}
                  </defs>{" "}
                </svg>{" "}
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center">
            <Image
              src={imgPath}
              alt="cta"
              width={760}
              height={820}
              className="md:block hidden rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
