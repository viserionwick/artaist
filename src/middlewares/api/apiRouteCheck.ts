import { NextResponse, NextRequest } from "next/server";
import { Middleware } from "../../types/middleware";
import { publicEnv } from "../../utils/envValidate";

const apiRouteCheck: Middleware = async (req: NextRequest) => {
    const pathname: string = req.nextUrl.pathname;
    const origin: string = req.nextUrl.origin;

    const error: NextResponse = NextResponse.json({ error: "Access denied." }, { status: 405 });

    const emptyRoutes = [
        "/api",
    ]

    if (
        emptyRoutes.includes(pathname) // Checks non-route folders and blacklist routes.
        ||
        !publicEnv.CORS_WHITELIST.includes(origin) // Checks CORS whitelist.
    )
        return error;
};

export default apiRouteCheck;