import { format } from "date-fns";
import { defineDocumentType, makeSource } from "contentlayer/source-files"
import readingTime from "reading-time"

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(new Date(post.date), "MMMM dd, yyyy"),
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
})

