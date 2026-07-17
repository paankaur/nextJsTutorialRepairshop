import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";

export const metadata = {
  title: "Tickets",
  description: "Manage your tickets here.",
};
export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify(results)}</p>
      </>
    )
  }

  // query search results
  const results = await getTicketSearchResults(searchText);


  // return results
  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  )

}
