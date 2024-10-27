import React, { useState } from "react";

interface Donation {
  id: number;
  controlNumber: string;
  donationStatus: string;
}

interface UpdateStatusModalProps {
  donation: Donation;
  onClose: () => void;
  onUpdateStatus: (
    donationId: number,
    newStatus: string,
    remarks: string
  ) => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  donation,
  onClose,
  onUpdateStatus,
}) => {
  const [status, setStatus] = useState(donation.donationStatus);
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    if (
      window.confirm(
        "Are you sure you want to update the status of this donation?"
      )
    ) {
      onUpdateStatus(donation.id, status, remarks);
      onClose();
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl font-bold bg-primary text-white p-4">
          Update Status for: {donation.controlNumber}
        </h2>
        <div className="p-4">
          <label className="form-control w-full mb-4">
            <span className="label">
              <span className="label-text">Status:</span>
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label className="form-control w-full mb-4">
            <span className="label">
              <span className="label-text">Remarks:</span>
            </span>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="textarea textarea-bordered h-24"
            ></textarea>
          </label>
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">
              Update Status
            </button>
            <button onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
