import Image from "next/image";

export default async function Post({ params }) {
  const postParams = await params;
  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  const user = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users/${postParams.id}`
  );
  const userJson = await user.json();
  const userData = userJson.user;
  const userImage = userData.profile_picture;

  const post = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts/${postParams.id}`
  );
  const postJson = await post.json();
  const postData = postJson.blog;
  const postImage = postData.photo_url;

  return (
    <div>
      <h1>
        Post by {userData.first_name} {userData.last_name}
      </h1>
      <h2>{postData.title}</h2>
      <img
        src={postImage}
        width={750}
        height={750}
        alt={`Post with ID of: ${postData.id}`}
      />
      <p>{postData.content_text}</p>
      <p>{formatPostDate(postData.created_at)}</p>
      <img
        src={userImage}
        width={100}
        height={100}
        alt={`User with ID of: ${userData.user_id}`}
      />
    </div>
  );
}
