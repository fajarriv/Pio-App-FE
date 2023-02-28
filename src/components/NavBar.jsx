import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setUser } from "../redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserPicture from "./UserPicture";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");

  const user = useSelector((state) => state.user);
  const userName = `${user.userName}`;

  const { palette } = useTheme();
  const isLightMode = palette.mode === "light";
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const defaultBG = palette.background.default;
 
  return (
    <FlexBetween padding="1rem 5%" backgroundColor={defaultBG}>
      <FlexBetween gap="1.75 rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={isLightMode ? palette.primary.main : palette.primary.mainBlue}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: palette.primary.darkBlue,
              cursor: "pointer",
            },
          }}
        >
          Pío App
        </Typography>
      </FlexBetween>

      {/* Main Navbar */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* Switch Button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {isLightMode ? (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <UserPicture image={user.profilePicture}></UserPicture>
          {/*  Dropdown menu */}
          <FormControl variant="standard" value={userName}>
            <Select
              value={userName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem
                onClick={() => navigate(`/profile/${user._id}`)}
                value={userName}
              >
                <Typography>{userName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Navbar */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={isLightMode ? neutralLight : palette.background.alt}
        >
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu */}
          <FlexBetween
            flexDirection="column"
            justifyContent="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {isLightMode ? (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>

            <FormControl variant="standard" value={userName}>
              <Select
                value={userName}
                sx={{
                  backgroundColor: defaultBG,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: defaultBG,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  onClick={() => navigate(`/profile/${user._id}`)}
                  value={userName}
                >
                  <Typography>{userName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};
export default NavBar;
