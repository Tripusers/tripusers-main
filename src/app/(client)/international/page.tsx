"use client";

import "./style.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { international } from "@/types/international";
import { getInternational } from "@/sanity/sanity-utils";
import PageLoading from "@/components/default/loader/PageLoading";
import SwiperHero from "@/components/international/Swiper";
import ImageSize from "@/utils/image-utils";
import OptImage from "@/components/commmon/OptImage";

const page = () => {
  const [international, setInternational] = useState<international[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchInternational = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalPages } = await getInternational(page);
      setInternational(data);
      setLastPage(data.length > 0 ? page : lastPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching international data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInternational(currentPage);
  }, [currentPage]);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;

    try {
      const { data } = await getInternational(nextPage);

      if (data.length > 0) {
        setCurrentPage(nextPage);
      }

      router.push("/international/#internationalSlugHero");
    } catch (error) {
      console.error("Error fetching international data:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push("/international/#internationalSlugHero");
  };

  //console.log("InternationalData->", international);

  if (!international) {
    return <PageLoading />;
  }

  return (
    <>
      {international && (
        <SwiperHero title="International" data={international} />
      )}
      <section id="internationalPage">
        <p className="pageNo">
          Page {currentPage} / {totalPages}
        </p>
        <div className="grid">
          {international?.map((data, index) => (
            <Link
              href={`/international/${data.slug}`}
              key={index}
              className="child-container"
            >
              <div className="img-container">
                {data?.cardImage && (
                  <OptImage
                    image={data.cardImage}
                    alt="hero background"
                    sizes="card"
                  />
                )}
              </div>
              <div className="cta-container">
                <div className="text-container">
                  <h3>{data.name}</h3>
                  {data.internationalPackages && (
                    <p>
                      Starts from ₹{" "}
                      {data.internationalPackages.length == 0
                        ? 1500
                        : data?.internationalPackages[0].price.toLocaleString(
                            "en-IN"
                          )}
                    </p>
                  )}
                </div>
                <button>View Details</button>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          {loading && <p className="pagination-loading">Loading...</p>}
          <div className="buttons">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Previous
            </button>
            <span aria-live="polite">{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
