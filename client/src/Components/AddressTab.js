import Box from "@mui/material/Box";
import { Card, Divider, Typography } from "@mui/material";

const AddressTab = ({ debtor }) => {
  return (
    <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: "text.main" }}
        >
          Billing Address
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "0.9rem", opacity: "0.9", color: "text.main" }}
        >
          {debtor.address.line1}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "0.9rem", opacity: "0.9", color: "text.main" }}
        >
          {debtor.address.line2}
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "0.9rem", opacity: "0.9", color: "text.main" }}
        >
          {debtor.address.line3}
        </Typography>
        <Divider
          sx={{
            borderColor: "1px solid #E0E1E5",
            mt: 1.5,
            mb: 1.5,
            width: "100%",
            alignSelf: "flex-start",
          }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.main" }}
        >
          GST Number
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "0.9rem", opacity: "0.9", color: "text.main" }}
        >
          {debtor.gst_no}
        </Typography>
      </Box>
    </Card>

  )
}

export default AddressTab
