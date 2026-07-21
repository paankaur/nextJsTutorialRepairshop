import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";

export const metadata = {
  title: "Customer Search",
  description: "Manage your customers here.",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  // query the database
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-2",
  });
  const results = await getCustomerSearchResults(searchText);
  span.end();
  // return results
  return (
    <>
      <CustomerSearch />
      {results.length > 0 ? <CustomerTable data={results} /> : (<p>No results found.</p>)}
    </>
  )
}
