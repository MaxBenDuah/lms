// import { Avatar } from "primereact/avatar";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { FloatLabel } from "primereact/floatlabel";
// import { Calendar } from "primereact/calendar";
import { useState } from "react";
// import { Dropdown } from "primereact/dropdown";
// import { InputTextarea } from "primereact/inputtextarea";
import { useCreateNewLeaveRequest } from "../features/employees/useCreateNewLeaveRequest";
// import { useUserDataContext } from "../contexts/userContext";
// import { useSearchParams } from "react-router-dom";

function DialogPopup({ setVisible, data }) {
  // const [createdAt, setCreatedAt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectLeaveType, setSelectLeaveType] = useState("Casual Leave");
  const [selectStatus] = useState("Pending"); //I don't need the setSelectStatus
  const [reason, setReason] = useState("");
  const {
    mutate: createNewLeaveRequest,
    isPending,
    isError,
    error,
  } = useCreateNewLeaveRequest();

  // const { currentUserDetails } = useUserDataContext();
  // console.log(currentUserDetails);

  // console.log(data);

  // const [searchParams] = useSearchParams();
  // const id = Number(searchParams.get("id"));
  // console.log(visible);
  // console.log(createdAt);

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Privilege Leave",
    "Marriage Leave",
    "Maternity Leave",
  ];

  function handleSubmit(e) {
    e.preventDefault();

    createNewLeaveRequest(
      {
        // id, previously
        // employee_id: id,
        employee_id: data.id,
        // created_at: createdAt, i don't need this because it is automatically done in supabase
        leave_type: selectLeaveType,
        start_date: startDate,
        end_date: endDate,
        status: selectStatus,
        comments: reason,
      },
      {
        onSuccess: () => {
          setVisible(false);
        },
      }
    );
  }

  // const status = ["Pending", "Approved", "Rejected"];- previous, i have removed "Approved", and "Rejected" because it's not needed. And there's no need to put this in an array since it's just one option

  // const headerElement = (
  //   <div className="text-center">
  //     {/* className="inline-flex align-items-center justify-content-center gap-2" */}
  //     {/* <Avatar
  //       image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
  //       shape="circle"
  //     />
  //     <span className="font-bold white-space-nowrap">Amy Elsner</span> */}
  //     <h3>New Leave Request</h3>
  //   </div>
  // );

  // const footerContent = (
  //   <div>
  //     <Button
  //       label="Ok"
  //       icon="pi pi-check"
  //       onClick={() => setVisible(false)}
  //       autoFocus
  //     />
  //   </div>
  // );

  if (isPending) return <p>Creating Leave request...</p>;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
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
        <input type="text" value={selectStatus} disabled />
        {/* <select
          value={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
        >
          {status.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select> */}
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        <button type="submit">Submit</button>
        <button onClick={() => setVisible(false)}>Cancel</button>
      </form>
    </>
  );
}

export default DialogPopup;

{
  /* <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        // onHide={() => {
        //   if (!visible) return;
        //   setVisible(false);
        // }}
      >
        
      </Dialog> */
}

{
  /* <form
          onClick={handleSubmit}
          className="flex gap-8 flex-wrap justify-content-center"
        >
          <FloatLabel>
            <Calendar
              inputId="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
            />
            <label htmlFor="start_date">Start Date</label>
          </FloatLabel>
          <FloatLabel>
            <Calendar
              inputId="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
            />
            <label htmlFor="end_date">End Date</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown
              value={selectLeaveType}
              onChange={(e) => setSelectLeaveType(e.value)}
              options={leaveTypes}
              // optionLabel="name" - this is not necessary per the documentation
              placeholder="Select a city"
              className="w-full md:w-14rem"
            />
          </FloatLabel>
          <FloatLabel>
            <Dropdown
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.value)}
              options={status}
              // optionLabel="name" -this is not necessary per the documentation
              placeholder="Select status"
              className="w-full md:w-14rem"
            />
          </FloatLabel>
          <InputTextarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={5}
            cols={30}
          />
          <button type="submit">Submit</button>
        </form> */
}
