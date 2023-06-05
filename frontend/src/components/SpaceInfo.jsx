import React from "react";
import SpaceActions from "./SpaceActions";

const SpaceInfo = ({ space }) => {
  return (
    <div className="space-info">
      <h1 className="space-title">{space.title}</h1>
      <p>{space.state} Space</p>
      {space.members?.length >= 0 && <p>{space.members.length} Members</p>}
      {space.adminId?.length >= 0 && <p>{space.adminId.length} Admins</p>}
      <SpaceActions space={space} />
    </div>
  );
};

export default SpaceInfo;
