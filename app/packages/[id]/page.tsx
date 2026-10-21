import Layout from "@/components/Layout";
import PackageDetail from "@/components/PackageDetail";
import { Suspense } from "react";
export default function Page() { return <Layout><Suspense><PackageDetail /></Suspense></Layout>; }
