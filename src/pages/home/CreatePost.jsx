import {
  Box,
  Typography,
  TextField,
  Checkbox,
  useTheme,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "../../redux";
import { Formik } from "formik";
import * as yup from "yup";
import Wrapper from "../../components/Wrapper";
import UserPicture from "../../components/UserPicture";
import FlexBetween from "../../components/FlexBetween";

const postSchema = yup.object().shape({
  description: yup.string().required("required"),
  isPrivate: yup.boolean(),
});

const initialValuesPost = {
  description: "",
  isPrivate: false,
};

const CreatePost = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const isLightMode = palette.mode === "light";

  const submitHandler = async (values, onSubmitProps) => {
    values.authorId = _id;
    const response = await fetch("/post/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const posts = await response.json();
    onSubmitProps.resetForm();
    dispatch(setAllPost({allPost: posts }));
  };

  return (
    <Wrapper>
      <Typography fontWeight="500" variant="h3" sx={{ mb: "1.25rem" }}>
        Post Something Here !
      </Typography>

      <Formik
        initialValues={initialValuesPost}
        validationSchema={postSchema}
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
                label="What's on your mind..."
                multiline
                rows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
              />
              <Box
                justifyContent="flex-start"
                display="flex"
                alignItems="center"
              >
                <Typography align="center" fontWeight="500" variant="h5">
                  Post to close friend
                </Typography>
                <Checkbox
                  color="success"
                  checked={values.isPrivate}
                  onChange={(e) => {
                    setFieldValue("isPrivate", !values.isPrivate);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                  label="Post to Closefriend"
                />
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
                      "&:hover": { backgroundColor: palette.primary.darkBlue },
                    }}
                  >
                    Post
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "1rem 0",
                      p: "0.5rem",
                      backgroundColor: palette.primary.lightBlue,
                      color: palette.background.white,
                      fontSize: "15px",
                      "&:hover": { backgroundColor: palette.primary.darkBlue },
                    }}
                  >
                    Post
                  </Button>
                )}
              </FlexBetween>
            </Box>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default CreatePost;
