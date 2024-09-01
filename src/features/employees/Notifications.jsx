import NotificationItem from "./NotificationItem";
import { useGetNotifications } from "./useGetNotifications";

function Notifications() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useGetNotifications();

  if (isLoading) return <p>Loading notifications...</p>;

  if (isError) return <p>{error.message}</p>;

  // console.log(notifications);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications?.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
