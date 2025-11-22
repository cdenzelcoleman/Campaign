import './RecentChoices.css';

const RecentChoices = ({ choices = [] }) => {
  if (choices.length === 0) {
    return (
      <div className="recent-choices">
        <h3>Recent Choices</h3>
        <p className="no-choices">No choices made yet. Start your adventure!</p>
      </div>
    );
  }

  return (
    <div className="recent-choices">
      <h3>Recent Choices</h3>
      <div className="choices-list">
        {choices.slice(-5).map((choice, index) => (
          <div key={index} className="choice-item">
            <span className="choice-number">#{choices.length - 4 + index}</span>
            <span className="choice-text">{choice}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChoices;