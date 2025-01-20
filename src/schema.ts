import { relations } from "drizzle-orm";
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

export const productCategory = pgTable(
  "ProductCategory",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    slug: text("slug"),
    description: text("description"),
    deleted: boolean("deleted").default(false),
    includeInNav: boolean("include_in_nav").default(false),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    userId: uuid("user_id").references(() => user.id),
  },
  (table) => ({
    productCategoryNameIndex: index("product_category_name_index").on(
      table.name
    ),
  })
);

export const productCategoryRelations = relations(
  productCategory,
  ({ one, many }) => ({
    user: one(user, {
      fields: [productCategory.userId],
      references: [user.id],
    }),
    products: many(product),
  })
);

export const product = pgTable(
  "Product",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    deleted: boolean("deleted").default(false),
    description: text("description"),
    imageUrl: text("image_url"),
    price: text("price"),
    inventoryCount: text("inventory_count"),
    categoryId: uuid("category_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    userId: uuid("user_id").references(() => user.id),
  },
  (table) => ({
    productCategoryIdIndex: index("product_category_id_index").on(
      table.categoryId
    ),
    productNameIndex: index("product_name_index").on(table.name),
  })
);

export const productRelations = relations(product, ({ one, many }) => ({
  category: one(productCategory, {
    fields: [product.categoryId],
    references: [productCategory.id],
  }),
  user: one(user, {
    fields: [product.userId],
    references: [user.id],
  }),
  ratings: one(productRating),
}));

export const productRating = pgTable(
  "ProductRating",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    rate: text("rate"),
    count: text("count"),
    productId: uuid("product_id"),
    userId: uuid("user_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => ({
    productRatingProductIdIndex: index("product_rating_product_id_index").on(
      table.productId
    ),
    productRatingUserIdIndex: index("product_rating_user_id_index").on(
      table.userId
    ),
  })
);

export const productRatingRelations = relations(productRating, ({ one }) => ({
  product: one(product, {
    fields: [productRating.productId],
    references: [product.id],
  }),
  user: one(user, {
    fields: [productRating.userId],
    references: [user.id],
  }),
}));
