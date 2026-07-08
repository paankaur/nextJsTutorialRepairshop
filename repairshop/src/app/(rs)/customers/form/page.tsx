import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

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
    console.log(customer)
    }
    //put customer component
    else {
        return (
            <BackButton title="Back" variant="default" className="mb-4" />
        );
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
