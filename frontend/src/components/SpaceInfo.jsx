const SpaceInfo = ({ members, admins, spaceTitle, state }) => {
  return (
    <div className="space-info">
      <h1>{spaceTitle}</h1>
      <p>State: {state}</p>
      {/* map over the members and admins arrays and join them with commas */}
      <p>Members: {members.map((member) => member).join(", ")}</p>
      <p>Admins: {admins.map((admin) => admin).join(", ")}</p>
    </div>
  );
};

export default SpaceInfo;
