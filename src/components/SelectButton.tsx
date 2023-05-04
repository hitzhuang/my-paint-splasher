interface SelectButtonProps {
  id: string;
  onClick: (color: string) => void;
  color: string;
}

const SelectButton = ({ id, onClick, color }: SelectButtonProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`h-20 w-20 m-2 rounded-full active:scale-95 border-8 ${color}`}
    ></button>
  );
};

export default SelectButton;
