"use client";

import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchMember } from "@/lib/api/loan/repayments";
// import { MemberSuggestion, MemberSuggestionSingle } from "./types";
import { MemberSuggestion, MemberSuggestionSingle } from "./types";

interface MemberSearchProps {
  onSelectMember: (member: MemberSuggestionSingle) => void;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function MemberSearch({ onSelectMember }: MemberSearchProps) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const searchMutation = useMutation({
    mutationFn: (searchTerm: string): Promise<MemberSuggestion> =>
      searchMember(searchTerm),
  });

  function handleInput(value: string) {
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      searchMutation.mutate(value);
      setShowDropdown(true);
    }, 300);
  }

  function handleSelectMember(member: MemberSuggestionSingle) {
    setQuery(member.full_name);
    setShowDropdown(false);
    onSelectMember(member);
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder="Search by name or membership number..."
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        onFocus={() => query.length >= 2 && setShowDropdown(true)}
      />

      {showDropdown && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-20 bg-background border border-border rounded-lg shadow-md overflow-hidden">
          {searchMutation.isPending && (
            <p className="text-sm text-muted-foreground px-4 py-3">
              Searching...
            </p>
          )}
          {!searchMutation.isPending &&
            searchMutation.data?.data.length === 0 && (
              <p className="text-sm text-muted-foreground px-4 py-3">
                No members found.
              </p>
            )}
          {searchMutation.data?.data.map((member) => (
            <button
              key={member.membership_no}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted border-b border-border last:border-0 transition-colors"
              onMouseDown={() => handleSelectMember(member)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0"
                style={{ background: "#1B2E5E" }}
              >
                {initials(member.full_name)}
              </div>
              <div>
                <p className="text-sm font-medium">{member.full_name}</p>
                <p className="text-xs text-muted-foreground">
                  {member.membership_no}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
