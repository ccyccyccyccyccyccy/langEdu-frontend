import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

type onChange = (value: string) => void

export function RadioGroupQType({onChange}: {onChange?: onChange}) {

    const handleValueChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

  return ( //TODO: this should be a dropdown
    <RadioGroup defaultValue="Multiple choice question" onValueChange={handleValueChange} className="grid grid-cols-1 gap-2">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Multiple choice question" id="q1" />
        <Label htmlFor="q1">Multiple Choice Questions</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Long question" id="q2" />
        <Label htmlFor="q2">Long Questions</Label>
      </div>
    </RadioGroup>
  )
}
