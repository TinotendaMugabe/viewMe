import { 
  type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type Experience, type InsertExperience
} from "@shared/schema";

import {
  users,
  contactMessages,
  projects,
  skills,
  experiences
} from "./db/schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

// Create connection to PostgreSQL database
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<void>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<void>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<void>;
  
  // Experience operations
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<void>;
}

// Implementation using PostgreSQL with Drizzle ORM
export class PostgresStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(message).returning();
    return {
      ...result[0],
      created_at: result[0].created_at.toISOString()
    };
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    const results = await db.select().from(contactMessages).orderBy(contactMessages.created_at);
    return results.map(result => ({
      ...result,
      created_at: result.created_at.toISOString()
    }));
  }
  
  async markContactMessageAsRead(id: number): Promise<void> {
    await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  }
  
  // Project operations
  async getProjects(): Promise<Project[]> {
    const results = await db.select().from(projects).orderBy(projects.display_order);
    return results.map(result => ({
      ...result,
      created_at: result.created_at.toISOString()
    }));
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    if (!result[0]) return undefined;
    return {
      ...result[0],
      created_at: result[0].created_at.toISOString()
    };
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return {
      ...result[0],
      created_at: result[0].created_at.toISOString()
    };
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    if (!result[0]) return undefined;
    return {
      ...result[0],
      created_at: result[0].created_at.toISOString()
    };
  }
  
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
  
  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.display_order);
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const result = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return result[0];
  }
  
  async deleteSkill(id: number): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }
  
  // Experience operations
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.display_order);
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const result = await db.insert(experiences).values(experience).returning();
    return result[0];
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const result = await db.update(experiences).set(experience).where(eq(experiences.id, id)).returning();
    return result[0];
  }
  
  async deleteExperience(id: number): Promise<void> {
    await db.delete(experiences).where(eq(experiences.id, id));
  }
}

// For backward compatibility, still providing the memory storage implementation
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private contactMessagesMap: Map<number, ContactMessage>;
  private projectsMap: Map<number, Project>;
  private skillsMap: Map<number, Skill>;
  private experiencesMap: Map<number, Experience>;
  
  private userCurrentId: number;
  private messageCurrentId: number;
  private projectCurrentId: number;
  private skillCurrentId: number;
  private experienceCurrentId: number;

  constructor() {
    this.usersMap = new Map();
    this.contactMessagesMap = new Map();
    this.projectsMap = new Map();
    this.skillsMap = new Map();
    this.experiencesMap = new Map();
    
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.projectCurrentId = 1;
    this.skillCurrentId = 1;
    this.experienceCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }
  
  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const created_at = new Date().toISOString();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      created_at,
      read: false
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesMap.values())
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
  
  async markContactMessageAsRead(id: number): Promise<void> {
    const message = this.contactMessagesMap.get(id);
    if (message) {
      this.contactMessagesMap.set(id, { ...message, read: true });
    }
  }
  
  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values())
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const created_at = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id,
      created_at,
      featured: project.featured || false,
      display_order: project.display_order || 0
    };
    this.projectsMap.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projectsMap.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject: Project = {
      ...existingProject,
      ...project
    };
    this.projectsMap.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<void> {
    this.projectsMap.delete(id);
  }
  
  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skillsMap.values())
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.skillCurrentId++;
    const newSkill: Skill = {
      ...skill,
      id,
      display_order: skill.display_order || 0
    };
    this.skillsMap.set(id, newSkill);
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existingSkill = this.skillsMap.get(id);
    if (!existingSkill) return undefined;
    
    const updatedSkill: Skill = {
      ...existingSkill,
      ...skill
    };
    this.skillsMap.set(id, updatedSkill);
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<void> {
    this.skillsMap.delete(id);
  }
  
  // Experience operations
  async getExperiences(): Promise<Experience[]> {
    return Array.from(this.experiencesMap.values())
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.experienceCurrentId++;
    const newExperience: Experience = {
      ...experience,
      id,
      display_order: experience.display_order || 0
    };
    this.experiencesMap.set(id, newExperience);
    return newExperience;
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const existingExperience = this.experiencesMap.get(id);
    if (!existingExperience) return undefined;
    
    const updatedExperience: Experience = {
      ...existingExperience,
      ...experience
    };
    this.experiencesMap.set(id, updatedExperience);
    return updatedExperience;
  }
  
  async deleteExperience(id: number): Promise<void> {
    this.experiencesMap.delete(id);
  }
}

// Use PostgreSQL storage
export const storage = new PostgresStorage();
