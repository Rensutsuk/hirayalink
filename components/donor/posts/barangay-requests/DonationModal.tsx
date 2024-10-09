import React from 'react';

const DonationModal = ({ posts, selectedPostId, selectedItems, handleItemSelection, handleDonateClick, handleCloseModal }) => {
  const post = posts.find((p) => p.id === selectedPostId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Select Items to Donate</h2>
        {post?.inKind.split(",").map((item, index) => (
          <div key={index} className="mb-2">
            <input
              type="checkbox"
              checked={selectedItems.some((i) => i.name === item.trim())}
              onChange={() =>
                handleItemSelection({
                  name: item.trim(),
                  quantity: 1,
                })
              }
              className="mr-2"
            />
            <span>{item.trim()}</span>
          </div>
        ))}
        <button
          onClick={() => {
            if (post) handleDonateClick(post);
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