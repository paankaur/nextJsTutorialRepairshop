import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {searchParams: Promise<{ [key: string]: string | undefined }>}) {
  const { customerId, ticketId } = await searchParams;
  if (!ticketId && !customerId) return { title: "Missing customer ID or ticket ID" };
  if (customerId) return {
    title: `New Ticket for Customer # ${customerId}`,
  }
  if (ticketId) return {
    title: `Edit Ticket # ${ticketId}`,
  }
}

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
          <h2 className="text-2xl mb-2">
            No customer ID or ticket ID provided
          </h2>
          <BackButton title="Go Back" variant="default" className="mb-4" />
        </div>
      );
    }

    const { getPermission, getUser } = await getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted ?? false;

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
      if (isManager) {
        kindeInit(); // initialize the Kinde Management API client
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
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
if (isManager) {
        kindeInit(); // initialize the Kinde Management API client
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} techs={techs} ticket={ticket} />;
      } else {
        const isEditable = user?.email?.toLocaleLowerCase() === ticket.tech.toLocaleLowerCase();
        console.log('user.email: ', user?.email);
        console.log('tech: ', ticket.tech);
        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
      }

    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
