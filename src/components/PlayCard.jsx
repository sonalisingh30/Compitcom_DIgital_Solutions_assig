/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function PlayCard({ card }) {
  const [mediaUrl, setMediaUrl] = useState(card?.mediaUrl || ""); // Assume card has mediaUrl property
  const [mediaType, setMediaType] = useState(null); // To store the media type
  const [loading, setLoading] = useState(true); // Loading state

  // Check if the URL is from YouTube
  const isYouTubeLink = (url) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  // Get embed URL for YouTube videos
  function getYouTubeEmbedUrl(url) {
    // Regex to capture video ID and any additional parameters
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|watch|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const paramRegex = /([a-zA-Z0-9_-]+)=([^&]*)/g; // Regex to capture query parameters

    const match = url.match(regex);

    if (match) {
      const videoId = match[1]; // Extracted video ID
      const params = [];

      // Extract any additional parameters
      let paramMatch;
      while ((paramMatch = paramRegex.exec(url)) !== null) {
        if (paramMatch[1] !== "v") {
          // Exclude 'v' as it's already captured
          params.push(`${paramMatch[1]}=${paramMatch[2]}`);
        }
      }

      const paramString = params.length ? `?${params.join("&")}` : ""; // Create query string if parameters exist
      return `https://www.youtube.com/embed/${videoId}${paramString}`;
    }

    return null; // Return null if no match
  }

  // Check if the URL is a Google Drive video
  const isGoogleDriveLink = (url) => url.includes("drive.google.com");

  // Get embed URL for Google Drive videos
  const getGoogleDriveEmbedUrl = (url) => {
    const fileId = url.split("/d/")[1].split("/")[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  // Check if the URL is an audio file (e.g., MP3)
  const isAudioLink = (url) => url.endsWith(".mp3");

  // Check if the URL is a video file (e.g., MP4)
  const isVideoLink = (url) => url.endsWith(".mp4");

  // Function to determine the media type
  const determineMediaType = (url) => {
    if (isYouTubeLink(url)) {
      setMediaType("youtube");
      setMediaUrl(getYouTubeEmbedUrl(url));
    } else if (isGoogleDriveLink(url)) {
      setMediaType("googleDrive");
      setMediaUrl(getGoogleDriveEmbedUrl(url));
    } else if (isAudioLink(url)) {
      setMediaType("audio");
      setMediaUrl(url); // Keep the original audio URL
    } else if (isVideoLink(url)) {
      setMediaType("video");
      setMediaUrl(url); // Keep the original video URL
    } else {
      setMediaType("unknown");
    }
    setLoading(false); // Stop loading
  };

  // Use effect to determine media type when component mounts or mediaUrl changes
  useEffect(() => {
    if (mediaUrl) {
      determineMediaType(mediaUrl);
    }
  }, [mediaUrl]);

  const handleBackClick = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative border-2 border-black rounded-lg w-full p-6 text-center flex justify-center flex-col gap-y-5">
        <button
          onClick={handleBackClick}
          className="absolute top-2 left-2 bg-gray-400 text-white py-1 px-2 rounded-md hover:bg-gray-500"
        >
          Back
        </button>
        <h3 className="mb-6 text-lg font-semibold">Play Media</h3>

        {/* Show loading spinner while determining media type */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            <p>Loading media...</p>
          </div>
        ) : mediaType === "youtube" ? (
          // Embed YouTube video
          <iframe
            width="550"
            height="300"
            src={mediaUrl}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : mediaType === "googleDrive" ? (
          // Render Google Drive video
          <iframe
            width="550"
            height="300"
            src={mediaUrl}
            title="Google Drive Video"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : mediaType === "audio" ? (
          // Render audio file
          <audio controls>
            <source src={mediaUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        ) : mediaType === "video" ? (
          // Render direct video file
          <video width="800" height="550" controls src={mediaUrl}>
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback if no valid media is found
          <p>No media available</p>
        )}
      </div>
    </div>
  );
}

export default PlayCard;
