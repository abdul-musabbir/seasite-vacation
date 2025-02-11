import { ArrowRight, Compass, Star, Waves } from "lucide-react";

function HeroSection() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/40"
      style={{
        backgroundImage: `url("https://i1.wp.com/foreverlostintravel.com/wp-content/uploads/2021/04/Point-Lobos-State-Park.jpg?w=1200&ssl=1")`,
      }}
    >
      {/* Animated Wave Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMTQ0MHY4MDBTMTEyMCA2NDAgNzIwIDY0MCAzNjAgODAwIDM2MCA4MDBIMFYweiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] animate-wave"></div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white/90 text-sm font-medium">
              Premium Beachfront Experience
            </span>
          </div>

          {/* Logo Icon with Enhanced Animation */}
          <div className="mb-8 animate-fade-in">
            <div className="relative">
              <Waves className="w-20 h-20 mx-auto text-blue-400 mb-4 animate-pulse" />
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-blue-400 blur-2xl opacity-20 animate-pulse"></div>
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400"></div>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-white drop-shadow-2xl">Seaside Beatch</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 animate-gradient">
              Vacation
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl mb-10 text-white/90 font-light max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Located three houses from the beach. 2, 3, 4, and 6 bedroom houses
            available
          </p>

          {/* Location Badge with Animation */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full mb-12 group hover:bg-white/20 transition-all cursor-pointer">
            <Compass className="w-6 h-6 text-blue-400 mr-3 group-hover:rotate-45 transition-transform" />
            <span className="text-white/90 font-medium">
              Three Houses from Seaside Park's Pristine Beach
            </span>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20 flex items-center">
              Book Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all transform hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10 flex items-center border border-white/20">
              Contact US
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Features Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:flex md:justify-between gap-8 text-center">
            {[
              {
                title: "2-6 Bedrooms",
                subtitle: "Spacious Living",
                icon: "🏠",
              },
              // {
              //   title: "Beach Access",
              //   subtitle: "Steps to Paradise",
              //   icon: "🌊",
              // },
              // {
              //   title: "Weekly Rentals",
              //   subtitle: "Flexible Stays",
              //   icon: "📅",
              // },
              {
                title: "Prime Location",
                subtitle: "Seaside Park, NJ",
                icon: "📍",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 transform hover:scale-105 transition-all hover:bg-white/10 hover:shadow-xl hover:shadow-white/5">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default function App() {
  return <HeroSection />;
}
