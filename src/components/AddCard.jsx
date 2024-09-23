import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCard, getCardsByBucketId } from "../slices/combinedSlice"; // Adjust the import path based on your project structure

function AddCard() {
  const dispatch = useDispatch();
  const { buckets, cards } = useSelector((state) => state.combined); // Extracting buckets from combined slice state
  const [cardName, setCardName] = useState(""); // Local state for card name
  const [selectedBucketId, setSelectedBucketId] = useState(""); // Local state for selected bucket
  const [mediaUrl, setMediaUrl] = useState(""); // Local state for media URL

  console.log(cards);
  const handleAddClick = () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    // Validate that the form fields are filled out and mediaUrl is a valid URL
    if (cardName.trim() && selectedBucketId && mediaUrl.trim()) {
      if (urlPattern.test(mediaUrl)) {
        // Dispatch addCard action with the required data
        dispatch(
          addCard({
            name: cardName,
            bucketAdded: selectedBucketId,
            mediaUrl: mediaUrl,
          })
        );
        dispatch(getCardsByBucketId(selectedBucketId));
        // Clear the form after submission
        setCardName("");
        setSelectedBucketId("");
        setMediaUrl("");
      } else {
        alert("Please enter a valid URL.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleCancelClick = () => {
    // Clear the form when "Cancel" is clicked
    setCardName("");
    setSelectedBucketId("");
    setMediaUrl("");
  };

  return (
    <div className="flex justify-center items-center h-full min-w-[380px] shadow-3xl">
      <div className="border-2  outline-none rounded-lg p-6 w-full text-center">
        <h3>Card Name</h3>
        <input
          type="text"
          placeholder="Enter Card Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full p-3 mb-6 border outline-none rounded-md shadow-3xl text-center"
        />

        <h3 className="mb-4 text-lg font-semibold">Select Bucket</h3>
        <select
          value={selectedBucketId}
          onChange={(e) => setSelectedBucketId(e.target.value)}
          className="w-full p-3 mb-6 border outline-none rounded-md shadow-3xl text-center"
        >
          <option value="" disabled>
            Select Bucket
          </option>
          {buckets.map((bucket) => (
            <option key={bucket.id} value={bucket.id}>
              {bucket.name}
            </option>
          ))}
        </select>

        <h3 className="mb-4 text-lg font-semibold">MP3/MP4 URL</h3>
        <input
          type="text"
          placeholder="Enter URL"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          className="w-full p-3 mb-6 border outline-none rounded-md shadow-3xl text-center"
        />

        <div className="flex justify-around">
          <button
            onClick={handleCancelClick}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-900"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
