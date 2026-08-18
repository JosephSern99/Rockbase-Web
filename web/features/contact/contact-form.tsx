"use client";

import { useEffect, useId } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fieldChanged, formReset, submitContactForm } from "@/store/slices/contact-form-slice";
import { services } from "@/lib/site-config";
import type { ContactFormInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

function fieldError(errors: { field: string; message: string }[], field: keyof ContactFormInput) {
  return errors.find((error) => error.field === field)?.message;
}

export function ContactForm() {
  const dispatch = useAppDispatch();
  const { values, errors, status } = useAppSelector((state) => state.contactForm);
  const formId = useId();

  useEffect(() => {
    return () => {
      dispatch(formReset());
    };
  }, [dispatch]);

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-primary" />
        <p className="text-lg font-semibold text-foreground">Message sent.</p>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => dispatch(formReset())}>
          Send another message
        </Button>
      </div>
    );
  }

  const formLevelError = fieldError(errors, "_" as keyof ContactFormInput);

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void dispatch(submitContactForm());
      }}
      className="flex flex-col gap-5"
    >
      {formLevelError ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formLevelError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-fullName`}>Full name</Label>
          <Input
            id={`${formId}-fullName`}
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            aria-invalid={Boolean(fieldError(errors, "fullName"))}
            aria-describedby={fieldError(errors, "fullName") ? `${formId}-fullName-error` : undefined}
            onChange={(event) => dispatch(fieldChanged({ field: "fullName", value: event.target.value }))}
          />
          {fieldError(errors, "fullName") ? (
            <p id={`${formId}-fullName-error`} className="text-sm text-destructive">
              {fieldError(errors, "fullName")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-email`}>Email</Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            aria-invalid={Boolean(fieldError(errors, "email"))}
            aria-describedby={fieldError(errors, "email") ? `${formId}-email-error` : undefined}
            onChange={(event) => dispatch(fieldChanged({ field: "email", value: event.target.value }))}
          />
          {fieldError(errors, "email") ? (
            <p id={`${formId}-email-error`} className="text-sm text-destructive">
              {fieldError(errors, "email")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-phone`}>Contact number</Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            aria-invalid={Boolean(fieldError(errors, "phone"))}
            aria-describedby={fieldError(errors, "phone") ? `${formId}-phone-error` : undefined}
            onChange={(event) => dispatch(fieldChanged({ field: "phone", value: event.target.value }))}
          />
          {fieldError(errors, "phone") ? (
            <p id={`${formId}-phone-error`} className="text-sm text-destructive">
              {fieldError(errors, "phone")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-company`}>Company (optional)</Label>
          <Input
            id={`${formId}-company`}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => dispatch(fieldChanged({ field: "company", value: event.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${formId}-serviceInterest`}>What do you need?</Label>
          <Select
            value={values.serviceInterest}
            onValueChange={(value) =>
              dispatch(fieldChanged({ field: "serviceInterest", value: value as string }))
            }
          >
            <SelectTrigger id={`${formId}-serviceInterest`} className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.slug} value={service.slug}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError(errors, "serviceInterest") ? (
            <p className="text-sm text-destructive">{fieldError(errors, "serviceInterest")}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${formId}-message`}>Message</Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          value={values.message}
          aria-invalid={Boolean(fieldError(errors, "message"))}
          aria-describedby={fieldError(errors, "message") ? `${formId}-message-error` : undefined}
          onChange={(event) => dispatch(fieldChanged({ field: "message", value: event.target.value }))}
        />
        {fieldError(errors, "message") ? (
          <p id={`${formId}-message-error`} className="text-sm text-destructive">
            {fieldError(errors, "message")}
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id={`${formId}-consent`}
          checked={values.consentMarketing}
          onCheckedChange={(checked) =>
            dispatch(fieldChanged({ field: "consentMarketing", value: checked === true }))
          }
          className={cn(fieldError(errors, "consentMarketing") && "border-destructive")}
        />
        <Label htmlFor={`${formId}-consent`} className="font-normal text-muted-foreground">
          I agree to provide the above details and to be contacted about my enquiry.
        </Label>
      </div>
      {fieldError(errors, "consentMarketing") ? (
        <p className="-mt-3 text-sm text-destructive">{fieldError(errors, "consentMarketing")}</p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-fit">
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending&hellip;
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
