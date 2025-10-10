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

  return (
    <RadioGroup defaultValue="MCQ" onValueChange={handleValueChange} className="grid grid-cols-1 gap-2">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="MCQ" id="q1" />
        <Label htmlFor="q1">Multiple Choice Questions</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="Long questions" id="q2" />
        <Label htmlFor="q2">Long Questions</Label>
      </div>
    </RadioGroup>
  )
}
