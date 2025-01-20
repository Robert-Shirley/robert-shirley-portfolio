import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "User",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    password: text("password"),
    role: text("role").$type<"admin" | "student" | "developer">(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    depreciatedId: text("depreciated_id"),
    providerId: uuid("provider_id"),
    deleted: boolean("deleted").default(false),
    currentlyEnrolled: boolean("currently_enrolled").default(true),
    adminId: text("admin_id"),
  },
  (table) => ({
    userEmailIndex: index("user_email_index").on(table.email),
    userRoleIndex: index("user_role_index").on(table.role),
    userProviderIdIndex: index("user_provider_id_index").on(table.providerId),
    userDeletedIndex: index("user_deleted_index").on(table.deleted),
    userCurrentlyEnrolledIndex: index("user_currently_enrolled_index").on(
      table.currentlyEnrolled
    ),
  })
);
