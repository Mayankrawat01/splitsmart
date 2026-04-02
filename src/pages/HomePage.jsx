import { useState } from "react";
import GroupCard from "../component/GroupCard";
import AddGroupModal from "../component/AddGroupModal";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>SplitSmart</h1>
          <p>Split bills, settle smart</p>
        </div>

        <button className="new-btn" onClick={() => setShowModal(true)}>
          + New Group
        </button>
      </div>

      <h3 className="section-title">YOUR GROUPS</h3>

      {groups.length === 0 ? (
        <div className="empty-state">
          <p>No groups yet. Create your first group!</p>
        </div>
      ) : (
        groups.map((group) => (
          <GroupCard 
            key={group.id} 
            group={group} 
            setGroups={setGroups} 
          />
        ))
      )}

      {showModal && (
        <AddGroupModal
          setShowModal={setShowModal}
          setGroups={setGroups}
        />
      )}
    </div>
  );
}
