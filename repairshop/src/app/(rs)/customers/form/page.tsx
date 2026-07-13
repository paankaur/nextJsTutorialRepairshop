import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;
  if (!customerId) {
    return {
      title: "New Customer Form",
    };
  }
  return {
    title: `Edit Customer #${customerId}`,
  };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;
    //edit
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId, 10));
      if (!customer) {
        return (
          <div>
            <h2 className="text-2xl mb-2">
              Customer ID {customerId} not found
            </h2>
            <BackButton title="Back" variant="default" className="mb-4" />
          </div>
        );
      }
      console.log(customer);
      return <CustomerForm customer={customer} />;
    } else {
      return <CustomerForm />;
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
