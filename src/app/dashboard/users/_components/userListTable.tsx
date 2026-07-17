"use client";

import { PagedResults } from "@/core/Dtos/pagedResult";
import { User } from "@/core/models/user";
import { getUsersListAction } from "@/lib/server_actions/userActions";
import { ActionMenu, MenuButtonItem } from "@/ui/buttons/actionMenu";
import { usePagedQuery } from "@/ui/contexts/pagedQuery";
import Icon from "@/ui/icons/icon";
import { CustomImage } from "@/ui/image/customImage";
import { Body } from "@/ui/theme/text/body";
import {
  CircularProgress,
  IconButton,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TablePaginationActions,
  TableRow,
} from "@mui/material";
import { TbLockAccess } from "react-icons/tb";

const USER_QUERY_KEY = "users";

export function UserListTable({
  initialData,
}: {
  initialData: PagedResults<User>;
}) {
  const {
    nextPage,
    changeLimit,
    page,
    previousPage,
    query: { data: usersList, isLoading },
    limit,
  } = usePagedQuery(getUsersListAction, USER_QUERY_KEY, initialData);

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  if (!usersList) {
    return <Body size="md">No user exist</Body>;
  }

  return (
    <>
      <TableBody>
        {usersList.items.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <CustomImage
                width={40}
                square
                alt="prodile avatar"
                src={user.avatarUrl ?? "/images/user.jpg"}
                className="rounded-full overflow-clip"
              />
            </TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <ul>
                {user.roles?.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <IconButton>
                <Icon name="eye" />
              </IconButton>
            </TableCell>
            <TableCell>
              <PermissionActionMenu user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={8}
            count={usersList!.totalCount}
            rowsPerPage={limit}
            page={usersList!.pageNumber - 1}
            slotProps={{
              select: {
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              },
            }}
            onPageChange={(e, p) => {
              if (p > page - 1) {
                nextPage();
              } else {
                previousPage();
              }
            }}
            onRowsPerPageChange={(e) => {
              const limit = +e.target.value;
              changeLimit(limit);
            }}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </>
  );
}

function PermissionActionMenu({ user }: { user: User }) {
  return (
    <ActionMenu>
      <MenuButtonItem
        icon={<TbLockAccess />}
        label="Permissions"
        link={`/dashboard/users/${user.id}/permissions`}
      />
      <MenuButtonItem iconName="bell" label="Notify" disable />
    </ActionMenu>
  );
}
