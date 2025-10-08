import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

type onChange = (value: string) => void

export function RadioGroupFiles({onChange}: {onChange?: onChange}) {

    const handleValueChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

  return (
    <RadioGroup defaultValue="oneDocument" onValueChange={handleValueChange} className="grid grid-cols-1 gap-2">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="oneDocument" id="r1" />
        <Label htmlFor="r1">The pastpaper (question and answer) is in one document</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="twoDocument" id="r2" />
        <Label htmlFor="r2">The pastpaper (question and answer) is in two documents</Label>
      </div>
    </RadioGroup>
  )
}
