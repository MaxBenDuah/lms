// import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { convertDate } from "../../utils/helpers";
import { useGetEmployeeName } from "./useGetEmployeeName";
import { useUpdateLeaveRequestByManager } from "./useUpdateLeaveRequestByManager";

function LeaveRequestsItemForManagers({ leave }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [leaveStatus, setLeaveStatus] = useState(leave.status);

  // console.log(leave);
  const {
    id,
    created_at,
    start_date,
    end_date,
    status,
    leave_type,
    comments,
    employee_id,
  } = leave;

  const { data, isLoading, isError, error } = useGetEmployeeName(employee_id);

  const {
    mutate: updateLeaveRequest,
    isPending: isUpdating,
    isError: isError2,
    error: error2,
  } = useUpdateLeaveRequestByManager();

  // console.log(isUpdating);

  if (isLoading) return <p>Loading employee name</p>;

  if (isError) return <p>{error.message}</p>;

  // I will later put this error in a toast
  if (isError2)
    return <p>There was an error updating your request - {error2.message}</p>;

  const { name } = data;

  // console.log(data);

  function handleUpdate(e) {
    const value = e.target.value;
    // console.log(value);

    if (!value) return;

    updateLeaveRequest({ value, id });
    searchParams.set("updateId", employee_id);
    setSearchParams(searchParams);
  }

  return (
    <li>
      <h1>{name}</h1>
      <p>Created at: {convertDate(created_at)}</p>
      <p>Start date: {convertDate(start_date)}</p>
      <p>End date: {convertDate(end_date)}</p>
      {/* <p>Status: {status}</p> */}
      <select
        defaultValue={status}
        onBlur={(e) => handleUpdate(e)}
        disabled={isUpdating}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <p>Leave type: {leave_type}</p>
      <p>Reason {comments}</p>
    </li>
  );
}

export default LeaveRequestsItemForManagers;
