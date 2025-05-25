import React, { useState, useEffect } from "react";
import { Blog } from "@/services/types";
import { Grid, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_EDITOR_INIT } from "@/services/utils/constants";

interface BlogFormProps {
  blog: Blog | null;
  onDetailsChange: (content: string) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onDetailsChange }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog) {
      setContent(blog.content || "");
    }
  }, [blog]);

  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="blog-name"
          label="Blog Name"
          variant="outlined"
          name="title"
          fullWidth
          defaultValue={blog?.title || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={10} my={4}>
        <Editor
          apiKey="9i9siri6weyxjml0qbccbm35m7o5r42axcf3lv0mbr0k3pkl"
          init={TINY_MCE_EDITOR_INIT}
          value={content}
          onEditorChange={(newValue) => {
            setContent(newValue);
            onDetailsChange(newValue);
          }}
        />
      </Grid>
    </>
  );
};

export default BlogForm;
