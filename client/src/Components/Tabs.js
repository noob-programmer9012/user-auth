import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import AddressTab from "./AddressTab";
import StatementTab from "./StatementTab";

export default function ColorTabs(props) {
  const [value, setValue] = React.useState("one");
  const { debtor } = props.data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="main"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Billing & Contact" />
        <Tab value="two" label="Statement" />
        <Tab value="three" label="Payment status" />
      </Tabs>
      {value === "one" && <AddressTab debtor={debtor} />}
      {value === "two" && <StatementTab debtor={debtor} />}
    </Box>
  );
}
