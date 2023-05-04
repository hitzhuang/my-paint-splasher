interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton = ({ label, onClick }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-white text-xl tracking-wider font-bold px-5 py-2 rounded-md bg-neutral-500 hover:bg-neutral-400 active:bg-neutral-600 active:text-lg"
    >
      {label}
    </button>
  );
};

export default ActionButton;
