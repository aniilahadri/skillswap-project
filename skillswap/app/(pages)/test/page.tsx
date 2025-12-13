"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function TestLogin() {
    const [result, setResult] = useState<any>(null);

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            email: "student@test.com",
            password: "password123",
            redirect: false,
        });
        setResult(res);
        console.log(res);
    };

    return (
        <div>
            <button onClick={handleLogin}>Test Login</button>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}
