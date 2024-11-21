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
      <h1 className="text-6xl font-bold text-center text-white">Posts</h1>
      {posts ? (
        posts.map((post) => {
          return (
            <div className="p-4" key={post.id}>
              <Link
                className="underline hover:text-slate-700"
                href={`/post/${post.id}`}
              >
                {post.title}
              </Link>
              <h2>
                Category:{" "}
                <span className="font-bold capitalize">{post.category}</span>
              </h2>
              <p>Postado em: {formatPostDate(post.created_at)}</p>
            </div>
          );
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
}
