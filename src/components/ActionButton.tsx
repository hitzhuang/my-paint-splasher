interface ActionButtonProps {
  label: string;
  backgroundColor?: string;
  onClick: () => void;
}

const ActionButton = ({
  label,
  backgroundColor = 'bg-neutral-500',
  onClick,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white text-xl tracking-wider font-bold px-5 py-2 w-40 rounded-md ${backgroundColor} hover:bg-neutral-400 active:bg-neutral-600 active:text-lg`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
