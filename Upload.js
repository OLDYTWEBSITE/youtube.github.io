function uploadVideo() {
  // Get the video file from the input element
  const videoFile = document.getElementById("video-upload").files[0];

  // Create a new FormData object and append the video file
  const formData = new FormData();
  formData.append("video", videoFile);

  // Send the FormData object to the server using a POST request
  fetch("/upload-video", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status === 200) {
      // The video was uploaded successfully
      // Redirect the user to the home page
      window.location.href = "/";
    } else {
      // The video was not uploaded successfully
      // Show an error message to the user
      alert("Error uploading video");
    }
  });
}
