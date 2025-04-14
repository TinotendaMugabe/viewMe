import { z } from "zod";

// Users table
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Contact messages table
export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  created_at: z.string(),
  read: z.boolean(),
});

export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
});

// Projects table
export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  github: z.string(),
  featured: z.boolean(),
  display_order: z.number(),
  created_at: z.string(),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  github: z.string(),
  featured: z.boolean(),
  display_order: z.number(),
});

// Skills table
export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  percentage: z.number(),
  color: z.string(),
  display_order: z.number(),
});

export const insertSkillSchema = z.object({
  name: z.string(),
  percentage: z.number(),
  color: z.string(),
  display_order: z.number(),
});

// Experiences table
export const experienceSchema = z.object({
  id: z.number(),
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  bullets: z.array(z.string()),
  active: z.boolean(),
  display_order: z.number(),
});

export const insertExperienceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  period: z.string(),
  bullets: z.array(z.string()),
  active: z.boolean(),
  display_order: z.number(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = z.infer<typeof projectSchema>;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = z.infer<typeof skillSchema>;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = z.infer<typeof experienceSchema>;
