interface OptionButtonProps {
  id: string;
  onClick: (color: string) => void;
  color?: string;
  circle?: boolean;
}

const OptionButton = ({
  id,
  onClick,
  color = '',
  circle = true,
}: OptionButtonProps) => {
  const styles = circle
    ? `h-20 w-20 rounded-full border-8 m-2 duration-500 ${color}`
    : `${color} border-2 m-2 duration-500 hover:text-white`;

  const renderText = () => (
    <div className="font-bold text-3xl p-5 uppercase">{id}</div>
  );

  return (
    <button onClick={() => onClick(id)} className={styles}>
      {!circle && renderText()}
    </button>
  );
};

export default OptionButton;
