import React, { useContext, useState } from "react";
import {
  LogOut,
  PlusCircle,
  Search,

} from "lucide-react";
import { MdLogout, MdNotifications } from "react-icons/md";

import { useQuery, useQueryClient } from "react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import AppDialog from "./AppDialog";
import { Button } from "./button";
import { userContext } from "../../contexts/UserContext";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import { useNavigate } from "react-router-dom";
import useScreenType from "../../hooks/useScreenType";
import { HOME } from "../../utils/Routes";
import CreateRoom from "../hotline-room/hotline-feed/CreateRoom";
import ProfileSheet from "../common/ProfileSheet";
import { api } from "../../api";
import NotificationsSheet from "../common/NotificationsSheet";




const NavBar = () => {
  const { user:auth_user, userLoading } = useContext(userContext);
  const queryClient = useQueryClient();

  const { conn } = useContext(WebSocketContext);
  const router = useNavigate();
  const myDevice = useScreenType();

  const [profileOpen, setProfileSheetOpen] = useState(false);
  const { data: notifications, isLoading: notificationsLoading } = useQuery(
    ["notifications", auth_user?.userId],
    async () => {
      const { data } = await api.get(`/api/profile/notification/${auth_user.userId}`);
      return data;
    },
    { enabled: !!auth_user }
  );
  const hasNewNotifications = notifications?.some(
    (notification) => notification.isRead === false
  );
  return (
    <div className="w-full shadow-app_shadow flex items-center py-2 bg-app_bg_nav sticky top-0 z-10 font-display">
      <div
        style={{
          width: myDevice != "isDesktop" ? "90%" : "75%",
        }}
        className=" bg-app_bg_nav flex itesm-center mx-auto justify-between "
      >
        {/* {userLoading ? (
        <Skeleton className="h-6 w-1/4 rounded-sm bg-app_bg_deep" />
      ) : ( */}
        <h1
          onClick={() => {
            navigate(HOME);
          }}
          className="font-logo text-[1rem] leading-[2.3rem] flex items-center relative cursor-pointer"
        >
          <img src="/logo.svg" width={25} className="mr-2" />
          <span className="relative">
            iConnect
            <span className="absolute text-[8px] px-1 text-green-400">
              Beta
            </span>
          </span>
        </h1>
        {/* )} */}
        <div className="space-x-6 flex items-center ">
          <Search  />
          {myDevice != "isMobile" ? (
            <>
              <AppDialog content={<CreateRoom conn={conn} />}>
                <Button
                  size={"sm"}
                  className="bg-app_bg_deep shadow-app_shadow rounded-sm"
                >
                  <PlusCircle className="mr-1 h-4 2-4" /> Start Room
                </Button>
              </AppDialog>

              <AppDialog content={<LogOut />}>
                <button>
                  <MdLogout
                    size={23}
                    className="text-[#424549] hover:text-white"
                  />
                </button>
              </AppDialog>
            </>
          ) : null}
          <Sheet>
            <SheetTrigger asChild>
              <button
                onClick={async () => {
                  await api.patch(
                    `/api/profile/notification/markAsRead/${auth_user?.userId}`
                  );
                  queryClient.invalidateQueries([
                    "notifications",
                    auth_user?.userId,
                  ]);
                }}
                className="relative"
              >
                {hasNewNotifications && (
                  <div className="w-2 h-2 rounded-full bg-yellow-100 absolute right-0.5 top-0"></div>
                )}
                <MdNotifications
                  size={23}
                  className="text-[#424549] hover:text-white"
                />
              </button>
            </SheetTrigger>
            <SheetContent
              position={myDevice !== "isMobile" ? "right" : "bottom"}
              size={myDevice !== "isMobile" ? "sm" : "content"}
            >
              <SheetHeader>
                <SheetTitle>Notifications ✨</SheetTitle>
              </SheetHeader>
              <NotificationsSheet />
            </SheetContent>
          </Sheet>
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild> */}
          <Sheet open={profileOpen} onOpenChange={setProfileSheetOpen}>
            <SheetTrigger asChild>
              <button disabled={!auth_user} className="hover:opacity-60">
                {userLoading ? (
                  <Skeleton className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-6 h-6">
                    <img
                      alt={`${auth_user?.displayName} avatar`}
                      src={auth_user?.avatarUrl}
                      className="rounded-full ring-2 object-cover w-full h-full"
                    />
                  </div>
              
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              
              position={myDevice !== "isMobile" ? "right" : "bottom"}
              size={myDevice !== "isMobile" ? "sm" : "content"}
            >
              <SheetHeader></SheetHeader>
              <ProfileSheet setSheetOpen={setProfileSheetOpen}/>
            </SheetContent>
          </Sheet>
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;