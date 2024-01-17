import PropTypes from 'prop-types';

const SideBar = ({ projects, toggleCreateProject, handleProjectSelect, handleDeleteProject }) => {
  return (
    <div className="w-1/4 h-1/2 rounded-r-lg bg-black flex flex-col items-center">
      <h1 className="text-white text-2xl font-bold mt-8">Your Projects</h1>
      <button onClick={toggleCreateProject} className="mt-6 mb-6 p-2 bg-green-500 text-white rounded">
        Create Project
      </button>
      <div className="w-full flex flex-col items-center">
        <ul>
          {projects.map((project) => (
            <div key={project.title} className="hover:bg-slate-600 w-full">
              <li key={project.title} className="mb-4">
                <span
                  onClick={() => handleProjectSelect(project)}
                  className="cursor-pointer text-white hover:text-blue-400"
                >
                  {project.title}
                </span>
                <button
                  onClick={() => handleDeleteProject(project)}
                  className="ml-2 p-1 bg-red-500 text-white text-xs rounded"
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