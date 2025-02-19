"use client";

import "@/app/(client)/international/style.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Domestic } from "@/types/domestic";
import { getDomestic } from "@/sanity/sanity-utils";
import PageLoading from "@/components/default/loader/PageLoading";
import ImageSize from "@/utils/image-utils";
import SwiperHero from "@/components/international/Swiper";
import OptImage from "@/components/commmon/OptImage";

const page = () => {
  const [domestic, setDomestic] = useState<Domestic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchDomestic = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalPages } = await getDomestic(page);
      setDomestic(data);
      setLastPage(data.length > 0 ? page : lastPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching domestic data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomestic(currentPage);
  }, [currentPage]);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;

    try {
      const { data } = await getDomestic(nextPage);

      if (data.length > 0) {
        setCurrentPage(nextPage);
      }

      router.push("/domestic/#internationalSlugHero");
    } catch (error) {
      console.error("Error fetching international data:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push("/domestic/#internationalSlugHero");
  };

  //console.log("domesticData->", domestic);

  if (!domestic) {
    return <PageLoading />;
  }

  return (
    <>
      {domestic && <SwiperHero title="India" data={domestic} />}
      <section id="internationalPage">
        <p className="pageNo">
          Page {currentPage} / {totalPages}
        </p>
        <div className="grid">
          {domestic?.map((data, index) => (
            <Link
              href={`/domestic/${data.slug}`}
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
                  {data.domesticPackages && (
                    <p>
                      Starts from ₹{" "}
                      {data.domesticPackages.length == 0
                        ? 1500
                        : data?.domesticPackages[0].price.toLocaleString(
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
