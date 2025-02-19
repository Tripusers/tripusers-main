"use client";

import { getWildLife } from "@/sanity/sanity-utils";
import "@/app/(client)/international/style.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { wildLife } from "@/types/wildlife";
import PageLoading from "@/components/default/loader/PageLoading";
import SwiperHero from "@/components/wildlife/Swiper";
import { useRouter } from "next/navigation";
import ImageSize from "@/utils/image-utils";
import OptImage from "@/components/commmon/OptImage";

const page = () => {
  const [wildlife, setWildlife] = useState<wildLife[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchWildlife = async (page: number) => {
    setLoading(true);

    try {
      const { data, totalPages } = await getWildLife(page);
      setWildlife(data);
      setLastPage(data.length > 0 ? page : lastPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching international data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWildlife(currentPage);
  }, [currentPage]);

  //console.log("wildLifelData->", wildlife);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;

    try {
      const { data } = await getWildLife(nextPage);

      if (data.length > 0) {
        setCurrentPage(nextPage);
      }

      router.push("/wild-life/#internationalSlugHero");
    } catch (error) {
      console.error("Error fetching international data:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push("/wild-life/#internationalSlugHero");
  };

  if (!wildlife) {
    return <PageLoading />;
  }

  return (
    <>
      {wildlife && <SwiperHero title="Wildlife" data={wildlife} />}
      <section id="internationalPage">
        <p className="pageNo">
          Page {currentPage} / {totalPages}
        </p>
        <div className="grid">
          {wildlife?.map((data, index) => (
            <Link
              href={`/wild-life/${data.slug}`}
              key={index}
              className="child-container"
            >
              <div className="img-container">
                {data?.cardImage && (
                  <OptImage
                    image={data.cardImage}
                    alt="hero background"
                    sizes="card"
                    width={500}
                  />
                )}
              </div>
              <div className="cta-container">
                <div className="text-container">
                  <h3>{data.name}</h3>
                  {data.wildlifePackage && (
                    <p>
                      Starts from{" "}
                      {data.wildlifePackage.length == 0
                        ? 1500
                        : data?.wildlifePackage[0].price.toLocaleString(
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
