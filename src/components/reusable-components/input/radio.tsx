import { Label } from "../shadcn-components/label";
import { RadioGroup, RadioGroupItem } from "../shadcn-components/radio-group";

interface Props {
  label: string;
  id: string
}

export const RadioInput = ({ label, id }: Props) => (
  <RadioGroup defaultValue="comfortable">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="default" id={id} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  </RadioGroup>
);
