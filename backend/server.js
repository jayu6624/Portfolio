const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:3000",
        "https://portfolio-r4c2.vercel.app", // Your Vercel app URL
        /\.vercel\.app$/, // Allow all vercel.app subdomains
      ];

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("Origin not allowed by CORS:", origin);
        callback(null, false);
      }
    },
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);

// Function to create email transporter
const createTransporter = () => {
  console.log("Email service:", process.env.EMAIL_SERVICE);

  // Try using a service like SendinBlue/Brevo as more reliable alternative
  if (
    (process.env.EMAIL_SERVICE || "").toLowerCase() === "sendinblue" ||
    (process.env.EMAIL_SERVICE || "").toLowerCase() === "brevo"
  ) {
    console.log("Using SendinBlue/Brevo configuration");
    return nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // API key for SendinBlue/Brevo
      },
    });
  }

  // For Gmail specifically with updated config
  if ((process.env.EMAIL_SERVICE || "").toLowerCase() === "gmail") {
    console.log("Using Gmail specific configuration");
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Fix for self-signed certificate issue
        rejectUnauthorized: false,
      },
    });
  }

  // For other email services (Yahoo, etc.)
  console.log("Using generic configuration");
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Fallback method to save messages to file if email fails
const saveMessageToFile = (data) => {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "contact_messages.json");

  let messages = [];
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      messages = JSON.parse(fileContent);
    }
  } catch (err) {
    console.error("Error reading messages file:", err);
  }

  messages.push({
    ...data,
    timestamp: new Date().toISOString(),
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    console.log("Message saved to file successfully");
    return true;
  } catch (err) {
    console.error("Error saving message to file:", err);
    return false;
  }
};

// Root route handler - add this after middleware setup and before other routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Portfolio Contact API is running",
    endpoints: {
      contact: "/api/contact",
      health: "/health",
      messages: "/api/messages",
    },
  });
});

// Contact endpoint - make sure the path is correct
app.post("/api/contact", async (req, res) => {
  // Log the request path to debug
  console.log("Received request at path:", req.path);

  try {
    const { name, email, message } = req.body;

    console.log("Received contact form submission from:", email);

    // Validate form input
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields." });
    }

    // Check environment variables
    console.log("Environment variables check:");
    console.log("- EMAIL_USERNAME exists:", !!process.env.EMAIL_USERNAME);
    console.log("- EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);
    console.log("- EMAIL_SERVICE:", process.env.EMAIL_SERVICE || "not set");

    // Validate required environment variables
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      console.error("Missing email credentials in environment variables");

      // Try fallback method to save message
      const saved = saveMessageToFile({ name, email, message });
      if (saved) {
        return res.status(200).json({
          success: true,
          note: "Message saved to file due to missing email configuration",
        });
      }

      return res.status(500).json({
        error: "Server configuration error. Please contact the administrator.",
      });
    }

    let emailSent = false;
    let emailError = null;

    // Try to send email
    try {
      console.log("Creating email transporter...");
      const transporter = createTransporter();

      // Email content
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USERNAME}>`,
        to: "jaydeeprathod6624@gmail.com",
        subject: `Portfolio Contact: Message from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        replyTo: email,
      };

      console.log("Attempting to send email...");
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      emailSent = true;
    } catch (error) {
      console.error("Error sending email:", error);
      emailError = error;
      // We'll continue to the fallback below
    }

    // If email failed, try to save to file as fallback
    if (!emailSent) {
      const saved = saveMessageToFile({ name, email, message });
      if (saved) {
        return res.status(200).json({
          success: true,
          note: "Message saved locally. We'll contact you soon.",
        });
      } else {
        // Both email and file saving failed
        throw emailError || new Error("Failed to process your message");
      }
    }

    // If we got here, email was sent successfully
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing contact form:", error);

    let errorMessage = "Failed to send message. Please try again later.";

    if (error.code === "EAUTH") {
      errorMessage = "Email authentication failed. Check credentials.";
    } else if (error.code === "ESOCKET") {
      errorMessage = "Network error connecting to mail server.";
    } else if (error.code === "ECONNECTION") {
      errorMessage = "Connection error with mail server.";
    }

    res.status(500).json({
      error: errorMessage,
      code: error.code || "unknown",
    });
  }
});

// Get all messages endpoint (for admin access only - in a real app, add authentication)
app.get("/api/messages", (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "contact_messages.json");

    if (!fs.existsSync(filePath)) {
      return res.status(200).json({ messages: [] });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const messages = JSON.parse(fileContent);

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Email configuration:");
  console.log("- SERVICE:", process.env.EMAIL_SERVICE || "(default)");
  console.log(
    "- USERNAME:",
    process.env.EMAIL_USERNAME ? "✓ set" : "❌ not set"
  );
  console.log(
    "- PASSWORD:",
    process.env.EMAIL_PASSWORD ? "✓ set" : "❌ not set"
  );
});

module.exports = app;
