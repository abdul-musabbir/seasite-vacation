export default function HeroSection() {
  return (
    <div
      className="relative h-[800px] md:h-[600px] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          WEEKLY BEACH RENTALS <br />
          AT THE JERSEY SHORE
        </h1>
        <p className="text-xl mb-2">
          Located three houses from the beach. 2, 3, 4, and 6 bedroom houses
          available
        </p>

        <p className="text-xl mb-8 text-center">
          Please call or text 201-921-9969 <br /> Or email at
          seasidebeachvacations@gmail.com
        </p>
      </div>
    </div>
  );
}
