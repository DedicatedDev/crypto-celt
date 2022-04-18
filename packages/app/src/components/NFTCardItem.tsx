import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
export const NFTCardItem = ({
  name,
  value,
  direction,
}: {
  name: string;
  value: string;
  direction: string;
}) => {
  const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0.5),
  }));
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: direction ?? "row",
        justifyContent: "space-between",
        overflow: "clip",
      }}
    >
      <Typography color="secondary">{name}</Typography>
      <Typography color="secondary">{value || "Undefined"}</Typography>
    </Container>
  );
};
