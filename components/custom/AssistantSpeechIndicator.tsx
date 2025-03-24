import VolumeLevel from "./VolumeLevel";

const AssistantSpeechIndicator = ({isSpeaking}: {isSpeaking: boolean}) => {
    return (
        // <div className="flex items-center justify-center h-full">
        <div className="assistant-speech-editor">
            {/* {isSpeaking ? (
                <VolumeLevel volume={Array.from({length: 10}, () => Math.random())} />
            ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            )} */}
            <div
                className={`speech-indicator ${
                isSpeaking ? "speaking" : "not-speaking"
                }`}
            ></div>
            {/* <p className="text-sm text-gray-500"> 
            */}
            <p className="speech-status">
                {isSpeaking ? "Assistant is speaking..." : "Assistant is listening..."}
            </p>
        </div>
    )
}

export default AssistantSpeechIndicator;