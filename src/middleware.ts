import { NextRequest, NextResponse } from "next/server";
import { ExecuteMiddlewares, Middleware } from "./types/middleware";
import { publicEnv } from "./utils/envValidate";
import apiRouteCheck from "./middlewares/api/apiRouteCheck";

const executeMiddlewares: ExecuteMiddlewares = async (req: NextRequest, allMiddlewares: Middleware[]) => {
    if (allMiddlewares.length) {
        for (let i = 0; i < allMiddlewares.length; i++) {
            const response = await allMiddlewares[i](req);
            if (response) return response;
        }
        return NextResponse.next();
    } else return;
}

export const middleware = async (req: NextRequest) => {
    const pathname: string = req.nextUrl.pathname;
    const origin: string = req.nextUrl.origin;

    if (!publicEnv.CORS_WHITELIST?.includes(origin)) {
        return NextResponse.json({ error: "Access denied." }, { status: 405 })
    }

    if (pathname.startsWith("/api")) {
        const response = await executeMiddlewares(req, [
            apiRouteCheck,
        ]);

        if (response) return response;
    }

    if (pathname.startsWith("/results")) {
        const artRequestForm = req.cookies.get("artRequestForm");
        if (!artRequestForm) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
        "/results"
    ],
}