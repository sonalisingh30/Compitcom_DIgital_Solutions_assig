/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import {
  addBucket,
  editBucket,
  deleteBucket,
  selectBucket,
  getCardsByBucketId,
} from "../slices/combinedSlice";
import Modal from "../utils/Modal";

function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bucketName, setBucketName] = useState("");
  const [editBucketId, setEditBucketId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bucketToDelete, setBucketToDelete] = useState(null);

  const dispatch = useDispatch();
  const { buckets, selectedBucketId } = useSelector((state) => state.combined);

  // Open the modal to add a new bucket
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setBucketName("");
  };

  // Handle bucket addition
  const handleAddBucket = () => {
    if (bucketName.trim()) {
      const bucketExists = buckets.some(
        (bucket) => bucket.name.toLowerCase() === bucketName.toLowerCase()
      );

      if (bucketExists) {
        alert(
          "This bucket name already exists. Please choose a different name."
        );
      } else {
        dispatch(addBucket(bucketName)); // Dispatching the action with the name only
        handleModalClose();
      }
    } else {
      alert("Please enter a valid bucket name.");
    }
  };

  // Open the edit modal
  const handleEditModalOpen = (bucket) => {
    setBucketName(bucket.name);
    setEditBucketId(bucket.id);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setBucketName("");
    setEditBucketId(null);
  };

  // Handle bucket edit
  const handleEditBucket = () => {
    if (bucketName.trim()) {
      dispatch(editBucket({ id: editBucketId, name: bucketName }));
      handleEditModalClose();
    } else {
      alert("Please enter a valid bucket name.");
    }
  };

  // Open the delete confirmation modal
  const handleDeleteModalOpen = (bucket) => {
    setBucketToDelete(bucket);
    setIsDeleteModalOpen(true);
  };

  // Close the delete confirmation modal
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setBucketToDelete(null);
  };

  // Handle bucket deletion
  const handleDeleteBucket = () => {
    if (bucketToDelete) {
      dispatch(deleteBucket(bucketToDelete.id));
      handleDeleteModalClose();
    }
  };

  useEffect(() => {
    if (selectedBucketId) dispatch(getCardsByBucketId(selectedBucketId));
  }, [selectedBucketId]);

  return (
    <aside className="sidebar border-1 h-full min-w-[320px] overflow-x-hidden rounded-[24px] bg-white pt-8 text-primary-strong_gray shadow-3xl px-5">
      <div className="flex items-center justify-between">
        <h1 className="font-nunito font-bold text-xl text-blue-900">
          Manage Buckets
        </h1>
        <div
          className="w-[24px] h-[24px] bg-blue-800 hover:bg-blue-900 flex items-center justify-center rounded-full cursor-pointer"
          onClick={handleModalOpen}
        >
          <HiPlus className="text-white" />
        </div>
      </div>

      {/* Render the list of buckets */}
      <ul className="mt-6">
        {buckets?.map((bucket) => (
          <li
            key={bucket.id}
            className={`h-[57px] w-full flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md cursor-pointer px-2 ${
              selectedBucketId === bucket.id && "!bg-blue-800 "
            }`}
          >
            <div
              className="w-full"
              onClick={() => dispatch(selectBucket(bucket.id))}
            >
              <span
                className={`font-nunito ${
                  selectedBucketId === bucket.id ? "text-white font-bold" : ""
                }`}
              >
                {bucket.name}
              </span>
            </div>

            <div className="flex gap-x-4 items-center">
              <HiOutlinePencil
                className="cursor-pointer"
                onClick={() => handleEditModalOpen(bucket)}
              />
              <HiOutlineTrash
                className="cursor-pointer"
                onClick={() => handleDeleteModalOpen(bucket)}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for adding a new bucket */}
      <Modal
        isOpen={isModalOpen}
        title="Add New Bucket"
        onClose={handleModalClose}
        actions={
          <>
            <button
              onClick={handleModalClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddBucket}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Bucket
            </button>
          </>
        }
      >
        <input
          type="text"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          placeholder="Enter bucket name"
          className="w-full p-2 border rounded-md mb-4"
        />
      </Modal>

      {/* Modal for editing a bucket */}
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Bucket"
        onClose={handleEditModalClose}
        actions={
          <>
            <button
              onClick={handleEditModalClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleEditBucket}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </>
        }
      >
        <input
          type="text"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          placeholder="Enter new bucket name"
          className="w-full p-2 border rounded-md mb-4"
        />
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        onClose={handleDeleteModalClose}
        actions={
          <>
            <button
              onClick={handleDeleteModalClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBucket}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete the bucket "{bucketToDelete?.name}"?
        </p>
      </Modal>
    </aside>
  );
}

export default SideBar;
