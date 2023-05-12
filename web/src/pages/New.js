import { useState } from "react";
const LeaveForm = () => {
    const [leaveTypes, setLeaveTypes] = useState([{ leaveType: '', priority: 'low' }]);
  
    const handleChange = (index, e) => {
      const { name, value } = e.target;
      const updatedLeaveTypes = [...leaveTypes];
      updatedLeaveTypes[index][name] = value;
      setLeaveTypes(updatedLeaveTypes);
    };
  
    const handleAddLeaveType = () => {
      setLeaveTypes([...leaveTypes, { leaveType: '', priority: 'low' }]);
    };
  
    const handleRemoveLeaveType = (index) => {
      const updatedLeaveTypes = [...leaveTypes];
      updatedLeaveTypes.splice(index, 1);
      setLeaveTypes(updatedLeaveTypes);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform your submit logic here, e.g., send the data to the server
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {leaveTypes.map((leaveType, index) => (
          <div key={index}>
            <label>
              Leave Type:
              <input
                type="text"
                name="leaveType"
                value={leaveType.leaveType}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label>
              Priority:
              <select
                name="priority"
                value={leaveType.priority}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveLeaveType(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddLeaveType}>
          Add Leave Type
        </button>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default LeaveForm;