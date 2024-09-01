import { useUser } from "../features/users/useUser";

function InnerHeading() {
  const { user } = useUser();
  const { avatar, name } = user.user_metadata;

  return (
    <div className="flex align-items-center gap-4 justify-content-end">
      <div className="">
        <img
          src={
            avatar
              ? avatar
              : "https://blocks.primereact.org/demo/images/blocks/avatars/circle-big/avatar-f-2.png"
          }
          alt=""
          className="w-3rem h-3rem border-circle "
          style={{ objectFit: "cover" }}
        />
      </div>
      <p>{name}</p>
    </div>
  );
}

export default InnerHeading;
