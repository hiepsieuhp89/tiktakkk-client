"use client"

import { Footer } from "@/components/Common/Footer"
import { Header } from "@/components/Common/Header"
import MenuHeader from "@/components/Common/MenuHeader"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEffect, useState } from "react"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { Shield, Lock, AlertTriangle, Clock } from "lucide-react"

export default function FlashDealsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const checkAuth = () => {
            const hasToken = localStorage.getItem("token") || sessionStorage.getItem("token")
            setIsAuthenticated(!!hasToken)
            setIsLoading(false)
        }

        const timer = setTimeout(() => {
            checkAuth()
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
                <div className="min-h-screen bg-background flex flex-col">
                    <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Giao dịch nhanh</h1>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href="/">Trang chủ</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            className="font-semibold"
                                            href="/flash-deals">Giao dịch nhanh</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        {/* Security Banner */}
                        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                            <p className="text-amber-800 text-sm">
                                Các giao dịch nhanh cần được bảo mật. Vui lòng xác thực danh tính trước khi tiếp tục.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}

