import React, { useState } from "react";
import { useSession } from "next-auth/react";

const DonationModal = ({
  post,
  handleCloseModal,
}: {
  post: any;
  handleCloseModal: any;
}) => {
  const { data: session } = useSession();
  const [selectedItems, setSelectedItems] = useState<
    { name: string; quantity: number; specificName: string }[]
  >([]);

  const handleItemSelection = (itemName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([
        ...selectedItems,
        { name: itemName, quantity: 1, specificName: "" },
      ]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item.name !== itemName));
    }
  };

  const handleItemChange = (
    index: number,
    field: "quantity" | "specificName",
    value: string | number
  ) => {
    const updatedItems = [...selectedItems];
    updatedItems[index][field] = value as never;
    setSelectedItems(updatedItems);
  };

  if (!post || !post.inKind) {
    console.log("Post or inKind is undefined");
    return null; // or return a loading indicator or error message
  }

  const necessitiesArray = Object.keys(post.inKind);

  const handleDonateClick = async () => {
    try {
      const response = await fetch("/api/submit-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorId: session?.user?.id,
          barangayId: post.barangayId,
          barangayRequestPostId: post.id,
          items: selectedItems.map((item) => ({
            itemName: item.specificName || item.name,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Donation has been Pleged. Please await the next steps.");

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="modal-box bg-base-100 w-11/12 max-w-md">
        <div className="bg-primary text-white p-5 rounded-t-lg sticky top-0 w-full z-50">
          <h2 className="text-xl font-bold">Select Items to Donate</h2>
        </div>
        <div className="px-5 my-5">
          {necessitiesArray.map((item, index) => {
            const isSelected = selectedItems.some((i) => i.name === item);
            const selectedIndex = selectedItems.findIndex(
              (i) => i.name === item
            );

            return (
              <div key={index} className="form-control mb-4">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) =>
                      handleItemSelection(item, e.target.checked)
                    }
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text text-lg">{item}</span>
                </label>
                {isSelected && (
                  <div className="ml-6 space-y-2 mt-2">
                    <input
                      type="text"
                      placeholder="Specific item name"
                      value={selectedItems[selectedIndex].specificName}
                      onChange={(e) =>
                        handleItemChange(
                          selectedIndex,
                          "specificName",
                          e.target.value
                        )
                      }
                      required
                      className="input input-bordered w-full"
                    />
                    <input
                      type="number"
                      min="1"
                      value={selectedItems[selectedIndex].quantity}
                      onChange={(e) =>
                        handleItemChange(
                          selectedIndex,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal-action pb-5 pr-5">
          <button
            onClick={handleDonateClick}
            disabled={selectedItems.length === 0}
            className="btn btn-primary text-white"
          >
            Confirm
          </button>
          <button onClick={handleCloseModal} className="btn btn-error">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
