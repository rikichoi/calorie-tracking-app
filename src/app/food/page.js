import React from "react";

export default function Food() {
  return (
    <main className="grid grid-cols-7">
      <div className="pt-8 col-span-2 border-2 items-center w-full flex-col flex">
      <h2 className="text-2xl font-bold mb-6">
            Quick add
          </h2>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
        <p>asda</p>
      </div>

      <div className="col-span-5 flex min-h-screen h-[1000px] flex-col items-center pr-24 pl-24 pt-8">
        <div className="w-5/6">
          <h1 className="text-4xl font-bold mb-6">
            Log your meals
          </h1>
          <div className="grid grid-rows-2 gap-3 font-light text-lg">
            <div className=" flex items-center">
              <button className="bg-gray-200 p-2 rounded-xl mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <label>Search food</label>
            </div>
            <div className=" flex items-center">
              <button className="bg-gray-200 p-2 rounded-xl mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>
              </button>
              <label>Scan barcode</label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
