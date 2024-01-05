import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./components/ui/button";
import process from "process";
import { cn } from "./lib/utils";
import { FanIcon } from "lucide-react";

const connectionStatusVariant = {
  [ReadyState.CONNECTING]: "bg-yellow-300 text-yellow-700",
  [ReadyState.OPEN]: "bg-green-300 text-green-700",
  [ReadyState.CLOSING]: "bg-orange-300 text-orange-700",
  [ReadyState.CLOSED]: "bg-red-300 text-red-700",
  [ReadyState.UNINSTANTIATED]: "bg-gray-300 text-gray-700",
};
const fanVelocityDuration = {
  '0': 'duration-0 animate-none text-red-500',
  '1': 'duration-700 text-green-300',
  '2': 'duration-500 text-green-500',
  '3': 'duration-300 text-green-700',
};

type Velocity = 0 | 1 | 2 | 3;


const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const isDev = (): boolean => {
  return development;
}

type IMessageEvent = {
  [key: string]: boolean | number | Velocity | string;
}

const App = () => {

  const [velocity, setVelocity] = useState<Velocity>(0);

  const pathname = useMemo(() => window.location.origin.split("//")[1].split(":")[0], [window.location.origin])

  const { lastJsonMessage, readyState, sendJsonMessage } = useWebSocket<IMessageEvent>(`ws://${isDev() ? '192.168.1.2' : pathname}/ws`, {
    onOpen: () => console.log('opened'),
    shouldReconnect: () => true,
    reconnectInterval: 1000,
  })
  console.log(lastJsonMessage, readyState)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === "velocity") {
        setVelocity(lastJsonMessage['velocity'] as Velocity);
      }
    }
  }, [lastJsonMessage]);

  const setVelocityUpdate = useCallback(({ velocity }: { velocity: number }) => {
    sendJsonMessage(
      {
        type: "velocity",
        velocity,
      }
    );
  }, []);

  const toggleVelocity = useCallback((v: number) => setVelocityUpdate({ velocity: v }), [velocity, setVelocityUpdate]);

  return (
    <div className="h-screen w-screen bg-slate-900 pt-16">
      <div className="md:w-1/3 sm:w-1/2 min-w-min flex flex-col justify-center  gap-10 mx-10 md:mx-auto sm:mx-24 text-slate-100">
        <div className="w-full text-sm">Connection Status: <span className={cn('px-4 py-2 font-bold rounded-md mx-2', connectionStatusVariant[readyState])}>{connectionStatus}</span></div>

        <div className="w-full justify-center flex text-2xl">
          Velocity
        </div>
        <div className="flex gap-5 w-full justify-center">
          {
            [0, 1, 2, 3].map((id) => (
              <Button
                key={id}
                disabled={connectionStatus !== "Open"}
                variant={velocity === 0 && id === 0 ? "destructive" : id === velocity ? "success" : "neutral"}
                onClick={() => toggleVelocity(id)}
              >
                {id}
              </Button>
            ))
          }

        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <FanIcon className={cn("w-28 h-28 animate-spin", fanVelocityDuration[`${velocity}`])} />
        </div>
      </div>
    </div>

  );
}

export default App;
