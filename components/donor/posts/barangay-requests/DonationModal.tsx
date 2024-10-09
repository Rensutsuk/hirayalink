import React, { useState } from 'react';

const DonationModal = ({ posts, selectedPostId, handleDonateClick, handleCloseModal }) => {
  const post = posts.find((p) => p.id === selectedPostId);
  const [selectedItems, setSelectedItems] = useState<{ name: string; quantity: number; specificName: string }[]>([]);

  const handleItemSelection = (itemName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, { name: itemName, quantity: 1, specificName: '' }]);
    } else {
      setSelectedItems(selectedItems.filter(item => item.name !== itemName));
    }
  };

  const handleItemChange = (index: number, field: 'quantity' | 'specificName', value: string | number) => {
    const updatedItems = [...selectedItems];
    updatedItems[index][field] = value;
    setSelectedItems(updatedItems);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select Items to Donate</h2>
        {post?.inKind.split(",").map((item, index) => {
          const trimmedItem = item.trim();
          const isSelected = selectedItems.some(i => i.name === trimmedItem);
          const selectedIndex = selectedItems.findIndex(i => i.name === trimmedItem);

          return (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleItemSelection(trimmedItem, e.target.checked)}
                  className="mr-2"
                />
                <span>{trimmedItem}</span>
              </div>
              {isSelected && (
                <div className="ml-6 space-y-2">
                  <input
                    type="text"
                    placeholder="Specific item name"
                    value={selectedItems[selectedIndex].specificName}
                    onChange={(e) => handleItemChange(selectedIndex, 'specificName', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    min="1"
                    value={selectedItems[selectedIndex].quantity}
                    onChange={(e) => handleItemChange(selectedIndex, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={() => {
            if (post) handleDonateClick(post, selectedItems);
          }}
          disabled={selectedItems.length === 0}
          className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          Confirm
        </button>
        <button
          onClick={handleCloseModal}
          className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DonationModal;