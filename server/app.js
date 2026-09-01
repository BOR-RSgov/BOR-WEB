import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import officialRoutes from "./routes/official.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import newsRoutes from "./routes/news.routes.js";
import sliderRoutes from "./routes/slider.routes.js";
import resourceRoutes from "./routes/resource.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import taxRoutes from "./routes/tax.routes.js";
import albumRoutes from "./routes/album.routes.js";
import videoRoutes from "./routes/video.routes.js";
import projectRoutes from "./routes/project.routes.js";
import pageRoutes from "./routes/page.routes.js";
import contactMessageRoutes from "./routes/contactMessage.routes.js";
import causeListRoutes from "./routes/causeList.routes.js";
import sdcRoutes from "./routes/sdc.routes.js";

import errorHandler from "./middleware/error.middleware.js";


const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Board of Revenue CMS API",
    version: "1.0.0",
  });
});
/*
|--------------------------------------------------------------------------
| My APIs
|--------------------------------------------------------------------------
*/
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/officials", officialRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/sliders", sliderRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/taxes", taxRoutes);
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/pages", pageRoutes);
app.use("/api/v1/contact-messages", contactMessageRoutes);
app.use("/api/v1/cause-lists", causeListRoutes);
app.use("/api/v1/sdcs", sdcRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler);

export default app;
