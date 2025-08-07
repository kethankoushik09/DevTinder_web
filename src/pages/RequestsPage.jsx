import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addrequestsdata } from "../store/requestSlice";
import RequestCard from "../components/RequestCard";

const RequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);
  async function getRequestData() {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addrequestsdata(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getRequestData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-center py-5">Requests page</h1>
      {requests && requests.length > 0 ? (
        <RequestCard users={requests} />
      ) : (
        <div>No requests found</div>
      )}
    </div>
  );
};

export default RequestsPage;
