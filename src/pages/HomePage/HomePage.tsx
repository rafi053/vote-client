// import { FC, useEffect } from "react";
// import "./HomePage.css";
// import { AppDispatch, RootState } from "../../store/store";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStudent } from "../../store/features/students/candidatesSlice";

// const HomePage: FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { error, status, students } = useSelector(
//     (state: RootState) => state.students
//   );
//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchStudent());
//     }
//   }, [dispatch, status]);

//   return (
//     <>
//       <main className="page HomePage">
//         {status === "fulfilled" && !error ? (
//           students.map((student) => (
//             <div key={student.id} className="student-card">
//               <img width={50} src={student.image} alt={student.name} />
//               <h2>{student.name}</h2>
//               <p>Email: {student.email}</p>
//               <p>Gender: {student.ismale ? "Male" : "Female"}</p>
//               <p>Using GPT: {student.isUsingGpt ? "Yes" : "No"}</p>
//             </div>
//           ))
//         ) : (
//           <p>{status}</p>
//         )}
//       </main>
//       {error && <p>{error}</p>}
//     </>
//   );
// };

// export default HomePage;
