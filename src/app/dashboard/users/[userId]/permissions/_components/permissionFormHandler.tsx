"use client";

import { useAuth } from "@/ui/contexts/authContext";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PermissionForm from "./permissions/PermissionForm";

export function PermissionFormHandler() {
  const { isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <CircularProgress size={25} />;
  }

  return (
    <Column>
      <Row>
        <Button onClick={() => router.back()}>
          <Row centerV>
            <Icon name="arrow" />
            <Body size="lg">Back</Body>
          </Row>
        </Button>
      </Row>
      <Container maxWidth="md">
        <Box sx={{ py: { xs: 4, sm: 6 } }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            User permissions
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Search for a user, then grant or revoke individual permissions and
            set their scope.
          </Typography>

          <PermissionForm />
        </Box>
      </Container>
    </Column>
  );
}
