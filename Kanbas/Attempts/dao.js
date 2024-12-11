import model from "./model.js";

export function createAttempt(attempt) {
   
    delete attempt._id
    return model.create(attempt); 
}


export function findAttemptsforUser(userId){
    return model.find({ student: userId });
}

export function updateAttempts(attemptId,updates){
    return model.updateOne({ _id: attemptId }, updates);

}

export function deleteAttempt(attemptId){
    return model.deleteOne({ _id: attemptId });
}