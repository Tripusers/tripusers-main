import { getTrendingTestimonials } from "@/sanity/sanity-utils";
import rss from "rss";

export async function GET() {
  const post = await getTrendingTestimonials();
  const feed = new rss({
    title: "testimonials | tripusers.com",
    site_url: "tripusers.com",
    feed_url: "http://www.tripusers.com/feed.xml",
    copyright: `${new Date().getFullYear()} tripusers.com`,
    image_url: "https://i.postimg.cc/j5h62pZg/tripusers-com-card.png",
  });
  post.map((v, i) => {
    feed.item({
      description: v.shortReview,
      title: v.title,
      url: `http://www.tripusers.com/testimonials/${v.slug}`,
      author: v.profile.name,
      date: v._createdAt,
      custom_elements: [
        {
          image: [{ url: v.cardImage }, { title: v.slug }],
        },
      ],
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=UTF-8",
    },
  });
}
