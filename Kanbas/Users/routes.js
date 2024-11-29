import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
      };
      app.post("/api/users/current/courses", createCourse);

      const addEnrollments = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newEnrollment = enrollmentsDao.addEnrollments(currentUser._id, newCourse._id);
        res.json(newEnrollment);
      };
      app.post("/api/users/current/enrolled", addEnrollments);
      const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
      };
    
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

 

  const signup = async (req, res) => {const user =await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser =await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;

};

const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  
  const getEnrolledCourses = (req, res) => {
    let { userId } = req.params;


    if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401); 
            return;
        }
        userId = currentUser._id;
    }


    const enrolledCourses = enrollmentsDao.findEnrollmentsByUserId(userId);
    const courses = enrolledCourses.map((enrollment) => courseDao.findCoursesById(enrollment.course)).flat();

    res.json(courses);
};


app.get("/api/users/:userId/enrolled-courses", getEnrolledCourses);



  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };


 
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
