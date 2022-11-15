interface AuthTitleProps {
  label: string;
}

export const AuthTitle = ({label}: AuthTitleProps) => {
  return (
    <h2 className="mb-4 text-3xl">{label}</h2>
  );
};
