import Database from "../Database/index.js";
import CourseModel from "../Courses/model.js";
import model from "./model.js";
export async function findModulesForCourse(courseId) {
  const courseDetail = await CourseModel.findById(courseId);
 
  return model.find({ course: courseId });

}
export function createModule(module) {
  delete module._id
  return model.create(module);
 
  }
  export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });

   }
   export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);

  }
  
