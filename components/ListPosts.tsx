"use client";
import React, { useEffect, useState } from "react";
import ListPost from "@/components/ListPost";

const ListPosts: React.FC = () => {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      const sortParam = sortBy === "newest" ? "-published_at" : "published_at";

      const response = await fetch(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=100&append[]=small_image&append[]=medium_image&sort=${sortParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const res = await response.json();

      function extractImageUrlsFromData(dataArray) {
        return dataArray.map((item) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.content, "text/html");
          const imgElements = doc.querySelectorAll("img");
          const urls = Array.from(imgElements).map((img) => img.src);
          return { ...item, content: urls };
        });
      }

      const dataWithImageUrls = extractImageUrlsFromData(res.data);
      setDatas(dataWithImageUrls);
    };
    fetchData();
  }, [sortBy]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    const savedItemsPerPage = sessionStorage.getItem("itemsPerPage");
    const savedSortBy = sessionStorage.getItem("sortBy");

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
    if (savedItemsPerPage) {
      setItemsPerPage(Number(savedItemsPerPage));
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage.toString());
    sessionStorage.setItem("itemsPerPage", itemsPerPage.toString());
    sessionStorage.setItem("sortBy", sortBy);
  }, [currentPage, itemsPerPage, sortBy]);

  return (
    <section className="py-8">
      <div className="flex flex-row justify-between items-center py-8 px-24">
        <h1>{`Showing ${indexOfFirstItem + 1}-${indexOfLastItem} of ${
          datas.length
        }`}</h1>

        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-4 items-center">
            <h1>Show per page</h1>
            <div className="px-8 py-2 border-2 border-grey-700 rounded-full">
              <select
                name="showPerPage"
                id="showPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <h1>Sort by</h1>
            <div className="px-8 py-2 border-2 border-grey-700 rounded-full">
              <select
                name="sortBy"
                id="sortBy"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 bg-white px-24 ">
        {currentItems.map((item, index) => (
          <ListPost index={index} item={item} key={index} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {[...Array(Math.ceil(datas.length / itemsPerPage)).keys()].map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber + 1)}
              className={`mx-1 px-3 py-1  rounded-md ${
                currentPage === pageNumber + 1
                  ? "bg-orange text-white"
                  : "text-black"
              }`}
            >
              {pageNumber + 1}
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default ListPosts;
