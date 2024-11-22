import * as modulesDao from "./dao.js";
import * as assignmentsDao from "../Assignments/dao.js"
export default function ModuleRoutes(app) {
 app.delete("/api/modules/:moduleId", async (req, res) => {
   const { moduleId } = req.params;
   const status = await modulesDao.deleteModule(moduleId);
   res.send(status);
 });
 app.put("/api/modules/:moduleId", async(req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
  app.get("/api/modules/:moduleId/assignments", (req, res) => {
    const { moduleId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(moduleId);
    res.json(assignments);
  });
  app.post("/api/modules/:moduleId/assignments", (req, res) => {
    const { moduleId } = req.params;
    const assignment = {
      ...req.body,
      module: moduleId,
    };
    const newAssignment = assignmentsDao.createAssignments(assignment);
    res.send(newAssignment);
  });
  app



}
