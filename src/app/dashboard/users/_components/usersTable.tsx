import { CustomImage } from "@/ui/image/customImage";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableFooter,
  TablePagination,
  TablePaginationActions,
} from "@mui/material";
import Icon from "@/ui/icons/icon";
import { ActionMenu, MenuButtonItem } from "@/ui/buttons/actionMenu";
import { TbLockAccess } from "react-icons/tb";
import { PagedQueryResult } from "@/ui/contexts/pagedQuery";
import { UserFilter } from "./types";
import { User } from "@/core/models/user";

export function UsersTable({
  query: {
    query: { data: usersList },
    limit,
    page,
    nextPage,
    previousPage,
    changeLimit,
  },
}: {
  query: PagedQueryResult<User, UserFilter>;
}) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Username</TableCell>
            <TableCell>User id</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList?.items.map((user) => (
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
      </Table>
    </TableContainer>
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
