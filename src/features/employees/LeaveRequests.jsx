// import { useSearchParams } from "react-router-dom";
// import { convertDate } from "../../utils/helpers";
// import { useDeleteLeaveRequest } from "./useDeleteLeaveRequest";
import { useGetLeaveRequest } from "./useGetLeaveRequest";
// import { useState } from "react";
// import UpdateLeaveRequest from "./UpdateLeaveRequest";
import LeaveItem from "./LeaveItem";

function LeaveRequests({ data }) {
  const {
    data: leaveRequests,
    isLoading,
    isError,
    error,
  } = useGetLeaveRequest(data.id);

  // const {
  //   mutate: deleteLeaveRequest,
  //   isPending,
  //   isError: isErro2,
  //   error: error2,
  // } = useDeleteLeaveRequest();

  // const [searchParams, setSearchParams] = useSearchParams();

  // const [editId, setEditId] = useState(null);

  if (isLoading) return <p>Loading leave request data...</p>;

  if (isError) return <p>{error.message}</p>;
  // console.log(leaveRequests);

  if (!leaveRequests.length) return <p>Your leave request will appear here.</p>;

  return (
    <ul>
      {leaveRequests?.map((leave) => (
        <LeaveItem key={leave.id} leave={leave} />
      ))}
      {/* {leaveRequests.map((leave) => {
        const { id } = leave;
        return (
          <li key={leave.id}>
            <h4>Apply date: {convertDate(leave.created_at)}</h4>
            <p>From date: {leave.start_date}</p>
            <p>End date: {leave.end_date}</p>
            <p>Type: {leave.leave_type}</p>
            <p>Status: {leave.status}</p>
            <p>Reason: {leave.comments}</p>
            <button
              onClick={() => {
                searchParams.set("editId", leave.id);
                setSearchParams(searchParams);
                setEditId(leave.id);
              }}
            >
              Update
            </button>
            <button
              onClick={() => deleteLeaveRequest(leave.id)}
              disabled={isPending && leave.id === id}
            >
              Delete
            </button>
          </li>
        );
      })}
      {editId && <UpdateLeaveRequest setEditId={setEditId} />} */}
    </ul>
  );
}

export default LeaveRequests;
