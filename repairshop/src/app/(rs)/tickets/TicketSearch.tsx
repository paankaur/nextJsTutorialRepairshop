import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        type="text"
        name="searchText"
        placeholder="Search tickets..."
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
