"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { flattenValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from "@/zod-schemas/ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .inputSchema(insertTicketSchema, {
    //2024 year tutorial has ".schema" not "inputSchema"
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors, //should be working without async actually
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();

      const isAuth = await isAuthenticated();

      if (!isAuth) redirect("/login");

      // New ticket
      if (ticket.id === "(New)") {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({ insertedId: tickets.id });
        return {
          message: `Ticket ID # ${result[0].insertedId} created successfully`,
        };
      }

      // Updating existing ticket
      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
          completed: ticket.completed,
        })
        .where(eq(tickets.id, ticket.id!))
        .returning({ updatedId: tickets.id });
      return {
        message: `Ticket ID # ${result[0].updatedId} updated successfully`,
      };
    },
  );
