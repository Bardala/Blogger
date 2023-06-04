import { useAddMember } from "../hooks/spaceApis";

const AddMemberButton = ({ spaceId, admin }) => {
  const { addMember, error, isPending } = useAddMember();

  const handleClick = () => {
    console.log("handleClick");
    const memberId = prompt("Enter the member id:");
    console.log(admin);
    if (admin) addMember(spaceId, admin, memberId);
  };

  if (error) return <p className="error">Adding User Error: {error.message}</p>;
  if (isPending) return <p>Loading...</p>;

  return (
    <div className="add-member-button">
      <button onClick={handleClick}>Add Member</button>
    </div>
  );
};

export default AddMemberButton;
