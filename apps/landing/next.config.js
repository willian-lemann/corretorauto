/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/sign-up/:path*',
                destination: 'http://localhost:3000/:path*',
                permanent: true,
            },
            {
                source: '/login/:path*',
                destination: 'http://localhost:3000/:path*',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
