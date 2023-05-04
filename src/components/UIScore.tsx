interface UIScoreProps {
  score: number;
  highScore: number;
}

const UIScore = ({ score = 0, highScore = 0 }: UIScoreProps) => {
  return (
    <div
      className={`absolute left-8 top-5 text-white 
      flex flex-col justify-items-start select-none`}
    >
      <div className="text-2xl">
        <span className="mr-2">High Score:</span>
        <span>{highScore.toLocaleString()}</span>
      </div>
      <div className="text-6xl font-bold">{score.toLocaleString()}</div>
    </div>
  );
};

export default UIScore;
