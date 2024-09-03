/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "imobiliariajefersonealba.com.br" },
      { hostname: "imgs1.cdn-imobibrasil.com.br" },
      { hostname: "digdpilwqusbkpnnbejk.supabase.co" },
      { hostname: "img.auxiliadorapredial.com.br" },
    ],
  },
};

export default nextConfig;
