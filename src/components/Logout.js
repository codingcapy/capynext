
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: Logout component for CapyNext
 */

'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Logout() {
    return (
        <button onClick={() => {
            signOut({ callbackUrl: 'http://localhost:3000/' });
        }} className="px-5">Logout</button>
    )
}