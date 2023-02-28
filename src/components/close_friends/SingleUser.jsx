import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../redux";
import FlexBetween from "components/FlexBetween";
import UserPicture from "components/UserPicture";

const SingleUser = ({ userId, userName, userPicture }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, closeFriends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();

  // check current closefriends list
  const isCloseFriend = closeFriends.find((cf) => cf._id === userId);
  const addRemoveCF = async () => {
    const response = await fetch(`user/${_id}/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ closeFriends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserPicture image={userPicture} size="45px" />
        <Box
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          <Typography
            // color={palette.neutral.light}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.lightBlue,
                cursor: "pointer",
              },
            }}
          >
            @{userName}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => addRemoveCF()}
        sx={{ backgroundColor: palette.primary.lightBlue, p: "0.6rem",  }}
      >
        {isCloseFriend ? (
          <PersonRemoveOutlined sx={{ color: palette.primary.mainRed,}} />
        ) : (
          <PersonAddOutlined color="success" />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default SingleUser;
