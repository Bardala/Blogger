import { useJoinSpace } from "../hooks/spaceApis";
import { useAuthContext } from "../hooks/useAuthContext";

const JoinSpaceButton = ({ spaceId }) => {
  const user = useAuthContext();
  const { joinSpace, error, isPending } = useJoinSpace();

  const handleClick = () => {
    console.log("handleClick");
    if (user) joinSpace(spaceId);
  };

  if (error)
    return <p className="error">Joining Space Error: {error.message}</p>;
  if (isPending) return <p>Loading...</p>;

  return (
    <div className="join-space-button">
      <button onClick={handleClick}>Join Space</button>
    </div>
  );
};

export default JoinSpaceButton;
