const numBars = 10;

    const VolumeLevel = ({ volume }: { volume: number }) => {
    return (
        // <div className="flex items-center justify-center h-full">
        <div className="volume-level">
            <div className="volume-bars">
                {Array.from({length: numBars}).map((_, index) => (
                    <div
                    key={index}
                    className={`volume-bar ${index / numBars < volume ? "active" : ""}`}
                    // className="w-1 h-20 bg-gray-300 rounded-full"
                    // style={{
                    //     height: `${(volume || 0) * 100}%`,
                    //     backgroundColor: `rgba(0, 0, 0, ${volume || 0})`,
                    // }}
                    />  
                ))}
            </div>
        </div>
    )
}

export default VolumeLevel;