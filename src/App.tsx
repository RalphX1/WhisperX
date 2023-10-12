import React from "react";
import "./App.css";
import Dropzone from "./components/DropZone";
import Button from "@mui/material/Button";
import { Box, Grid, LinearProgress, Paper, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import TokensInputField from "./components/TokensInputField";
import ResponsiveAppBar from "./components/AppBar";
import { transcribe } from "./api";
import BottomBar from "./components/BottomBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
  },
});


function App() {
  const [file, setFile] = React.useState<File | null>(null);
  // get token id from cache
  const [tokenid, setTokenId] = React.useState<string | null>(
    localStorage.getItem("tokenid")
  );
  const [transcriptionProgress, setTranscriptionProgress] = React.useState<'FREE'|'IN_PROGRESS'>('FREE');
  const [transcribedText, setTranscribedText] = React.useState<string>("");
  const [inputTokenId, setInputTokenId] = React.useState<string>("");
  // if token id is not in cache, then ask for it
  const onClickSubmitTokenId = () => {
    if (inputTokenId) {
      // save tokenid to browser cache
      localStorage.setItem("tokenid", inputTokenId);
      setTokenId(inputTokenId);
      console.log(inputTokenId);
    }
  };
  // function for selecting files
  const onClickSelectFiles = () => {
    // this will trigger the file select dialog and save the selected files to the state
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("multiple", "false");
    fileInput.setAttribute("accept", "audio/*");
    fileInput.click();
    fileInput.onchange = () => {
      if (fileInput.files?.length) {
        const file = Array.from(fileInput.files);
        setFile(file[0]);
      }
    };
  };
  const handleResponse = (response: any) => {
    setTranscribedText(response.text);
    setTranscriptionProgress('FREE'); 
  };
  const onClickSubmitAudio = () => {
    // submit audio to server
    if (tokenid && file) {
      setTranscriptionProgress('IN_PROGRESS');
      transcribe(handleResponse, tokenid, file)
    } else {
      alert("Please input token id and select audio file");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Grid container spacing={2} padding={2} style={{ paddingBottom: '50px' }}>
      {/* <Grid container spacing={2} padding={2}> */}
        <Grid item sm={3}>
          {(tokenid === null || tokenid === "null") && (
            <TokensInputField
              onClickSubmitTokenId={onClickSubmitTokenId}
              setInputTokenId={setInputTokenId}
            />
          )}
          <Dropzone
            handleDrop={(file: any) => setFile(file)}
            existingFiles={file ? [file] : []}
            onClickSelectFiles={onClickSelectFiles}
          />
          <Button
            variant="outlined"
            fullWidth={true}
            sx={{
              padding: "10px",
              marginTop: "10px",
            }}
            onClick={onClickSubmitAudio}
          >
            Transcribe
          </Button>
        </Grid>
        <Grid item xs={9}>
          <iframe
            src="https://www.youtube.com/embed/IWKXt0driU4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {file && (
            <Box>
              <audio controls>
                <source src={URL.createObjectURL(file)} type="audio/mpeg" />
              </audio>
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          {/* A large paper placeholder */}
          <Paper
            sx={{
              minHeight: "60vh",
            }}
          >
            {transcriptionProgress === "FREE" && transcribedText && (
              <Typography variant="h6">{transcribedText}</Typography>
            )}
            {transcriptionProgress === "IN_PROGRESS" && <LinearProgress />}
          </Paper>
        </Grid>
        <Grid item xs={12} padding={5}>
          <BottomBar />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
