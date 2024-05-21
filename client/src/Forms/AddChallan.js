import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddChallan(props) {
  const { open, setOpen, handleClose, setChanged } = props.data;
  const { firm, serverUrl } = useContext(UserContext);
  const [challanNo, setChallanNo] = useState(null);
  const [date, setDate] = useState(new Date());
  const [productsData, setProductsData] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [names, setNames] = useState(null);
  const [inputFields, setInputfields] = useState([
    {
      productId: "",
      price: null,
      qty: null,
    },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("no error");
    setShow(false);
    setChanged(false);

    let data = [];

    for (let i = 0; i < inputFields.length; i++) {
      data.push({
        productId: inputFields[i].productId,
        quantity: inputFields[i].qty,
        rate: inputFields[i].price,
      });
    }

    // let products = [
    //   {
    //     productId: "64231ec927a6442ed18bcac7",
    //     quantity: "7",
    //     rate: "25",
    //   },
    //   {
    //     productId: "64231edb27a6442ed18bcad2",
    //     quantity: "7",
    //     rate: "30",
    //   },
    // ];

    // Add Challan Data
    const token = localStorage.getItem("authToken");
    try {
      const firmId = JSON.parse(firm)._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `${serverUrl}/api/ledgers/createchallan`,
        {
          firmId,
          challanNo: Number(challanNo),
          clientId: companyName,
          products: data,
          challanDate: new Date(date).toLocaleDateString(),
        },
        { headers: config.headers }
      );
      setChanged(true);
      handleClose();
    } catch (error) {
      console.log(error);
      setError(error);
      setShow(true);
    }
  };

  const addFields = (e, index) => {
    const values = [...inputFields];
    values.splice(index + 1, 0, {
      productId: "",
      price: null,
      qty: null,
    });
    setInputfields(values);
  };

  const removeField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputfields(values);
    // console.log(values);
  };

  const handleChangeInput = (e, index) => {
    const values = [...inputFields];
    values[index][e.target.name] = e.target.value;
    setInputfields(values);
  };

  const sxValue = {
    value: {
      "& .MuiFormLabel-root": {
        color: "text.main",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "text.main",
      },
    },
  };

  // function Label({ componentName, valueType }) {
  //   const content = (
  //     <span>
  //       <strong>{componentName}</strong>
  //     </span>
  //   );
  //   return content;
  // }

  const handleNumbers = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = onlyNums;
  };

  const loadProducts = async () => {
    const firmId = JSON.parse(firm)._id;
    const token = localStorage.getItem("authToken");

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
    } catch (error) {
      if (
        error.response.data.message === "Not authorized to access this route"
      ) {
        return navigate("/login");
      }
    }
  };

  const loadClients = async () => {
    async function getClients() {
      const token = localStorage.getItem("authToken");
      const { _id } = JSON.parse(firm);
      try {
        const data = await axios.get(
          `${serverUrl}/api/ledgers/getdebtors/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNames(JSON.stringify(data.data.data));
      } catch (error) {
        navigate("/login");
      }
    }
    getClients();
  };

  return (
    <Box open={open} onClose={handleClose}>
      {open && (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              mb: 2,
              position: { xs: "sticky", sm: "inherit" },
              top: { xs: 5 },
              zIndex: 99,
              background: "red",
            }}
          >
            <Collapse in={show}>
              <Alert onClose={() => setOpen(false)} severity="error">
                {error}
              </Alert>
            </Collapse>
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography fullWidth variant="h6" fontWeight={600} gutterBottom>
              Add Challan
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(inputFields);
            }}
            noValidate
          >
            <Grid container spacing={2} mt={1}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <TextField
                  sx={sxValue.value}
                  required
                  id="challanNo"
                  name="challanNo"
                  label="Challan Number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    handleNumbers(e);
                    setChallanNo(e.target.value);
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoItem>
                    {/* <DemoItem
                    label={<Label componentName="Date" valueType="date" />}
                  > */}
                    <DatePicker
                      // defaultValue={}
                      name="Date"
                      value={dayjs(new Date())}
                      onChange={(value) => setDate(Date.parse(value.$d))}
                    />
                  </DemoItem>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={sxValue.value}
                  select
                  id="comapnyName"
                  name="companyName"
                  label="Company Name"
                  fullWidth
                  required
                  variant="outlined"
                  onClick={() => loadClients()}
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  {names &&
                    JSON.parse(names).map((name) => {
                      return (
                        <MenuItem value={name._id}>{name.companyName}</MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                {inputFields.map((fields, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "1rem",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <TextField
                        sx={sxValue.value}
                        select
                        id="productId"
                        name="productId"
                        label="Product Name"
                        fullWidth
                        required
                        variant="outlined"
                        flex={3}
                        onClick={() => loadProducts()}
                        onChange={(e) => {
                          handleChangeInput(e, index);
                        }}
                      >
                        {productsData &&
                          JSON.parse(productsData).map((product) => {
                            return (
                              <MenuItem value={product._id}>
                                {product.productName}
                              </MenuItem>
                            );
                          })}
                      </TextField>
                      <TextField
                        sx={sxValue.value}
                        id="price"
                        name="price"
                        label="Price"
                        variant="outlined"
                        value={fields.price}
                        flex={3}
                        onChange={(e) => {
                          handleChangeInput(e, index);
                        }}
                      />
                      <TextField
                        sx={sxValue.value}
                        id="qty"
                        name="qty"
                        label="Quantity"
                        required
                        variant="outlined"
                        value={fields.qty}
                        flex={1}
                        onChange={(e) => {
                          handleChangeInput(e, index);
                        }}
                      />
                      <IconButton
                        size="large"
                        sx={{ background: "#6130a1", padding: 1 }}
                        onClick={(e) => addFields(e, index)}
                      >
                        <AddIcon sx={{ color: "#051324", fontSize: 32 }} />
                      </IconButton>
                      {inputFields.length > 1 && (
                        <IconButton
                          size="large"
                          sx={{ background: "#6130a1", padding: 1 }}
                          onClick={(index) => {
                            removeField(index);
                          }}
                        >
                          <RemoveIcon sx={{ color: "#051324", fontSize: 32 }} />
                        </IconButton>
                      )}
                    </Box>
                  );
                })}
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={(e) => handleSubmit(e)}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
    </Box>
  );
}
