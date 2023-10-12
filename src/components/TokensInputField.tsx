import { Box, Button, Divider, TextField } from "@mui/material";
import React from "react";


/**
 * @name TokensInputField
 * @description A component that allows the user to input their OpenAI token ID.
 * @returns {JSX.Element}
 */
type TokensInputFieldProps = {
    onClickSubmitTokenId: () => void;
    setInputTokenId: (inputTokenId: string) => void;
}
const TokensInputField = (props: TokensInputFieldProps) => {
    return (
        <Box paddingY={2}>
            <TextField
              label={"OpenAI Token ID"}
              fullWidth={true}
              variant="outlined"
              onChange={(e) => props.setInputTokenId(e.target.value)}
              
            />
            <Button
            variant="contained"
            fullWidth={true}
            
            onClick={props.onClickSubmitTokenId}
          >
            Submit Token ID
          </Button>
        </Box>
    )
}

export default TokensInputField;