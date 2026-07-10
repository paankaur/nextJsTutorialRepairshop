import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;
    //edit
    if (!ticketId && !customerId) {
      return (
        <div className="">
          <h2 className="text-2xl mb-2">No customer ID or ticket ID provided</h2>
          <BackButton title="Go Back" variant="default" className="mb-4" />
        </div>
      );
    }
    //new ticket form
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
      if (!customer.active) {
        return (
          <div>
            <h2 className="text-2xl mb-2">
              Customer ID {customerId} is not active
            </h2>
            <BackButton title="Back" variant="default" className="mb-4" />
          </div>
        );
      }
      //return ticket form
      console.log(customer);
      return <TicketForm customer={customer} />;
    }
    //edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId, 10));
      if (!ticket) {
        return (
          <div>
            <h2 className="text-2xl mb-2">Ticket ID {ticketId} not found</h2>
            <BackButton title="Back" variant="default" className="mb-4" />
          </div>
        );
      }
      const customer = await getCustomer(ticket.customerId);
      //return ticket form
      console.log("ticket: ", ticket);
      console.log("customer: ", customer);
      return <TicketForm customer={customer} ticket={ticket} />;
    }
  } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e)
            throw e
        }
    }
}
