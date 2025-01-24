// components/AuthLayout.jsx
const AuthLayout = ({ imageSrc, imageAlt, children }) => {
  return (
    <div className="grid md:grid-cols-2 items-center gap-8 h-full">
      {/* Image Section */}
      <div className="max-md:order-1 p-4">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
        <div className="max-w-lg w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
