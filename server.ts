import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com https://fonts.googleapis.com https://fonts.gstatic.com");
    next();
  });

  // Middleware
  app.use(express.json({ limit: '1mb' }));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running securely." });
  });

  // Rate limiting for chat endpoint
  const rateLimitMap = new Map();
  const RATE_LIMIT_WINDOW_MS = 60000;
  const MAX_REQUESTS_PER_WINDOW = 10;

  const checkRateLimit = (ip: string): boolean => {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      return true;
    }
    if (now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      return true;
    }
    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }
    record.count++;
    return true;
  };

  // Example proxy for Gemini (Securing the API key on the server)
  app.post("/api/chat", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    }

    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured on the server." });
    }

    try {
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: "Invalid prompt provided." });
      }
      if (prompt.length > 10000) {
        return res.status(400).json({ error: "Prompt exceeds maximum length." });
      }
      const sanitizedPrompt = prompt.trim();
      res.json({ 
        message: "This is a placeholder response. In a production environment, the Gemini API key would be used here securely on the server-side.",
        receivedPrompt: sanitizedPrompt 
      });
    } catch (error) {
      console.error('[Chat API Error]', { timestamp: new Date().toISOString(), clientIp });
      res.status(500).json({ error: "Failed to communicate with AI service." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
