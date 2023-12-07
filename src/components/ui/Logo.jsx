export const Logo = ({ width, height }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/src/assets/logo.png"
        alt="logo"
        className="object-cover"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
};
