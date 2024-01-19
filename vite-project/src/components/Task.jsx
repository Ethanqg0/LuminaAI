import PropTypes from 'prop-types';
import checkmark from '../assets/checkmark.png';

export default function Task(props) {
    return (
        <div className="flex flex-row">
            <h1 className="ml-2 text-lg">{props.task}</h1>
            <img src={checkmark} onClick={props.onRemove} className="w-4 h-4 mt-1 ml-4 hover:bg-green-500 transition-all duration-300 ease-in-out"></img>
        </div>
    );
}

Task.propTypes = {
    task: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};