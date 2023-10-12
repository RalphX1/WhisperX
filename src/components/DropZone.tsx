import { Button } from '@mui/material';
import React, { useState } from 'react';

/**
 * Dropzone component provides a drag and drop area for files to be uploaded.
 * @param props
 */
// Type for props
type DropzoneProps = {
  handleDrop: (file: any) => void;
  existingFiles: any;
  onClickSelectFiles: () => void;
};

const Dropzone = (props: DropzoneProps) => {
  const [highlight, setHighlight] = useState(false);
  // handleDrop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const existingFiles: any = [];
      Array.from(files).forEach((file: any) => {
        const fileAlreadyExists = props.existingFiles.some((f: any) => f.name === file.name && f.size === file.size);
        if (!fileAlreadyExists) {
          props.handleDrop(file);
        } else {
          existingFiles.push(file.name);
        }
      });
      if (existingFiles.length > 0) {
        alert(`These files already exist:\n${existingFiles.join('\n')}`);
      }
    }
  };
  // handleDragOver
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(true);
  };
  // handleDragLeave
  const handleDragLeave = () => {
    setHighlight(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{ cursor: "pointer", border: !highlight ? "" : "dashed grey 4px" }}
    >
      <Button
        variant="contained"
        fullWidth={true}
        sx={{
          padding: "10px",
        }}
        onClick={props.onClickSelectFiles}
      >
        Click Or Drag to Upload Files
      </Button>
    </div>
  );
};

export default Dropzone;