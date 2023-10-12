/**
 * OpenAI API
 */

export const transcribe = async (
  handleTranscription: (data: any) => void,
  apiKey: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "whisper-1");
  console.log(apiKey)

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        // headers with authorizaiton and content type
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      handleTranscription(data);
    } else {
      throw new Error(`Failed to transcribe audio: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
};
