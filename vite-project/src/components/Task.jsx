import PropTypes from 'prop-types';

export default function Task(props) {
    return (
        <div>
            <h1>Task: {props.task}</h1>
            <button onClick={props.onRemove} className="bg-red-400 p-2 text-sm rounded-md">Remove Task</button>
        </div>
    );
}

Task.propTypes = {
    task: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};