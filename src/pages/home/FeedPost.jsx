import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPost } from "../../redux";
import SinglePost from "components/SinglePost";

const FeedPost = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.allPost);
  const token = useSelector((state) => state.token);

  // fetch feed posts
  const getFeed = async () => {
    const response = await fetch(`/post/${currentUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json();
    dispatch(setAllPost({ allPost: posts }));
  };
  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {allPost?.map(({ _id, authorId, description, likes, date,isPrivate }) => (
        <SinglePost
          key={_id}
          postId={_id}
          authorId={authorId}
          description={description}
          date={date}
          likes={likes}
          isPrivate={isPrivate}
        ></SinglePost>
      ))}
    </>
  );
};

export default FeedPost;
