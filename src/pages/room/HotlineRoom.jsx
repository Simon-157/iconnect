import { useContext, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { userContext } from "../../contexts/UserContext";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import { useRoomProfileModalStore } from "../../store/useRoomProfileModal";
import Navbar from "../../components/ui/NavBar";
import PeopleList from "../../components/common/PeopleList";
import VoiceRoomsLayout from "../../components/ui/VoiceRoomsLayout/";
import RoomArea from "../../components/hotline-room/RoomArea";
import { Button } from "../../components/ui/button";
import { VscDebugDisconnect } from "react-icons/vsc";
import { BanIcon } from "lucide-react";
import useSplitUsersIntoSections from "../../hooks/useSplitUsersIntoSections";
import useLoadRoomMeta from "../../hooks/useLoadRoomMeta";
import Loader from "../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const HotlineRoom = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const hasJoined = useRef(false);
  const {id:roomId} = useParams();

//   const { id: roomId } = router.query;
  const { conn } = useContext(WebSocketContext);
  const { user, userLoading } = useContext(userContext);
  const chatInputRef = useRef(null);

  const { setOptions, showOptions, setModalUser, modalProfile } =
    useRoomProfileModalStore();

  const {
    chatLoading,
    roomLoading,
    roomStatusLoading,
    chatMessages,
    room,
    roomStatus,
  } = useLoadRoomMeta(roomId, user, hasJoined.current);

  const handleCopy = async (link) => {
    await navigator.clipboard.writeText(link);
    toast("Copied URL!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const { askedToSpeak, listeners, speakers } = useSplitUsersIntoSections(
    room
  );


  useEffect(() => {
    queryClient.invalidateQueries(["user"]);
  }, [roomId]);

  useEffect(() => {
    chatInputRef.current?.focus();

    if (
      !roomId ||
      !conn ||
      userLoading ||
      roomLoading ||
      typeof room === "string" ||
      hasJoined.current
    ) {
      return;
    }

    conn.emit("rtc:join_room", {
      roomId,
      roomMeta: {
        isAutospeaker: room?.autoSpeaker,
        isCreator: room?.creatorId === user.userId,
      },
    });

    hasJoined.current = true;
  }, [roomId, userLoading, conn, roomLoading]);

  if (typeof room === "string") {
    console.log(room);
    if (room === "404") {
      return (
        <div className="bg-app_bg_deepest text-white w-screen h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <VscDebugDisconnect color="white" size={50} />
            <div className="text-white">Room ended or doesn't exist</div>
            <Button
              onClick={() => navigate("/rooms")}
              className="w-full bg-app_bg_deeper p-3 h-12 font-bold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      );
    }
    if (room === "403") {
      return (
        <div className="bg-app_bg_deepest text-white w-screen h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <BanIcon color="white" size={50} />
            <div className="text-white">
              Host/Mods banned you from this room
            </div>
            <Button
              onClick={() => navigate("/rooms")}
              className="w-full bg-app-green p-3 h-12 font-bold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      );
    }
  }
  return room && roomStatus && !roomLoading ? (
    <>
      
      {(!room || !roomStatus || roomLoading) && (
        <div className="bg-transparent absolute font-display w-screen h-screen flex flex-row justify-center items-center z-10 backdrop-blur-sm">
          <div>
            <Loader alt={true} textColor="white" bgColor="white" />
          </div>
        </div>
      )}
      <VoiceRoomsLayout
        navbar={<Navbar />}
        // column1={<PeopleList />}
        column1={<RoomArea />}
        // footer={<RoomFooter />}
      />
    </>
  ) : (
    
    <>
 
      <main className="bg-app-background-2 absolute font-display w-screen h-screen flex flex-row justify-center items-center">
        <div>
          <Loader alt={true} textColor="blue" bgColor="blue" width={25} />
        </div>
      </main>
    </>
  );
};

export default HotlineRoom;