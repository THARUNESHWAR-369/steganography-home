$(document).ready(function () {
  let modeChoose = null;
  let optionChoose = null;

  // Function to update Encode/Decode options
  function updateEncodeDecodeOptions(text1, text2, href1, href2) {
    $("#encodeDecodeOptions span:nth-child(1)").text(text1);
    $("#encodeDecodeOptions span:nth-child(2)").text(text2);
    $("#encodeDecodeOptions span:nth-child(1)").attr("href", href1);
    $("#encodeDecodeOptions span:nth-child(2)").attr("href", href2);
    $("#encodeDecodeOptions").show();
  }

  // Function to handle Encode mode
  function handleEncodeMode() {
    $(".upload-options").show();
    $("#encodeDecodeOptions span:nth-child(1").removeClass("selected");
    $("#encodeDecodeOptions span:nth-child(2").removeClass("selected");
    $("#encodeDecodeOptions span:nth-child(1").addClass("selected");
    $("#uploadForm").attr("action", "/image/encode-result");
    $("#optionText2").html(`Selected: <b>Encode ${modeChoose}</b>`);
    optionChoose = "encode";

    $(".data-container").css("display", "flex");
    $(".upload-btn").show();
    $(".decode-btn").css("display", "none");

    $("#secret-msg").attr("readonly", false);
    $("#secret-msg").attr("placeholder", `Your Secret`);
    $("#secret-msg").val("");

    $("#label-msg").text("Enter you Secret Message:");
    $(".download-link").hide();
  }

  // Function to handle Decode mode
  function handleDecodeMode() {
    $(".upload-options").show();
    $("#uploadForm").attr("action", "/image/decode-result");
    $("#optionText2").html(`Selected: <b>Decode ${modeChoose}</b>`);
    $("#encodeDecodeOptions span:nth-child(1").removeClass("selected");
    $("#encodeDecodeOptions span:nth-child(2").removeClass("selected");

    $("#encodeDecodeOptions span:nth-child(2").addClass("selected");

    optionChoose = "decode";

    $(".data-container").css("display", "flex");
    $(".upload-btn").hide();
    $(".decode-btn").css("display", "flex");

    $("#secret-msg").attr("readonly", true);
    $("#secret-msg").val("");
    $("#secret-msg").attr(
      "placeholder",
      `Upload Encoded ${modeChoose} to Decode`
    );
    $("#label-msg").text("Decoded Secret Message:");
    $(".download-link").hide();
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("dragDropInput");
    let files = fileInput.files;
    let data = document.getElementById("secret-msg").value;

    console.log(files[0].name.split('.'));

    if (files.length > 0 && data.length > 0) {
      formData.append("image", files[0]);
      formData.append("data", data);

      $.ajax({
        url: $(this).attr("action"),
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          // Handle success response
          console.log("Success:", response);
          $(".download-link").css("display", "flex");


          // Get the encoded image data
          let encodedImageData = response.img;
          let filenameList = files[0].name.split('.');
          let extension = filenameList[filenameList.length - 1];

          let filename = response.filename + '.' + extension;

          console.log(filename);

          $(".download-link").html(
            "<a href=data:image/gif;base64," +
              encodedImageData +
              ' id="download-img-a-tag" target="_blank" download=' +
              filename +
              ">Download</a>"
          );
        },
        error: function (xhr, status, error) {
          // Handle error response
          console.error("Error:", error);
        },
      });
    } else {
      if (files.length === 0 && data.length === 0) {
        alert("Please select an image file and enter the secret message.");
      } else {
        if (files.length === 0) {
          alert("Please select an image file.");
        } else if (data.length === 0) {
          alert("Please enter your secret message.");
        }
      }
    }
  }

  // Function to handle Decode button click
  function handleDecodeClick() {
    // Get the image file
    let fileInput = document.getElementById("dragDropInput");
    let files = fileInput.files;

    if (files.length === 0) {
      alert("Please select an image file.");
      return;
    }

    let formData = new FormData();
    formData.append("image", files[0]);

    $.ajax({
      url: "/image/decode-result",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        // Handle success response
        console.log("Success:", response);
        $("#secret-msg").val(response.data);

        // You can update the UI or show the decoded data here
      },
      error: function (xhr, status, error) {
        // Handle error response
        console.error("Error:", error);
      },
    });
  }

  // Click event for "Image" span
  $("#imageOption span:nth-child(1)")
    .click(function () {
      updateEncodeDecodeOptions("Encode", "Decode", "/encode", "/decode");
      $(".options span").removeClass("selected");
      $(this).addClass("selected");
      modeChoose = "image";
      $("#optionText").html(`Stegnograph <b>Image</b>`);
      $("#dragDropP").html(
        `Drag and drop your ${modeChoose} here or select it from your computer.`
      );
    })
    .trigger("click");

  //   // Click event for "Video" span
  //   $("#imageOption span:nth-child(2)").click(function () {
  //     updateEncodeDecodeOptions("Encode", "Decode", "/encode", "/decode");
  //     $(".options span").removeClass("selected");
  //     $(this).addClass("selected");
  //     modeChoose = "video";
  //     $("#optionText").html("Stegnograph <b>Video</b>");
  //     $("#dragDropP").html(
  //       `Drag and drop your ${modeChoose} here or select it from your computer.`
  //     );
  //   });

  // Click event for "Encode" span
  $("#encodeDecodeOptions span:nth-child(1)").click(handleEncodeMode);

  // Click event for "Decode" span
  $("#encodeDecodeOptions span:nth-child(2)").click(handleDecodeMode);

  // Click event for "Decode" button
  $(".decode-btn").click(handleDecodeClick);

  // Prevent default form submission and handle it using AJAX
  $("#uploadForm").submit(handleSubmit);

  // Get the drop area and file input
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("dragDropInput"); // Adjusted ID for file input

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight drop area when dragging file over
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  // Remove highlight when dragging file out
  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  // Handle dropped files
  dropArea.addEventListener("drop", handleDrop, false);

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function highlight() {
    dropArea.classList.add("highlight");
  }

  function unhighlight() {
    dropArea.classList.remove("highlight");
  }

  function handleDrop(event) {
    const dt = event.dataTransfer;
    const files = dt.files;

    handleFiles(files);
  }

  function handleFiles(files) {
    console.log("Files:", files);
    if (files.length === 1 && files[0].type.startsWith("image/")) {
      fileInput.files = files;
      // Update the label to show the name of the selected file
      dropArea.querySelector("p").textContent = files[0].name;
    } else {
      alert("Please select a single image file.");
    }
  }

  // Optional: If you want to allow clicking on the drop area to trigger file input
  dropArea.addEventListener("click", () => {
    fileInput.click();
  });

  // Update the label when a file is selected using the file input
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length === 1) {
      dropArea.querySelector("p").textContent = fileInput.files[0].name;
    }
  });
});
