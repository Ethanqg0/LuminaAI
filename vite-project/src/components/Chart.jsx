import PropTypes from 'prop-types';
import '../index.css';
import '../keyframes.css';

export default function Chart({ title, value, backgroundColor }) {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center roboto">
        <h1 className="roboto">
          {title}: {value}%
        </h1>
        <div style={{ width: '60%', backgroundColor: 'black' }} className="rounded-md">
          <div style={{ width: `${value}%` }}>
            <div className="loader" style={{ backgroundColor }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};