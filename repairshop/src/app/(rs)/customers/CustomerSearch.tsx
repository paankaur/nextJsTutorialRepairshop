import SearchButton from "@/components/SearchButton";
import Form from "next/form";
import { Input } from "@/components/ui/input";

export default function CustomerSearch() {
  return (
    <Form action="/customers" className="flex gap-2 items-center">
      <Input
        type="text"
        name="searchText"
        placeholder="Search customers..."
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
