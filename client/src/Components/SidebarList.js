import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useContext, useState } from "react";

import UserContext from "../Context/UserContext";
import DashboardData from "../Pages/DashboardData";
import DebtorsPage from "../Pages/DebtorsPage";
import TransporterPage from "../Pages/TransporterPage";
import ProductsPage from "../Pages/ProductsPage";
import ChallansPage from "../Pages/ChallansPage";

export const SidebarList = () => {
  const { setComponent, active, setActive } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: "primary.dark",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          The ERP
        </Typography>
      </Toolbar>
      <MenuList
        sx={{
          backgroundColor: "background.default",
          height: { xs: "100vh", sm: "100%" },
        }}
      >
        <MenuItem
          onClick={() => {
            setComponent(<DashboardData />);
            setActive("Dashboard");
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: active === "Dashboard" ? "primary.light" : "text.link",
              }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{
              color: active === "Dashboard" ? "primary.light" : "text.link",
            }}
          >
            Dashboard
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <ManageAccountsIcon
              sx={{
                color:
                  active === "Clients" || active === "Challans"
                    ? "primary.light"
                    : "text.link",
              }}
            />
          </ListItemIcon>

          <ListItemText
            sx={{
              color:
                active === "Clients" || active === "Challans"
                  ? "primary.light"
                  : "text.link",
            }}
          >
            Ledgers
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            // onClick={() => {
            //   setComponent(<DebtorsPage />);
            //   // setActive("Ledgers");
            // }}
          >
            <ListItemButton
              sx={{ pl: 5 }}
              onClick={() => {
                setActive("Clients");
                setComponent(<DebtorsPage />);
              }}
            >
              <PeopleIcon
                sx={{
                  mr: 1,
                  fontSize: "1rem",
                  color: active === "Clients" ? "primary.light" : "text.link",
                }}
              />
              <ListItemText
                sx={{
                  color: active === "Clients" ? "primary.light" : "text.link",
                }}
              >
                Clients
              </ListItemText>
            </ListItemButton>
            {/* Challan Menu */}
            <ListItemButton
              sx={{ pl: 5 }}
              onClick={() => {
                setActive("Challans");
                setComponent(<ChallansPage />);
              }}
            >
              <ReceiptIcon
                sx={{
                  mr: 1,
                  fontSize: "1rem",
                  color: active === "Challans" ? "primary.light" : "text.link",
                }}
              />
              <ListItemText
                sx={{
                  color: active === "Challans" ? "primary.light" : "text.link",
                }}
              >
                Challans
              </ListItemText>
            </ListItemButton>
          </List>
        </Collapse>

        <MenuItem
          onClick={() => {
            setActive("Transporter");
            setComponent(<TransporterPage />);
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon
              sx={{
                color: active === "Transporter" ? "primary.light" : "text.link",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              color: active === "Transporter" ? "primary.light" : "text.link",
            }}
          >
            Transporter
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActive("Products");
            setComponent(<ProductsPage />);
          }}
        >
          <ListItemIcon>
            <InventoryIcon
              sx={{
                color: active === "Products" ? "primary.light" : "text.link",
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              color: active === "Products" ? "primary.light" : "text.link",
            }}
          >
            Products
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};
