import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layout/layoutNavbar.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("admin", "routes/admin.tsx"),
        route("genres", "routes/genres.tsx"),
        route("posters", "routes/posters.tsx"),
        route("sign-in/*", "routes/sign-in.tsx"),
    ]),
] satisfies RouteConfig;
