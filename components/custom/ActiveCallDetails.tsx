import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
import VolumeLevel from "./VolumeLevel";
import { Button } from "@/components/ui/button";
const ActiveCallDetails = ({isSpeaking, volume, endCallCallback}: {isSpeaking: boolean, volume: number, endCallCallback: () => void}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <AssistantSpeechIndicator isSpeaking={isSpeaking} />
            <VolumeLevel volume={volume} />
            <Button onClick={endCallCallback}>End Call</Button>
        </div>
    )
}

export default ActiveCallDetails;