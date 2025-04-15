import React, { useState } from "react";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, content } = post;

    if (title && content) {
      console.log("New Post:", post); // simulate saving
      setMessage("Post created successfully!");
      setPost({ title: "", content: "" });
    } else {
      setMessage("Please fill in both fields.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={post.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="content"
          placeholder="Write your blog here..."
          value={post.content}
          onChange={handleChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  textarea: {
    padding: "10px",
    height: "150px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer"
  },
  message: {
    marginTop: "10px",
    color: "green"
  }
};

export default CreatePost;
