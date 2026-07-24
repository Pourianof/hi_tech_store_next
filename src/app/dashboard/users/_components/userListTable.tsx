"use client";

import { PagedResults } from "@/core/Dtos/pagedResult";
import { User } from "@/core/models/user";
import { getUsersListAction } from "@/lib/server_actions/userActions";
import { usePagedQuery } from "@/ui/contexts/pagedQuery";
import { Body } from "@/ui/theme/text/body";
import { CircularProgress } from "@mui/material";
import { SearchFormBox } from "./searchFormBox";
import { UserFilter } from "./types";
import { UsersTable } from "./usersTable";
import { Row } from "@/ui/layouts/row";

const USER_QUERY_KEY = "users";

export function UserListTable({
  initialData,
}: {
  initialData: PagedResults<User>;
}) {
  const query = usePagedQuery<User, UserFilter>(
    getUsersListAction,
    USER_QUERY_KEY,
    initialData,
  );
  const {
    query: { data: usersList, isLoading },
    setFilters,
  } = query;

  return (
    <>
      <SearchFormBox setFilters={setFilters} />
      {isLoading && !usersList ? (
        <Row center className="grow p-8">
          <CircularProgress size={20} />
        </Row>
      ) : !usersList ? (
        <Body size="md">No user exist</Body>
      ) : (
        <UsersTable query={query} />
      )}
    </>
  );
}
