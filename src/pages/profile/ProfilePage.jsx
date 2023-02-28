import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  Card,
  Modal,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "components/NavBar";
import FlexBetween from "components/FlexBetween";
import UserPicture from "components/UserPicture";
import SinglePost from "components/SinglePost";
import { Formik } from "formik";
import * as yup from "yup";
import { setUser } from "../../redux";
import Dropzone from "react-dropzone";

const updateProfileSchema = yup.object().shape({
  bio: yup.string(),
  profilePicture: yup.string().required("required"),
});

const UserProfile = () => {
  const [user, setUserProfile] = useState(null);
  const { userId } = useParams();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const isLightMode = palette.mode === "light";

  const currentUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const allPost = useSelector((state) => state.allPost);
  const dispatch = useDispatch();

  const isCurrentProfile = Boolean(currentUserId === userId);

  // modal for update profile
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Fetch user profile data
  const getUserData = async () => {
    const response = await fetch(`/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = await response.json();
    setUserProfile(userData);
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  if (!user) return null;

  const initialValuesProfile = {
    bio: user.bio,
    profilePicture: "",
  };
  // Handler for update profile
  const submitHandler = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let val in values) {
      formData.append(val, values[val]);
    }
    formData.append("profilePicture", values.profilePicture.name);

    const response = await fetch(`/user/${currentUserId}/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const updatedUser = await response.json();
    onSubmitProps.resetForm();
    handleClose()
    getUserData()
    dispatch(setUser({ user: updatedUser }));
  };

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        backgroundColor={palette.background.default}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={palette.primary.main}
        >
          Profile Page
        </Typography>
      </Box>
      <Box m="2rem 0" />
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
          <Card
            sx={{
              padding: "0.5rem",
              backgroundColor: palette.neutral.light,
              borderRadius: "0.75rem",
              margin: "1rem",
              boxShadow: 3,
            }}
          >
            <CardHeader
              avatar={
                <UserPicture
                  image={user.profilePicture}
                  size="80px"
                ></UserPicture>
              }
              title={
                <Typography
                  fontWeight="bold"
                  variant="h2"
                  color={
                    isLightMode
                      ? palette.neutral.dark
                      : palette.primary.lightBlue
                  }
                >
                  @{user.userName}
                </Typography>
              }
              action={
                isCurrentProfile && (
                  <>
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
                          top: "30%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 500,
                          bgcolor: palette.neutral.light,
                          border: "1px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <Typography
                          align="center"
                          fontWeight="500"
                          variant="h4"
                          pb={"10px"}
                        >
                          Update your Profile
                        </Typography>
                        <Formik
                          initialValues={initialValuesProfile}
                          validationSchema={updateProfileSchema}
                          onSubmit={submitHandler}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <Box display="grid" gap="15px">
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Bio"
                                  multiline
                                  rows={4}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.bio}
                                  name="bio"
                                  error={
                                    Boolean(touched.bio) && Boolean(errors.bio)
                                  }
                                  helperText={touched.bio && errors.bio}
                                />
                                <Box
                                  border={`1px solid ${palette.neutral.medium}`}
                                  borderRadius="5px"
                                  p="1rem"
                                >
                                  <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                      setFieldValue(
                                        "profilePicture",
                                        acceptedFiles[0]
                                      )
                                    }
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{
                                          "&:hover": { cursor: "pointer" },
                                        }}
                                      >
                                        <input {...getInputProps()} />
                                        {!values.profilePicture ? (
                                          <p>Add Profile Picture Here</p>
                                        ) : (
                                          <FlexBetween>
                                            <Typography>
                                              {values.profilePicture.name}
                                            </Typography>
                                            <EditOutlinedIcon />
                                          </FlexBetween>
                                        )}
                                      </Box>
                                    )}
                                  </Dropzone>
                                </Box>
                              </Box>

                              {/* BUTTONS */}
                              <Box>
                                <FlexBetween>
                                  {isLightMode ? (
                                    <Button
                                      fullWidth
                                      type="submit"
                                      sx={{
                                        m: "1rem 0",
                                        p: "0.5rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        fontSize: "15px",
                                        "&:hover": {
                                          backgroundColor:
                                            palette.primary.darkBlue,
                                        },
                                      }}
                                    >
                                      Update
                                    </Button>
                                  ) : (
                                    <Button
                                      fullWidth
                                      type="submit"
                                      sx={{
                                        m: "1rem 0",
                                        p: "0.5rem",
                                        backgroundColor:
                                          palette.primary.lightBlue,
                                        color: palette.background.white,
                                        fontSize: "15px",
                                        "&:hover": {
                                          backgroundColor:
                                            palette.primary.darkBlue,
                                        },
                                      }}
                                    >
                                      Update
                                    </Button>
                                  )}
                                </FlexBetween>
                              </Box>
                            </form>
                          )}
                        </Formik>
                      </Box>
                    </Modal>
                  </>
                )
              }
            />
            <CardContent>
              <Typography fontWeight="500" variant="h4">
                {user.bio}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* User Post */}
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
          <Box m="2rem 0" />
          <Typography fontWeight="500" variant="h2">
            My Posts
          </Typography>

          {allPost
            ?.filter((post) => post.authorId === userId)
            .map(({ _id, authorId, description, likes, date }) => (
              <SinglePost
                key={_id}
                postId={_id}
                authorId={authorId}
                description={description}
                date={date}
                likes={likes}
              ></SinglePost>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
