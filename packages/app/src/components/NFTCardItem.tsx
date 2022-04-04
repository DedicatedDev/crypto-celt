import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
export const NFTCardItem = ({ name, value, direction}) => {
    const Container = styled(Box)(({ theme }) => ({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: theme.spacing(0.5)
    }));
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: direction ?? "row",
          justifyContent: "space-between",
          overflow:'clip',
        }}
      >
        <Typography color="primary">{name}</Typography>
        <Typography>{value || "Undefined"}</Typography>
      </Container>
    );
  };
  