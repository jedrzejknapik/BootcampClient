import axios from "axios";

const apiUrl = "https://localhost:7039/api/";

export const getAllCourses = () => {
  return axios
    .get(apiUrl + "Course")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("error");
      return [];
    });
};

export const getUserById = (id) => {
  return axios
    .get(apiUrl + `Student/${id}`)
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllEnrollments = () => {
  return axios
    .get(apiUrl + "Enrollment")
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllFinalScores = () => {
  return axios
    .get(apiUrl + "FinalScore")
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllGrades = () => {
  return axios
    .get(apiUrl + "Grade")
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllLecturers = () => {
  return axios
    .get(apiUrl + "Lecturer")
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllPayments = () => {
  return axios
    .get(apiUrl + "Payment")
    .then((res) => res.data)
    .catch((err) => false);
};

export const getAllSubjects = () => {
  return axios
    .get(apiUrl + "Subject")
    .then((res) => res.data)
    .catch((err) => false);
};

//POST
export const postEnrollment = (courseId, studentId) => {
  axios.post(apiUrl + "Enrollment", {
    courseId,
    studentId,
    createdOn: new Date(Date.UTC(2022, 6, 3, 0, 0, 8)),
  });
};

export const postPayment = (enrollmentId, amount) => {
  axios.post(apiUrl + "Payment", {
    enrollmentId,
    dateOfPayment: new Date(Date.UTC(2022, 6, 3, 12, 0, 0)),
    amount,
    rate: "1",
  });
};
