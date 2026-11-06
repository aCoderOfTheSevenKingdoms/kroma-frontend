import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"

export function SearchBar(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Field {...props}>
      <ButtonGroup>
        <Button variant="outline">
            <Search className="w-4 h-4" />
        </Button>
        <Input id="input-button-group" placeholder="Explore" className="placeholder:font-thin placeholder:text-[0.9rem]" />
      </ButtonGroup>
    </Field>
  )
}
