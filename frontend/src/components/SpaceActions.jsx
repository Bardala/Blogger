import { useAuthContext } from "../hooks/useAuthContext";
import AddMemberButton from "./AddMemberButton";
import JoinSpaceButton from "./JoinSpaceButton";

const SpaceActions = ({ space }) => {
  const { user } = useAuthContext();
  console.log("spaceAction ", space);

  return (
    <div className="space-actions">
      {user && space.adminId?.includes(user._id) && (
        <AddMemberButton spaceId={space._id} admin={user} />
      )}

      {user &&
        space.state === "public" &&
        !space.members.includes(user._id) && (
          <JoinSpaceButton spaceId={space._id} />
        )}
    </div>
  );
};

export default SpaceActions;
