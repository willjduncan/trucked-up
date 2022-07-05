import React from "react";
import { Link } from "react-router-dom";
import { QUERY_PROJECTS } from "../utils/queries";
import { EDIT_CONFIRM, EDIT_COMPLETE } from "../utils/mutations";
import { QUERY_ME_INCOMPLETE } from "../../utils/queries";


const JobList = ({ projects }) => {
//     const [editConfirm, { error }] = useMutation(EDIT_CONFIRMED, {
//       update(cache, { data: { project.confirmed: true } }) {
//         // could potentially not exist yet, so wrap in a try/catch
//         try {
//           // update me array's cache
//           const { me } = cache.readQuery({ query: QUERY_ME });
//           cache.writeQuery({
//             query: QUERY_ME,
//             data: { me: { ...me, projects: [...me.projects] } },
//           });
//         } catch (e) {
//           console.warn("First thought insertion by user!");
//         }
  
//         // update array's cache
//         const { projects } = cache.readQuery({ query: QUERY_ME_INCOMPLETE });
//         cache.writeQuery({
//           query: QUERY_ME_INCOMPLETE,
//           data: { projects: [...projects] },
//         });
//       },
//     });

//     const [editComplete, { error }] = useMutation(EDIT_COMPLETE, {
//         update(cache, { data: { completed: true } }) {
//           // could potentially not exist yet, so wrap in a try/catch
//           try {
//             // update me array's cache
//             const { me } = cache.readQuery({ query: QUERY_ME });
//             cache.writeQuery({
//               query: QUERY_ME,
//               data: { me: { ...me, projects: [...me.projects] } },
//             });
//           } catch (e) {
//             console.warn("First thought insertion by user!");
//           }
    
//           // update array's cache
//           const { projects } = cache.readQuery({ query: QUERY_ME_INCOMPLETE });
//           cache.writeQuery({
//             query: QUERY_ME_INCOMPLETE,
//             data: { projects: [...projects] },
//           });
//         },
//       });
  
//     const handleConfirm = async (event) => {
//       event.preventDefault();
//       try {
//         // add thought to database
//         const [editConfirm, { data, loading, error }] = useMutation(EDIT_CONFIRM);
  
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     const handleComplete = async (event) => {
//         event.preventDefault();
//         try {
//           // add thought to database
//           await editComplete({
//             variables
//           });
    
//         } catch (e) {
//           console.error(e);
//         }
//       };

  if (!projects.length) {
    return <h3>No projects Yet</h3>;
  }

  return (
    <div>
      <h3>Here all projects</h3>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/project/${project.jobName}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {project.jobName}
              </Link>{" "}
              project on {project.createdAt}
            </p>
            { project.confirmed ? (
            <button className="button" onClick={handleConfirm}>Confirm Job</button>
          ) : (
            <button className="button" onClick={handleComplete}> Mark Job as Complete</button>
          )}
            <div className="card-body">
              <Link to={`/project/${project.jobName}`}>
                <p>{project.description}</p>
              </Link>
            </div>

          </div>
        ))}
    </div>
  );
};

export default JobList;