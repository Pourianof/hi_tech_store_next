import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ProductModel } from "@/core/models/productModel";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { TextInput } from "@/ui/form/textInput";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H4, H6, H5 } from "@/ui/theme/text/headers";
import { Card, IconButton, CircularProgress } from "@mui/material";
import { useQuery, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useEffect } from "react";

export function ProductSearch({ onClose }: { onClose(): void }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Card className="grid grid-rows-[auto_1fr_auto] gap-16px flex-1">
      <Row>
        <Row centerH className="relative grow">
          <TextInput
            value={searchTerm}
            placeholder="Write what you wanna to find..."
            onChange={(e) => {
              const search = (e.target as HTMLInputElement).value;

              setSearchTerm(search);
            }}
            className="pr-10"
          />
          <Icon
            name="search"
            className="text-xl absolute right-4 top-1/2 -translate-y-1/2"
          />
        </Row>
        <IconButton onClick={onClose}>
          <Icon name="circular_close" />
        </IconButton>
      </Row>
      <ProductSearchList searchTerm={searchTerm} />
    </Card>
  );
}

export function ProductSearchList({ searchTerm }: { searchTerm: string }) {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data, isLoading, error, isError } = useQuery<
    PagedResults<ProductModel> | null,
    ProblemDetails
  >({
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnMount: false,
    staleTime: Infinity,
    queryKey: ["search", debouncedSearch],
    enabled: !!debouncedSearch.trim(),
  });

  async function getProducts({}: {
    client: QueryClient;
    queryKey: readonly unknown[];
  }) {
    if (!searchTerm.trim().length) {
      return null;
    }

    const result = await productActions.getProducts({
      searchTerm,
      limit: "15",
    });

    if (result.status == "failed") {
      throw result.data;
    }

    return result.data;
  }

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      if (!searchTerm.trim().length) {
        return;
      }

      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const products = data?.items;

  return (
    <>
      {isLoading ? (
        <Column center className="p-16px">
          <H4>Loading products...</H4>
          <CircularProgress size={20} />
        </Column>
      ) : isError ? (
        <Column center className="p-16px">
          <H4 className="text-error">Something went wrong</H4>
          <Body size="md">{error.title}</Body>
          <Caption size="md">{error.detail}</Caption>
        </Column>
      ) : !!products?.length ? (
        <SearchedProductResultList products={products} />
      ) : !searchTerm.trim().length ? (
        <Column center className="p-16px">
          <H6>
            Write what you wanna find and i search for you to show something...
          </H6>
        </Column>
      ) : isTyping ? (
        <Body size="md">Typing...</Body>
      ) : (
        <H4>No result found</H4>
      )}
      {!!products?.length && (
        <Row center>
          <Link
            href={{
              pathname: "/products",
              query: {
                searchTerm,
              },
            }}
          >
            <OutlinedButton>Show all results</OutlinedButton>
          </Link>
        </Row>
      )}
    </>
  );
}

function SearchedProductResultList({ products }: { products: ProductModel[] }) {
  return (
    <div className="flex flex-col desktop:grid desktop:grid-cols-2 gap-4 overflow-auto p-4px">
      {products.map((p) => (
        <Link
          key={p.productId}
          href={{ pathname: `/products/${p.productId}` }}
          className="block grow"
        >
          <Row
            centerV
            className="border border-gray-neutral-cb rounded p-8px gap-16px"
          >
            <div className="w-[50px] h-[50px] rounded overflow-clip shrink-0">
              <ApiImage
                className="w-full h-full object-cover"
                alt={p.title}
                src={p.mainVariation?.getCandidateImageMedia()?.url}
              />
            </div>
            <Column>
              <H5>{p.title}</H5>
              <Caption size="md" className="line-clamp-1">
                {p.description}
              </Caption>
            </Column>
          </Row>
        </Link>
      ))}
    </div>
  );
}
