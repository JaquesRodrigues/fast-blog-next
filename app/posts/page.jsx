import Link from "next/link";

export default async function Posts() {
  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  const response = await fetch(
    "https://api.slingacademy.com/v1/sample-data/blog-posts"
  );
  const data = await response.json();
  let posts = data.blogs;
  return (
    <div>
      <h1>Posts</h1>
      {posts ? (
        posts.map((post) => {
          return (
            <div key={post.id}>
              <Link href={`/post/${post.id}`}>{post.title}</Link>
              <h2>{post.category}</h2>
              <p>{formatPostDate(post.created_at)}</p>
            </div>
          );
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
}
