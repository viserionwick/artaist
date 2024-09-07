"use client"

// Essentials
import { NextPage } from "next";
import { useRouter } from "next/navigation";

// Components: UI
import Button from "./(components)/ui/Button/Button";

const NotFound: NextPage = () => {
    const router = useRouter();

    return (
        <div className="p-NotFound">
            Page not found.
            <Button type="submit" className="main" onClick={() => router.push("/")}>
                Go Home
            </Button>
        </div>
    )
}

export default NotFound