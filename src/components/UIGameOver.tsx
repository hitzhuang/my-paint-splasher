interface UIGameOverProps {
  onRestart: (e: any) => void;
}

const UIGameOver = ({ onRestart }: UIGameOverProps) => {
  return (
    <div className="select-none absolute left-0 right-0 top-0 bottom-0 bg-black/80 flex flex-col justify-center items-center">
      <h1 className=" text-white text-8xl font-extrabold">GAME OVER</h1>
      <button
        onClick={onRestart}
        className="text-white text-xl tracking-wider font-bold mt-10 px-5 py-2 rounded-md bg-neutral-500 hover:bg-neutral-400 active:bg-neutral-600 active:text-lg"
      >
        RESTART
      </button>
    </div>
  );
};

export default UIGameOver;
