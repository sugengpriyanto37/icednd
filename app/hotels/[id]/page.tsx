import Layout from "@/components/Layout";
import HotelDetail from "@/components/HotelDetail";
import { Suspense } from "react";
export default function Page() { return <Layout><Suspense><HotelDetail /></Suspense></Layout>; }
