import { FailedBox } from "@/app/_components/failedBox";
import { getUsersListAction } from "@/lib/server_actions/userActions";
import { Column } from "@/ui/layouts/column";
import { H4 } from "@/ui/theme/text/headers";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserListTable } from "./_components/userListTable";

export const metadata = {
  title: "User Management",
};

export default async function Page() {
  const result = await getUsersListAction({ limit: 10, page: 1 });

  if (result.status == "failed") {
    return (
      <FailedBox title="Cannot fetch users list" message={result.data.title} />
    );
  }

  return (
    <Column>
      <H4>User Management</H4>
      <TableContainer>
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

          <UserListTable initialData={result.data} />
        </Table>
      </TableContainer>
    </Column>
  );
}
