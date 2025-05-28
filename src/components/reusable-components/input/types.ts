import { InputHTMLAttributes, ReactNode } from "react";
import { PrimaryKeyValuePair } from "@/app/types";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface TextAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export interface FileInputProps {
  error?: string;
  children?: ReactNode;
  onChange: (file: File | null) => void;
}

export interface LabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

export interface ErrorProps {
  className?: string;
  children?: ReactNode;
}

export interface SelectProps {
  placeholder?: string;
  className?: string;
  items: Array<PrimaryKeyValuePair>;
  disabled?: boolean;
  id?: string;
  label?: string;
  error?: string;
  selectWithSearch?: boolean;
  loading?: boolean;
  value?: string;
  onChange?: (event: PrimaryKeyValuePair) => void;
  onType?: (value: string) => void;
}

export interface CheckboxProps {
  children?: ReactNode | string;
  labelClassName?: string;
  onCheck: (text: string) => void;
}
