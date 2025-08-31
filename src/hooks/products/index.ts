import {
    getShopProducts,
    getProducts,
    getProductById
} from "@/api/products"
import type { IProductSearchParams } from "@/interface/request/products"
import { useQuery } from "@tanstack/react-query"

export const useShopProducts = (params?: IProductSearchParams) => {
    const {
        data: shopProductsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["shopProducts", params],
        queryFn: () => getShopProducts(params),
    })

    return {
        shopProductsData,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useProducts = (params?: IProductSearchParams) => {
    const queryParams = {
        order: "DESC",
        page: 1,
        sortBy: "shopProduct.soldCount",
        ...params,
    }
    const {
        data,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => getProducts(queryParams),
    })
    return {
        data,
        isLoading,
        isFetching,
        refetch,
    }
}

export const useProductById = (id: string | null, reviewWithShopId?: string) => {
    const {
        data: product,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["product", id, reviewWithShopId],
        queryFn: () => (id ? getProductById(id, reviewWithShopId) : null),
        enabled: !!id,
    })

    return {
        product,
        isLoading,
        isFetching,
        error,
    }
}


