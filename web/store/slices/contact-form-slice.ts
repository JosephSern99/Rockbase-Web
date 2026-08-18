import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { submitToFormSubmit } from "@/lib/formsubmit";
import { validateContactForm, type ContactFormInput, type FieldError } from "@/lib/validation";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormState {
  values: ContactFormInput;
  errors: FieldError[];
  status: SubmitStatus;
}

const initialValues: ContactFormInput = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  serviceInterest: "",
  message: "",
  consentMarketing: false,
};

const initialState: ContactFormState = {
  values: initialValues,
  errors: [],
  status: "idle",
};

export const submitContactForm = createAsyncThunk<
  void,
  void,
  { state: { contactForm: ContactFormState }; rejectValue: FieldError[] }
>("contactForm/submit", async (_arg, { getState, rejectWithValue }) => {
  const { values } = getState().contactForm;
  const clientErrors = validateContactForm(values);
  if (clientErrors.length > 0) {
    return rejectWithValue(clientErrors);
  }

  try {
    await submitToFormSubmit(values);
  } catch {
    return rejectWithValue([
      { field: "_", message: "Something went wrong submitting your message. Please try again." },
    ]);
  }
});

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState,
  reducers: {
    fieldChanged(state, action: PayloadAction<{ field: keyof ContactFormInput; value: string | boolean }>) {
      const { field, value } = action.payload;
      (state.values[field] as string | boolean) = value;
      state.errors = state.errors.filter((error) => error.field !== field);
    },
    formReset(state) {
      state.values = initialValues;
      state.errors = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = "submitting";
        state.errors = [];
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = "success";
        state.values = initialValues;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = "error";
        state.errors = action.payload ?? [{ field: "_", message: "Submission failed." }];
      });
  },
});

export const { fieldChanged, formReset } = contactFormSlice.actions;
export default contactFormSlice.reducer;
