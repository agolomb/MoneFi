import * as Yup from "yup";

const CourseEditDeleteSchema = Yup.object().shape({
  coverImageUrl: Yup.string()
    .max(255)
    .required("Course Image URL must between 1 and 255 characters"),
  title: Yup.string()
    .min(1)
    .max(50)
    .required("Course title must between 1 and 50 characters"),
  subject: Yup.string()
    .min(1)
    .max(50)
    .required("Course subject must between 1 and 50 characters"),
  description: Yup.string()
    .min(1)
    .max(200)
    .required("Course description must between 1 and 200 characters"),
  instructorId: Yup.number().isRequired,
  duration: Yup.string().required(
    "Course duration must number of hours(h) and/or minutes(m)"
  ),
  lectureType: Yup.number().isRequired,
  statusName: Yup.number().isRequired,
});

export default CourseEditDeleteSchema;
