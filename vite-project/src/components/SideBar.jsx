import PropTypes from 'prop-types';
import plus from '../assets/plus.png';

const SideBar = ({ projects, toggleCreateProject, handleProjectSelect, selectedProject }) => {
  return (
    <div className="w-1/5 rounded-b-lg h-full bg-white flex flex-col items-center border-r border-b border-gray-200 overflow-y-scroll">
      <span className='w-full flex flex-col justify-center items-center mt-6'>
        <button onClick={toggleCreateProject} className="m-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <h1 className="text-white text-xs"> + New Project</h1>
        </button>
      </span>
      <div className="mt-6 w-full h-full flex flex-col items-center">
        <ul>
          {projects.map((project) => (
            <li key={project.title} className={`w-full text-base ${selectedProject && selectedProject.id === project.id ? 'text-indigo-600 bg-slate-200' : 'hover:bg-slate-100'}`}>
              <span
                onClick={() => handleProjectSelect(project)}
                className="cursor-pointer p-4 block"
                style={{ height: '85px', display: 'flex', alignItems: 'center'}}
              >
                <h1 className="text-sm overflow-hidden overflow-ellipsis">{project.title}</h1>
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
