"use client";
// * Global/Package Imports
import { Info, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { v4 as generateUUID } from "uuid";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// * Local Imports
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ContactData, EventHandler } from "@/types/contactData";
// import { generateUUID } from "@/actions/generateId";
import { InputCard } from "@/components/input-card";
import { TextAreaCard } from "@/components/textarea-card";
import { SelectCard } from "@/components/select-card";
import useContactForm from "@/hooks/use-contact";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactForm({
  params,
}: {
  params: { formId: string };
}) {
  // let initialData: ContactData;
  const store = useContactForm();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContactData>(
    params.formId == "new"
      ? {
          id: undefined,
          firstName: undefined,
          middleName: undefined,
          lastName: undefined,
          reason: undefined,
          email: undefined,
          phone: undefined,
          subject: undefined,
          message: undefined,
          termsAccepted: false,
        }
      : store.getItem(params.formId)
  );

  // if (params.formId != "new") {
  //   initialData = store.getItem(params.formId);
  // } else {
  //   initialData = {
  //     id: undefined,
  //     firstName: undefined,
  //     middleName: undefined,
  //     lastName: undefined,
  //     reason: undefined,
  //     email: undefined,
  //     phone: undefined,
  //     subject: undefined,
  //     message: undefined,
  //     termsAccepted: false,
  //   };
  // }

  const router = useRouter();

  const [errors, setErrors] = useState<any>({});
  const [contactList, setContactList] = useState<ContactData[]>([]);

  const formSchema = yup.object().shape(
    {
      id: yup.string().required(),
      firstName: yup
        .string()
        .trim()
        .required("!firstName: First name is required!")
        .min(3, "!firstName: Minimum 3 characters required!")
        .max(20, "!firstName: Name must not exceed 20 characters!"),
      middleName: yup
        .string()
        .trim()
        .optional()
        .min(3, "!middleName: Minimum 3 characters required!")
        .max(20, "!middleName: Name must not exceed 20 characters!"),
      lastName: yup
        .string()
        .trim()
        .required("!lastName: Last name is required!")
        .min(3, "!lastName: Minimum 3 characters required!")
        .max(20, "!lastName: Name must not exceed 20 characters!"),
      reason: yup
        .string()
        .required("!reason: Select one reason!")
        .oneOf(
          ["Inquiry", "Feedback", "Complain", "Other"],
          "!reason: Please select any value!"
        ),
      email: yup
        .string()
        .trim()
        .when(["phone"], {
          is: (phone: string) => !phone,
          then: (schema) =>
            schema.email().required("!email: Email id is required!"),
          otherwise: (schema) => schema.email().optional(),
        }),
      phone: yup
        .string()
        .trim()
        .when(["email"], {
          is: (email: string) => !email,
          then: (schema) =>
            schema
              .required("!phone: Phone Number is required!")
              .matches(
                /^0{1}[0-9]{7,11}$/,
                "!phone: Format must be 03xx xxxxxxx"
              )
              .min(7, "!phone: Phone Number must be at least 7 digits")
              .max(15, "!phone: Phone Number must be less than 15 digits"),
          otherwise: (schema) =>
            schema
              .optional()
              .matches(
                /^0{1}[0-9]{7,11}$/,
                "!phone: Format must be 03xx xxxxxxx"
              )
              .min(7, "!phone: Phone Number must be at least 7 digits")
              .max(15, "!phone: Phone Number must be less than 15 digits"),
        })
        .min(7, "!phone: Phone Number must be at least 7 digits")
        .max(15, "!phone: Phone Number must be less than 15 digits"),
      subject: yup
        .string()
        .trim()
        .required("!subject: Subject is required!")
        .min(6, "!subject: Subject must consist of more than 6 characters").max(36, "!subject: Subject must be less than 36 characters"),
      message: yup
        .string()
        .trim()
        .required("!message: Message is required!")
        .min(30, "!message: Message must consist of more than 30 characters"),
      termsAccepted: yup
        .boolean()
        .required("!termsAccepted: Accept our terms to submit this form.")
        .nope([false], "!termsAccepted: Accept our terms to submit this form."),
    },
    [["phone", "email"]]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onChangeHandler = (e: EventHandler) => {
    setData({
      ...data,
      [e.target.name]: e.target.value != "" ? e.target.value : undefined,
    });
  };

  const onClickHandler = async () => {
    setErrors({});

    const randomUUID = generateUUID();
    setData({ ...data, id: randomUUID });

    try {
      // console.log(result);

      // if (!result) {
      //   return;
      // }

      if (params.formId == "new") {
        const result = await formSchema.validate(data, { abortEarly: false });
        store.addItem(data);
      } else {
        const result = await formSchema.validate(data, { abortEarly: false });
        store.modifyItem(params.formId, data);
      }

      router.push("/");
    } catch (err: any) {
      let { errors } = err;

      let errObj: any = {};

      errors.forEach((error: string) => {
        let splitErr: string[] = error.split(":");
        splitErr = splitErr.map((item) => item.trim());
        if (splitErr[0] in errObj) {
          errObj[splitErr[0]].push(splitErr[1]);
        } else {
          errObj[splitErr[0]] = [splitErr[1]];
        }
      });

      setErrors(errObj);
      console.log(errObj);
      console.log(typeof errObj);
    }
  };

  return (
    <div className="space-y-4 p-8">
      {/* Content Header */}
      <div className="flex items-center justify-between">
        <Heading title="Contact Us" description="Tell us what you think" />
        {data.id && (
          <Button
            variant={"destructive"}
            disabled={loading}
            size={"icon"}
            onClick={() => {}}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />

      <div className="space-y-8 w-full">
        <div className="flex flex-col gap-8 w-[36rem] max-w-full mx-auto py-4">
          <div className="grid grid-cols-2 gap-8 max-[480px]:grid-cols-1">
            <InputCard
              name="firstName"
              label="First Name"
              required
              error={errors["!firstName"]}
              onChangeHandler={onChangeHandler}
              value={data["firstName"]}
            />

            <InputCard
              name="middleName"
              label="Middle Name"
              error={errors["!middleName"]}
              onChangeHandler={onChangeHandler}
              value={data["middleName"]}
            />

            <InputCard
              name="lastName"
              label="Last Name"
              required
              error={errors["!lastName"]}
              onChangeHandler={onChangeHandler}
              value={data["lastName"]}
            />

            <SelectCard
              error={errors["!reason"]}
              onValueChange={(value) => setData({ ...data, reason: value })}
              value={data["reason"]}
            />
          </div>

          <div className="border border-dashed grid grid-cols-2 max-md:grid-cols-2 max-[480px]:grid-cols-1 gap-8 p-4 max-[900px]:col-span-2 rounded-md relative">
            <h3 className="text-xs font-semibold bg-white rounded-full absolute top-[-9px] left-4 px-2">
              Fill one of these
            </h3>

            <InputCard
              name="email"
              label="Email Address"
              required={data.phone == undefined}
              error={errors["!email"]}
              onChangeHandler={onChangeHandler}
              value={data["email"]}
            />

            <InputCard
              name="phone"
              label="Phone Number"
              required={data.email == undefined}
              error={errors["!phone"]}
              onChangeHandler={onChangeHandler}
              value={data["phone"]}
            />
          </div>

          <InputCard
            name="subject"
            label="Subject"
            required
            error={errors["!subject"]}
            onChangeHandler={onChangeHandler}
            value={data["subject"]}
          />

          <TextAreaCard
            name="message"
            label="Message"
            required
            error={errors["!message"]}
            onChangeHandler={onChangeHandler}
            value={data["message"]}
          />

          <div className="items-start flex space-x-2">
            <Checkbox
              id=""
              onCheckedChange={(e) => setData({ ...data, termsAccepted: e })}
              checked={data["termsAccepted"] == true ? true : false}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor=""
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  !!errors["!termsAccepted"] && "text-destructive"
                )}
              >
                Accept terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

          <Button onClick={onClickHandler}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
