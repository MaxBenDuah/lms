import { useSearchParams } from "react-router-dom";
import { convertDate } from "../../utils/helpers";
import { useState } from "react";
import UpdateLeaveRequest from "./UpdateLeaveRequest";
import { useDeleteLeaveRequest } from "./useDeleteLeaveRequest";

function LeaveItem({ leave }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editId, setEditId] = useState(null);
  const {
    mutate: deleteLeaveRequest,
    isPending,
    isError,
    error,
  } = useDeleteLeaveRequest();

  if (isError)
    return (
      <p>
        There was a problem deleting your leave request. Try again later{" "}
        {error.message}
      </p>
    );

  return (
    <>
      {!editId ? (
        <li>
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
            disabled={isPending}
          >
            {isPending ? `Deleting` : `Delete`}
          </button>
        </li>
      ) : (
        <UpdateLeaveRequest setEditId={setEditId} />
      )}
    </>
  );

  // return (
  //   <li key={leave.id}>
  //     <h4>Apply date: {convertDate(leave.created_at)}</h4>
  //     <p>From date: {leave.start_date}</p>
  //     <p>End date: {leave.end_date}</p>
  //     <p>Type: {leave.leave_type}</p>
  //     <p>Status: {leave.status}</p>
  //     <p>Reason: {leave.comments}</p>
  //     <button
  //       onClick={() => {
  //         searchParams.set("editId", leave.id);
  //         setSearchParams(searchParams);
  //         setEditId(leave.id);
  //       }}
  //     >
  //       Update
  //     </button>
  //     <button
  //       onClick={() => deleteLeaveRequest(leave.id)}
  //       disabled={isPending && leave.id === id}
  //     >
  //       Delete
  //     </button>
  //   </li>
  // );
}

export default LeaveItem;
