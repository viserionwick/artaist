import getSessionData from "@/src/utils/auth/getSessionData";
import { privateEnv } from "@/src/utils/envValidate";
import { NextRequest, NextResponse } from "next/server";

const authRedirect = async (req: NextRequest, redirectTo: string, checkOnline: boolean = true) => {
    const user = await getSessionData(req);
    if (checkOnline && user) {
        return NextResponse.redirect(privateEnv.NEXTAUTH_URL + redirectTo);
    } else if (!checkOnline && !user) {
        return NextResponse.redirect(privateEnv.NEXTAUTH_URL + redirectTo);
    }
    
}

export default authRedirect;