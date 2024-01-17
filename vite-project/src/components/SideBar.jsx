import PropTypes from 'prop-types';

const SideBar = ({ projects, toggleCreateProject, handleProjectSelect, handleDeleteProject }) => {
  return (
    <div className="w-1/4 h-full mt-16 rounded-r-lg bg-stone-900 flex flex-col items-center">
      <h1 className="text-stone-200 text-xl font-bold uppercase mt-8">Your Projects</h1>
      <button onClick={toggleCreateProject} className="mt-6 mb-6 px-4 py-2 text-xs rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600">
        Create Project
      </button>
      <div className="w-full flex flex-col items-center">
        <ul>
          {projects.map((project) => (
            <div key={project.title} className="w-full justify-center hover:bg-stone-800">
              <li key={project.title} className="mb-4 ml-4 flex flex-col">
                <span
                  onClick={() => handleProjectSelect(project)}
                  className=" cursor-pointer text-white  p-2"
                >
                  {project.title}
                </span>
                <button
                  onClick={() => handleDeleteProject(project)}
                  className="ml-2 p-1 bg-red-500 text-white text-xs rounded w-20"
                >
                  Delete
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  projects: PropTypes.array.isRequired,
  toggleCreateProject: PropTypes.func.isRequired,
  handleProjectSelect: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
}

export default SideBar;