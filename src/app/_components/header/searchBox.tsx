"use client";

import { PagedResults } from "@/core/Dtos/pagedResult";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ProductModel } from "@/core/models/productModel";
import { TextInput } from "@/ui/form/textInput";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { Card } from "@/ui/theme/card";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H4, H5, H6 } from "@/ui/theme/text/headers";
import { CircularProgress, IconButton } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SearchButton() {
  const [displaySearchModal, setDisplaySearchModal] = useState(false);

  return (
    <>
      {displaySearchModal && (
        <Modal
          containerClassName="absolute p-0 flex bg-transparent w-3/4 top-[10dvh] bottom-none max-h-[85dvh]"
          variants="center-x"
        >
          <ProductSearch onClose={() => setDisplaySearchModal(false)} />
        </Modal>
      )}
      <button
        className="w-[30px] hover:cursor-pointer aspect-square rounded-full fill-primary-blue-400 hover:fill-primary-blue-0c hover:bg-primary-blue-0c/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue-0c/20"
        onClick={(e) => {
          e.preventDefault();
          setDisplaySearchModal(true);
        }}
      >
        <Icon name="search" />
      </button>
    </>
  );
}

function ProductSearch({ onClose }: { onClose(): void }) {
  const [searchTerm, setSearchTerm] = useState("");
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
    <Card className="grid grid-rows-[auto_1fr] gap-16px flex-1">
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
        <div className="grid grid-cols-2 gap-4 overflow-auto p-4px">
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
    </Card>
  );
}
