import React, { useEffect } from "react";
import Connectioncard from "../components/Connectioncard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addconnectionsData } from "../store/connectionSlice";



const ConnectionsPage = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);

  useEffect(() => {
    async function getConnections() {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addconnectionsData(res.data.data));
      } catch (err) {
        console.log(err.message);
      }
    }

    getConnections();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl py-5">Connections</h1>
      {connections && connections.length > 0 ? (
        <Connectioncard users={connections} />
      ) : (
        <h3 className="text-center text-sm text-gray-500">No connections</h3>
      )}
    </div>
  );
};

export default ConnectionsPage;
