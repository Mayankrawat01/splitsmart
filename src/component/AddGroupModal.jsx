import { useState } from "react";

export default function AddGroupModal({ setShowModal, setGroups }) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  const handleSubmit = () => {
    if (!name || !members) {
      alert("Please fill all fields");
      return;
    }

    const memberArray = members.split(",").map((m) => m.trim()).filter(m => m);

    if (memberArray.length === 0) {
      alert("Please add at least one member");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name,
      members: memberArray,
      expenses: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setShowModal(false);
    
    // Reset form
    setName("");
    setMembers("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Group</h2>

        <div className="form-group">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Members</label>
          <input
            type="text"
            placeholder="Enter names separated by commas"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
          <small>Example: John, Jane, Mike</small>
        </div>

        <div className="modal-buttons">
          <button className="btn-primary" onClick={handleSubmit}>
            Create Group
          </button>
          <button className="btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
