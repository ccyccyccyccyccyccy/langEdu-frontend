import { Button } from "@/components/ui/button"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type onChange = (value: string) => void

export function QType({onChange}: {onChange?: onChange}) {
    const [qType, setQType] = React.useState("Multiple choice question");
    const handleValueChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

  return ( //TODO: this should be a dropdown
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{qType}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Question Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={qType} onValueChange={(value) => { setQType(value); handleValueChange(value); }}>
          <DropdownMenuRadioItem value="Multiple choice question">Multiple choice question</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Long question">Long question</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Coding question">Coding question</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

