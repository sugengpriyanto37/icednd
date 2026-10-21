import Layout from "@/components/Layout";
import Hotels from "@/components/Hotels";
import { Suspense } from "react";
export default function Page() { return <Layout><Suspense><Hotels /></Suspense></Layout>; }
