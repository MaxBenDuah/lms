import { useEffect, useState } from "react";
import { useFetchLeaveRequestById } from "./useFetchLeaveRequestById";
import { useUpdateLeaveRequest } from "./useUpdateLeaveRequest";
import { useSearchParams } from "react-router-dom";

function UpdateLeaveRequest({ setEditId }) {
  // const [createdAt, setCreatedAt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectLeaveType, setSelectLeaveType] = useState("Casual Leave");
  const [selectStatus, setSelectStatus] = useState("Pending");
  const [reason, setReason] = useState("");

  const { data, isLoading, isError, error } = useFetchLeaveRequestById();

  const [searchParams] = useSearchParams();
  const editId = Number(searchParams.get("editId"));

  const {
    mutate: updateLeaveRequest,
    isPending,
    isError: isError2,
    error: error2,
  } = useUpdateLeaveRequest();

  useEffect(
    function () {
      if (data) {
        setReason(data.comments);
        setSelectStatus(data.status);
        setSelectLeaveType(data.leave_type);
        setEndDate(data.end_date);
        setStartDate(data.start_date);
        // setCreatedAt(data.created_at);
      }
    },
    [data]
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  if (isPending) return <p>Updating leave request...</p>;

  if (isError2)
    return <p>Could not update your leave request - {error2.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    updateLeaveRequest(
      {
        id: editId,
        // created_at: createdAt,
        leave_type: selectLeaveType,
        start_date: startDate,
        end_date: endDate,
        status: selectStatus,
        comments: reason,
      },
      {
        onSuccess: () => {
          setEditId(null);
        },
      }
    );
  }

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Privilege Leave",
    "Marriage Leave",
    "Maternity Leave",
  ];

  const status = ["Pending", "Approved", "Rejected"];

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
      /> */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <select
        value={selectLeaveType}
        onChange={(e) => setSelectLeaveType(e.target.value)}
      >
        {leaveTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <select
        value={selectStatus}
        onChange={(e) => setSelectStatus(e.target.value)}
      >
        {status.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      <button type="submit">Submit</button>
      <button onClick={() => setEditId(null)}>Cancel</button>
    </form>
  );
}

export default UpdateLeaveRequest;
