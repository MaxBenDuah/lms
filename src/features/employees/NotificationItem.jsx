import { useDeleteNotification } from "./useDeleteNotification";
import { useMarkNotificationAsRead } from "./useMarkNotificationAsRead";

function NotificationItem({ notification }) {
  const {
    mutate: markNotificationAsRead,
    isPending: isUpdating,
    isError: isError2,
    error: error2,
  } = useMarkNotificationAsRead();

  const {
    mutate: deleteNotification,
    isPending: isDeleting,
    isError: isError3,
    error: error3,
  } = useDeleteNotification();

  if (isError2) return <p>{error2.message}</p>;

  if (isError3) return <p>{error3.message}</p>;

  return (
    <li className={notification.is_read ? "font-normal" : "font-bold"}>
      {notification.message}
      {!notification.is_read && (
        <button
          onClick={() => markNotificationAsRead(notification.id)}
          disabled={isUpdating}
        >
          Mark as read
        </button>
      )}
      <button
        onClick={() => deleteNotification(notification.id)}
        disabled={isDeleting}
      >
        Delete
      </button>
    </li>
  );
}

export default NotificationItem;
