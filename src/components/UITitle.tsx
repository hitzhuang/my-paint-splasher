interface UITitleProps {
  sx: string;
  message: string;
}

const UITitle = ({ sx, message }: UITitleProps) => (
  <h1 className={`text-white font-extrabold text-center ${sx}`}>{message}</h1>
);

export default UITitle;
