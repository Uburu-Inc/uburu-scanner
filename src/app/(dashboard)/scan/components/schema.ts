import * as Yup from "yup";

export const scanSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  middle_name: Yup.string().optional(),
});
