"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Common country codes
const countries = [
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
]

interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
  isEgypt: boolean
}

export function CountrySelector({ value, onChange, isEgypt }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  // Set default country based on isEgypt
  useEffect(() => {
    if (isEgypt) {
      setSelectedCountry(countries[0]) // Egypt
      onChange("+20")
    } else if (!value) {
      // If no value is set and not Egypt, default to US
      setSelectedCountry(countries[1]) // US
      onChange("+1")
    }
  }, [isEgypt, onChange, value])

  // Update selected country when value changes externally
  useEffect(() => {
    if (value) {
      const country = countries.find((c) => value.startsWith(c.code))
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[110px] justify-between">
          <span className="flex items-center">
            <span className="mr-1">{selectedCountry.flag}</span>
            <span>{selectedCountry.code}</span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {countries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.code}`}
                  onSelect={() => {
                    setSelectedCountry(country)
                    onChange(country.code)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedCountry.code === country.code ? "opacity-100" : "opacity-0")}
                  />
                  <span className="mr-2">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{country.code}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
