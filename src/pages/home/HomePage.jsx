import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CreatePost from "pages/home/CreatePost";
import NavBar from "components/NavBar";
import FeedPost from "./FeedPost";
import UserList from "components/close_friends/UserList";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, userName } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const isLightMode = palette.mode === "light";

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding={isNonMobileScreens ? "0.75rem 20%" : "0.75rem 7%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "90%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color={
              isLightMode ? palette.neutral.dark : palette.primary.lightBlue
            }
          >
            Welcome,
            <br></br>@{userName}
          </Typography>
          <Box m="2rem 0" />
          <CreatePost></CreatePost>
        </Box>
      </Box>
      {/* //////// */}
      <Box
        width="100%"
        padding={isNonMobileScreens ? "0.5rem 20%" : "0.75rem 7%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="flex-end"
      >
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <FeedPost currentUserId={_id}></FeedPost>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="40%">
            <Box m="2rem 0" />
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color={
                isLightMode ? palette.neutral.dark : palette.primary.lightBlue
              }
            ></Typography>
            <UserList></UserList>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
