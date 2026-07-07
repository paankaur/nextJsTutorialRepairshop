import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "src/db/migrations" });
        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Error during migrations: ", error);
        process.exit(1); // Exit the process with an error code
    }
};
main();
