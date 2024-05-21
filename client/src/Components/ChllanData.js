import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import axios from "axios";

export default function ChallanData(props) {
  const { setChallanData, changed, setChanged } = props.data;
  const { serverUrl, firm } = useContext(UserContext);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(
    () => {
      if (!token) {
        navigate("/login");
      }

      const getChallans = async () => {
        const firmId = JSON.parse(firm)._id;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const url = `${serverUrl}/api/ledgers/getAllChallans/${firmId}`;
          const data = await axios.get(url, config);
          setChallanData(JSON.stringify(data.data.data));
        } catch (error) {
          console.log(error);
          if (
            error.response.data.message ===
            "Not authorized to access this route"
          ) {
            return navigate("/login");
          }
        }
      };
      getChallans();
    },
    [firm, serverUrl, token, navigate, setChallanData, setChanged, changed],
    changed
  );
}
