import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertProjectSchema, insertSkillSchema, insertExperienceSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate input using zod schema
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: result.error.format()
        });
      }
      
      // Store message in database
      const contactMessage = await storage.createContactMessage(result.data);
      
      // In a real app, you might also send an email notification here
      console.log("Contact form submission saved to database:", contactMessage);
      
      // Return success
      return res.status(200).json({ 
        message: "Message sent successfully",
        data: contactMessage
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  // API route for downloading resume
  app.get("/api/download-resume", async (_req: Request, res: Response) => {
    try {
      const resumePath = path.resolve(
        process.cwd(),
        "attached_assets",
        "TinotendaMugabe cv.pdf"
      );
      
      // Check if file exists
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ message: "Resume file not found" });
      }
      
      // Set headers and send file
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=TinotendaMugabe_Resume.pdf"
      );
      
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error downloading resume:", error);
      return res.status(500).json({ message: "Failed to download resume" });
    }
  });

  // API routes for projects
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      return res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: result.error.format()
        });
      }
      
      const project = await storage.createProject(result.data);
      return res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ message: "Failed to create project" });
    }
  });
  
  // API routes for skills
  app.get("/api/skills", async (_req: Request, res: Response) => {
    try {
      const skills = await storage.getSkills();
      return res.status(200).json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      return res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  
  app.post("/api/skills", async (req: Request, res: Response) => {
    try {
      const result = insertSkillSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid skill data", 
          errors: result.error.format()
        });
      }
      
      const skill = await storage.createSkill(result.data);
      return res.status(201).json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      return res.status(500).json({ message: "Failed to create skill" });
    }
  });
  
  // API routes for experiences
  app.get("/api/experiences", async (_req: Request, res: Response) => {
    try {
      const experiences = await storage.getExperiences();
      return res.status(200).json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      return res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });
  
  app.post("/api/experiences", async (req: Request, res: Response) => {
    try {
      const result = insertExperienceSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid experience data", 
          errors: result.error.format()
        });
      }
      
      const experience = await storage.createExperience(result.data);
      return res.status(201).json(experience);
    } catch (error) {
      console.error("Error creating experience:", error);
      return res.status(500).json({ message: "Failed to create experience" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
