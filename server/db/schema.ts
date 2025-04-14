import { pgTable, serial, text, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  tags: varchar("tags", { length: 255 }).array().notNull(),
  github: varchar("github", { length: 255 }).notNull(),
  featured: boolean("featured").default(false).notNull(),
  display_order: integer("display_order").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  percentage: integer("percentage").notNull(),
  color: varchar("color", { length: 255 }).notNull(),
  display_order: integer("display_order").notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  organization: varchar("organization", { length: 255 }).notNull(),
  period: varchar("period", { length: 255 }).notNull(),
  bullets: varchar("bullets", { length: 255 }).array().notNull(),
  active: boolean("active").default(true).notNull(),
  display_order: integer("display_order").notNull(),
}); 