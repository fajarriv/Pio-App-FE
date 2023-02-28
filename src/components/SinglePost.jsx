import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Card,
  CardHeader,
  Icon,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteForever,
  EditOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setAllPost } from "../redux";
import Wrapper from "./Wrapper";
import UserPicture from "./UserPicture";

const SinglePost = ({ postId, authorId, description, date, likes, isPrivate}) => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  // modal for update post
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const token = useSelector((state) => state.token);
  const currentUserId = useSelector((state) => state.user._id);

  const isLiked = likes.includes(currentUserId);
  const likeCount = likes.length;
  const isCurrentAuthor = Boolean(currentUserId === authorId);

  const { palette } = useTheme();
  const isLightMode = palette.mode === "light";

  const getAuthorData = async () => {
    const response = await fetch(`/user/${authorId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const authorData = await response.json();
    setAuthor(authorData);
  };

  const likePost = async () => {
    const response = await fetch(`/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUser: currentUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(`/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUser: currentUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setAllPost({ allPost: updatedPost }));
  };

  const handleUpdate = async () => {
    const response = await fetch(`/post/${postId}/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser: currentUserId,
        description: newDescription,
      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewDescription("");
  };

  useEffect(() => {
    getAuthorData();
    // eslint-disable-next-line
  }, []);

  if (!author) return null;

  return (
    <Card
      sx={{
        padding: "0.5rem",
        backgroundColor: palette.neutral.light,
        borderRadius: "0.75rem",
        margin: "1rem",
        boxShadow: 3,
        borderColor: isPrivate ? "green" : undefined
      }}
    >
      <CardHeader
        avatar={
          <UserPicture image={author.profilePicture} size="40px"></UserPicture>
        }
        action={
          isCurrentAuthor && (
            <>
              <IconButton onClick={deletePost} color="error">
                <DeleteForever sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton onClick={handleOpen} color="info">
                <EditOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: palette.neutral.light,
                    border: "1px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography align="center" fontWeight="500" variant="h4">
                    Update your post
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder={description}
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription}
                    sx={{
                      backgroundColor: palette.neutral.light,
                      borderRadius: "2rem",
                      padding: "1rem 2rem",
                    }}
                  />
                  {isLightMode ? (
                    <Button
                    disabled={!newDescription}
                      onClick={handleUpdate}
                      fullWidth
                      sx={{
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: palette.primary.darkBlue,
                        },
                      }}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                    disabled={!newDescription}
                      onClick={handleUpdate}
                      fullWidth
                      sx={{
                        p: "1rem",
                        backgroundColor: palette.primary.lightBlue,
                        color: palette.background.white,
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: palette.primary.darkBlue,
                        },
                      }}
                    >
                      Update
                    </Button>
                  )}
                </Box>
              </Modal>
            </>
          )
        }
        title={
          <Typography fontWeight="500" variant="h4">
            @{author.userName}
          </Typography>
        }
        subheader={date.slice(0, 10)}
      />
      <CardContent>
        <Typography fontWeight="500" variant="h4">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={likePost} color="error" >
          {isLiked ? (
            <FavoriteOutlined sx={{ fontSize: "30px" }} />
          ) : (
            <FavoriteBorderOutlined sx={{ fontSize: "30px" }} />
          )}
        </IconButton>
        <Typography variant="h4">{likeCount}</Typography>
      </CardActions>
    </Card>
  );
};

export default SinglePost;
