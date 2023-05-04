interface UIScoreProps {
  score: number;
}

const UIScore = ({ score }: UIScoreProps) => (
  <div className="absolute left-8 top-5 text-white text-3xl font-bold select-none">
    <span className="mr-2">Score:</span>
    <span>{score.toLocaleString()}</span>
  </div>
);

export default UIScore;
