import { international } from "@/types/international";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
const search = (data: international[], query: string) => {
  const reg = new RegExp(escapeRegExp(query.toLocaleLowerCase()), "i");
  return data.filter((data) => reg.test(data.name.toLocaleLowerCase()));
};

const Popover = ({
  data,
  closeFunction,
  menuCloseFunction,
}: {
  data: international;
  closeFunction: () => any;
  menuCloseFunction: () => any;
}) => {
  return (
    <Link
      href={
        Object.keys(data).indexOf("domesticPackages") == -1
          ? Object.keys(data).indexOf("wildlifePackage") == -1
            ? `/international/${data.slug}`
            : `/wild-life/${data.slug}`
          : `/domestic/${data.slug}`
      }
      onClick={() => {
        closeFunction();
        menuCloseFunction();
      }}
    >
      {data.name}
    </Link>
  );
};
const Search = ({
  data,
  closeMenu,
}: {
  data: international[];
  closeMenu?: () => any;
}) => {
  //   console.log(data);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<international[] | undefined>();
  useEffect(() => {
    if (query !== "") {
      setResult(search(data, query));
    } else {
      setResult([]);
    }
    return () => {};
  }, [query]);

  const inputRef = useRef<HTMLInputElement>(null);
  const PopoverRef = useRef<HTMLInputElement>(null);
  const { contextSafe } = useGSAP({ scope: PopoverRef });

  const handleClosePopover = contextSafe(() => {
    gsap.to(PopoverRef.current, {
      opacity: 0,
      pointerEvents: "none",
      height: "0px",
      ease: "power1.inOut",
    });
  });

  const handleOpenPopover = contextSafe(() => {
    gsap.to(PopoverRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      height: "auto",
      ease: "power1.inOut",
    });
  });

  useEffect(() => {
    const popoverClose = (e: any) => {
      if (!PopoverRef.current?.contains(e.target)) {
        handleClosePopover();
      }
    };

    inputRef.current?.addEventListener("focus", handleOpenPopover);
    document.addEventListener("mousedown", popoverClose);

    return () => {
      document.removeEventListener("mousedown", popoverClose);
    };
  });

  return (
    <>
      <input
        ref={inputRef}
        data-popover-target="search-box"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Destinations"
      />
      <BiSearch size={20} />
      {result && result.length !== 0 ? (
        <div ref={PopoverRef} id="search-box" data-popover className="box">
          {result.map((v) => (
            <Popover
              menuCloseFunction={
                typeof closeMenu !== "undefined" ? closeMenu : () => {}
              }
              closeFunction={handleClosePopover}
              data={v}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Search;
