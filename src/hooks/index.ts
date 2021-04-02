import commentHook from "./comment";
import blogPostHook from "./blog-post";

const aggregateHooks = async () => {
  await Promise.all([commentHook(), blogPostHook()]);
};

export default aggregateHooks;
