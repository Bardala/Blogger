const SpaceInfo = ({ members, admins, spaceTitle, state }) => {
  return (
    <div className="space-info">
      <h1>{spaceTitle}</h1>
      <p>State: {state}</p>
      {members?.length > 0 && (
        <p>Members: {members.map((member) => member).join(", ")}</p>
      )}
      {admins?.length > 0 && (
        <p>Admins: {admins.map((admin) => admin).join(", ")}</p>
      )}
    </div>
  );
};

export default SpaceInfo;
