import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../Context/UserContext";
import { CircularProgress } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "productName",
    headerName: "Product name",
    flex: 1,
    editable: false,
  },
  {
    field: "openingQty",
    headerName: "Opening Quantity",
    type: "number",
    flex: 1,
    editable: false,
  },
  {
    field: "unit",
    headerName: "Unit",
    flex: 1,
    editable: false,
  },
];

export default function ProductsDataGrid(props) {
  const { productsListUpdated, setProductsListUpdated } = props.data;
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [productsData, setProductsData] = useState(null);
  const { serverUrl, firm } = useContext(UserContext);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const getProducts = async () => {
      const firmId = JSON.parse(firm)._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = `${serverUrl}/api/products/getProducts/${firmId}`;
        const data = await axios.get(url, config);
        setProductsData(JSON.stringify(data.data.products));
        setProductsListUpdated(false);
      } catch (error) {
        if (
          error.response.data.message === "Not authorized to access this route"
        ) {
          return navigate("/login");
        }
      }
    };
    getProducts();
  }, [
    productsData,
    firm,
    serverUrl,
    token,
    navigate,
    productsListUpdated,
    setProductsListUpdated,
  ]);

  const products = productsData && JSON.parse(productsData);

  const rowss =
    products &&
    products.map((product, index) => ({
      id: index + 1,
      productName: product.productName,
      openingQty: product.openingQty,
      unit: product.unit,
    }));

  return (
    <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      {rowss ? (
        <DataGrid
          rows={rowss}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
