import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setAvail } from "../../redux";
import SingleUser from "./SingleUser";
import Wrapper from "components/Wrapper";

const UserList = () => {
  const dispatch = useDispatch();

  const { _id, closeFriends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const availUser = useSelector((state) => state.availUser);

  const { palette } = useTheme();

  const getCF = async () => {
    const response = await fetch(`user/${_id}/closeFriends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const dataCF = await response.json();
    getOtherUser()
    dispatch(setFriends({ closeFriends: dataCF }));
  };
  const getOtherUser = async () => {
    const response = await fetch(`/user/all/${_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();
    dispatch(setAvail({ availUser: newData }));
  };

  useEffect(() => {
    getOtherUser();
    getCF();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Wrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Close Friends List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {closeFriends?.map((friend) => (
            <SingleUser
              key={friend._id}
              userId={friend._id}
              userName={friend.userName}
              userPicture={friend.profilePicture}
            />
          ))}
        </Box>
      </Wrapper>
      <Box m="2rem 0"></Box>
      <Wrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          All User
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {availUser?.map(({ _id, userName, profilePicture }) => (
            <SingleUser
              key={_id}
              userId={_id}
              userName={userName}
              userPicture={profilePicture}
            />
          ))}
        </Box>
      </Wrapper>
    </>
  );
};

export default UserList;
