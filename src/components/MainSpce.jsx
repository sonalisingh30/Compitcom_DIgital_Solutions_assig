import { useEffect, useState } from "react";
import AddCard from "./AddCard";
import PlayCard from "./PlayCard";
import { useDispatch, useSelector } from "react-redux";
import {
  HiArchiveBox,
  HiOutlineBars3BottomRight,
  HiOutlinePencilSquare,
  HiPlus,
} from "react-icons/hi2";
import {
  getCardsByBucketId,
  deleteMultipleCards,
  moveCardsToBucket,
  updateCard, // Import the updateCard action
} from "../slices/combinedSlice";

function MainSpce() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [currentPlayCard, setCurrentPlayCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [newLink, setNewLink] = useState(""); // State for new link
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedBucketId, setSelectedBucketId] = useState(null);
  const [dropSelector, setDropSelector] = useState("");

  const { buckets, selectedBucketCard } = useSelector(
    (state) => state.combined
  );

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEditButtonClick = (card) => {
    setCurrentCard(card);
    setNewLink(card.link || ""); // Initialize with existing link
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCard(null);
    setNewLink(""); // Reset new link
  };

  const saveCardChanges = () => {
    if (currentCard) {
      dispatch(updateCard({ ...currentCard, link: newLink })); // Dispatch action to update card
      closeEditModal();
      dispatch(getCardsByBucketId(selectedBucketId)); // Refresh the cards
    }
  };

  const handlePlayButtonClick = (card) => {
    setCurrentPlayCard(card);
    setIsPlayModalOpen(true);
  };

  const closePlayModal = () => {
    setIsPlayModalOpen(false);
    setCurrentPlayCard(null);
  };

  const toggleSelection = () => {
    setIsSelecting(!isSelecting);
    setSelectedCards(new Set());
  };

  const handleCheckboxChange = (cardId) => {
    const updatedSelectedCards = new Set(selectedCards);
    if (updatedSelectedCards.has(cardId)) {
      updatedSelectedCards.delete(cardId);
    } else {
      updatedSelectedCards.add(cardId);
    }
    setSelectedCards(updatedSelectedCards);
  };

  const deleteSelectedCards = () => {
    if (selectedCards.size === 0) {
      alert("Please select at least one card to delete.");
      return;
    }
    dispatch(deleteMultipleCards(Array.from(selectedCards)));
    setSelectedCards(new Set());
    setIsSelecting(false);
    dispatch(getCardsByBucketId(selectedBucketId));
  };

  const moveSelectedCards = () => {
    if (selectedCards.size === 0) {
      alert("Please select at least one card to move.");
      return;
    }

    if (!dropSelector) {
      alert("Please select a bucket to move the cards to.");
      return;
    }

    const cardIds = Array.from(selectedCards);
    dispatch(moveCardsToBucket({ cardIds, newBucketId: dropSelector }));
    setSelectedCards(new Set());
    setDropSelector("");

    dispatch(getCardsByBucketId(selectedBucketId));
  };

  if (buckets.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center gap-x-2 shadow-3xl rounded-[2rem] ">
        <HiArchiveBox size={30} />
        <p className="text-gray-600 font-nunito font-bold">
          Oops! Create a new Bucket and add your cards
        </p>
      </div>
    );
  }

  return (
    <div className="w-full shadow-3xl h-full rounded-[2rem] overflow-hidden">
      <div className="w-full h-[5rem] shadow-3xl bg-blue-900 flex justify-between items-center px-[2rem] text-white font-bold">
        <h1 className="text-2xl">Cards</h1>
        <div className="flex gap-x-[2rem]">
          <HiOutlineBars3BottomRight
            size={45}
            className="cursor-pointer"
            onClick={toggleSelection}
          />
          <button onClick={handleAddButtonClick}>
            <HiPlus className="cursor-pointer" size={45} />
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg">
            <AddCard />
            <button
              onClick={closeAddModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Card</h2>
            <input
              type="text"
              value={currentCard.name}
              onChange={(e) =>
                setCurrentCard({ ...currentCard, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Add a new link"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={closeEditModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Close
            </button>
            <button
              onClick={saveCardChanges}
              className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Play Modal */}
      {isPlayModalOpen && currentPlayCard && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg">
            <PlayCard card={currentPlayCard} />
            <button
              onClick={closePlayModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Render Actions for selected cards */}
      {isSelecting && selectedBucketCard.length > 0 && (
        <div className="flex justify-between p-4">
          <button
            onClick={deleteSelectedCards}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete Selected
          </button>

          {/* Dropdown for selecting a bucket */}
          <select
            value={dropSelector || ""}
            onChange={(e) => setDropSelector(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="" disabled>
              Select a Bucket
            </option>
            {buckets.map((bucket) => (
              <option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </option>
            ))}
          </select>

          <button
            onClick={moveSelectedCards}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Move Selected
          </button>
        </div>
      )}

      {/* Rendering list of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {selectedBucketCard.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="font-bold">{card.name}</h3>
            <p>{card.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainSpce;
