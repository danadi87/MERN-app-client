export function Carousel() {
  return (
    <div className="relative bg-gray-800 text-white h-64 flex items-center justify-center">
      <img
        src="your-image-url.jpg"
        alt="Carousel background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold">AllInOneClick</h1>
        <p className="text-xl">Everything you need in just one click.</p>
      </div>
    </div>
  );
}
