const RatingDisplay = ({ averageRating }) => {
  return (
    <div>
      <p>Rating: {averageRating !== null ? averageRating.toFixed(1) : "0"} /10</p>
    </div>
  );
};

export default RatingDisplay;
