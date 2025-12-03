"use client";

import { useState, useEffect } from "react";

export default function ClientDate() {
    const [date, setDate] = useState("");

    useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);

    return <span>DATE: {date}</span>;
}
