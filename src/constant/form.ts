import * as yup from "yup";  

// const MAX_FILE_SIZE = 102400; // 100KB  

// Define the type for valid file extensions
// const validFileExtensions: { [key: string]: string[] } = { 
//   image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] 
// };  

// function isValidFileType(fileName: string, fileType: string): boolean {   
//   const fileExtension = fileName.split('.').pop()?.toLowerCase();
//   return fileExtension ? validFileExtensions[fileType].includes(fileExtension) : false; 
// }  

export const UpdateMovieSchema = yup.object({ 
  id: yup.number().required("Id is required"),
  title: yup.string().required("Title is required"),   
  release_date: yup.date().required("Year is required"),   
genres: yup.array()
  .of(yup.number())
  .min(1, "At least one genre is required")
  .required("Genre is required"),
  languages: yup.string().required("Languages is required"),
  overview: yup.string().required("Overview is required"),   
  rating: yup.number().typeError("Rating must be a number").required("Rating is required"),
  adult: yup.boolean().required("Adult is required"),   
  img: yup.string().nullable()
});
export const AddMovieSchema = yup.object({ 
  // id: yup.number().required("Id is required"),
  title: yup.string().required("Title is required"),   
  release_date: yup.date().required("Year is required"),   
genres: yup.array()
  .of(yup.number())
  .min(1, "At least one genre is required")
  .required("Genre is required"),
  overview: yup.string().required("Overview is required"),   
  rating: yup.number().typeError("Rating must be a number").min(1).max(10).required("Rating is required"),
  adult: yup.boolean().required("Adult is required"),   
  img: yup.string().nullable()
});

export type AddMovieValues = yup.InferType<typeof AddMovieSchema>;
export type UpdateMovieValues = yup.InferType<typeof UpdateMovieSchema>;
