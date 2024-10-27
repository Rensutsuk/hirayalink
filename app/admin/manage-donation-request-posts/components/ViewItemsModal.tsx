import React from "react";

interface DonationItem {
  itemName: string;
  quantity: number;
}

interface Donation {
  controlNumber: string;
  donationItems?: DonationItem[];
}

interface ViewItemsModalProps {
  donation: Donation;
  onClose: () => void;
}

const ViewItemsModal: React.FC<ViewItemsModalProps> = ({
  donation,
  onClose,
}) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl w-full">
        <div className="bg-primary text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">
            Donation Items: {donation.controlNumber}
          </h2>
        </div>
        <div className="p-6">
          {donation.donationItems && donation.donationItems.length > 0 ? (
            <ul className="list-disc list-inside">
              {donation.donationItems.map((item, index) => (
                <li key={index}>
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found for this donation.</p>
          )}
        </div>
        <div className="modal-action pb-4 pr-4">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItemsModal;
