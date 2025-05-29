import Image from "next/image";
import { FaCalendar, FaUser } from "react-icons/fa";

import RelatedBlogs from "./RelatedBlogs";

function BlogContent({ blog }) {
  return (
    <section className="py-0 ">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Image
            src={blog?.image[0]}
            alt="Blog hero"
            width={1200}
            height={600}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            priority
          />
          <div className="md:mt-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {blog?.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar />
                <span>
                  {new Date(blog?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <article className="lg:w-2/3 ">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
          </article>
        </div>

        {/* Related Posts */}
        <RelatedBlogs />
      </div>
    </section>
  );
}

export default BlogContent;
