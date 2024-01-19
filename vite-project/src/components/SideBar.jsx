import PropTypes from 'prop-types';

const SideBar = ({ projects, toggleCreateProject, handleProjectSelect, selectedProject }) => {
  return (
    <div className="w-1/5 h-full mt-16 rounded-r-lg bg-neutral-200 flex flex-col items-center shadow-lg overflow-y-scroll">
      <h1 className="text-black text-3xl mt-8 font-bold">Projects</h1>
      <button onClick={toggleCreateProject} className="mt-6 mb-6 px-4 py-2 text-xs rounded-md bg-gray-900 text-grey-100 hover:bg-black">
        <h1 className="text-white text-base"> + Create Project</h1>
      </button>
      <div className="w-full h-full flex flex-col items-center">
        <ul>
          {projects.map((project) => (
            <li key={project.title} className={`w-full text-base ${selectedProject && selectedProject.id === project.id ? 'bg-zinc-300' : 'hover:bg-zinc-300'}`}>
              <span
                onClick={() => handleProjectSelect(project)}
                className="cursor-pointer text-black p-4 block"
                style={{ height: '75px', display: 'flex', alignItems: 'center'}}
              >
                {project.title}
              </span>
            </li>
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
