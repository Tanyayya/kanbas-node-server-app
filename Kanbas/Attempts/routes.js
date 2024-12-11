import * as attemptsDao from "./dao.js";
import model from "../Quizzes/model.js"
export default function AttemptRoutes(app) {
  
  app.post("/api/quizzes/:quizId/attempt", async (req, res) => {
    
    const { quizId } = req.params;
    const { student } = req.body;
    console.log(student)

    try {
      // Fetch the quiz to check maxAttempts and multipleAttempts settings
      const quiz = await model.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      if (!quiz.multipleAttempts) {
        return res.status(400).json({ error: "Multiple attempts are not allowed for this quiz." });
      }

      // Fetch existing attempts for the user for this quiz
      
      const existingAttempts = await attemptsDao.findAttemptsforUser(student);
      const quizAttempts = existingAttempts.filter(
        (attempt) => attempt.quiz.toString() === quizId
      );

      if (quizAttempts.length >= quiz.maxAttempts) {
        return res.status(400).json({
          error: "You have reached the maximum number of attempts for this quiz.",
        });
      }

      // Calculate the new attempt number
      const nextAttemptNumber = quizAttempts.length + 1;

      // Create a new attempt
      const attempt = {
        ...req.body,
        quiz: quizId,
        attemptNumber: nextAttemptNumber, // Increment attempt number
      };

      const newAttempt = await attemptsDao.createAttempt(attempt);
      res.status(201).json(newAttempt);
    } catch (error) {
      console.error("Error creating an attempt:", error);
      res.status(500).json({ error: "Failed to create attempt" });
    }
  });
  app.get("/api/quizzes/:quizId/user/:userId/attempts", async (req, res) => {
    const { userId } = req.params;
    try {
      const attempts = await attemptsDao.findAttemptsforUser(userId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching attempts for a user:", error);
      res.status(500).json({ error: "Failed to fetch attempts" });
    }
  });
  app.get("/api/quizzes/:quizId/user/:userId/attempts/last", async (req, res) => {
    const { quizId, userId } = req.params; // Extract quizId and userId from URL params
  
    try {
      // Fetch all attempts for the specified user and quiz
      const lastAttempt = await attemptsDao
        .findAttemptsforUser(userId, quizId)
        .sort({ attemptNumber: -1 }) // Sort by attemptNumber in descending order
        .limit(1) // Get only the latest attempt
        .exec();
  
      if (!lastAttempt || lastAttempt.length === 0) {
        return res.status(404).json({ error: "No attempts found for this user and quiz." });
      }
  
      res.status(200).json(lastAttempt[0]); // Send only the first attempt
    } catch (error) {
      console.error("Error fetching last attempt for a user:", error);
      res.status(500).json({ error: "Failed to fetch last attempt" });
    }
  });
  
}


  