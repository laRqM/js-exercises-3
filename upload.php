<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_FILES["file"])) { // We verify if a file has been selected
            $file = $_FILES["file"]; // Variable $file is equal to the file uploaded.

            if ($file["error"] === UPLOAD_ERR_OK) { // If the upload was successful...
                $uploadDir = "uploads/"; // Upload folder.
                $uploadFile = $uploadDir . basename($file["name"]); // We create the full path where the target file is going to be saved once the file is uploaded.

                if (move_uploaded_file($file["tmp_name"], $uploadFile)) {
                // We use the function move_uploaded_file to move the file from its temporal location (stored in $file["tmp_name"]) to the definitive location specified by $uploadFile.
                // If the function move_uploaded_file is successful, it means the file has been moved and uploaded successfully.
                    echo "File uploaded successfully.";
                } else {
                    echo "An error has occurred uploading the file.";
                }
            } else {
                echo "Error uploading the file: " . $file["error"];
            }
        } else {
            echo "No file has been selected.";
        }
    }
?>
