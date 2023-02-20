import React, { useEffect, useState } from "react";
import { BackgroundMessage } from "../consts";
import { sendMessage, updateGeolocation } from "../utils/page-utils";
import { clear, writeLog } from "../utils/shared-utils";

export default function Controls() {
  const buttonClasses = `bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`;

  const [links, setLinks] = useState<[string, string][]>([]);

  useEffect(() => {
    setLinks(
      [...document.querySelectorAll("h1[id]")].map((el) => [
        el.textContent as string,
        `#${el.getAttribute("id")}`,
      ])
    );
  }, []);

  return (
    <div className="sticky top-0 p-8">
      <div className="flex flex-col gap-2">
        <button
          className={buttonClasses}
          onClick={() => sendMessage(BackgroundMessage.OPEN_STEALTH_TAB)}
        >
          OPEN STEALTH TAB
        </button>
        <button className={buttonClasses} onClick={() => clear()}>
          RESET
        </button>
        <button className={buttonClasses} onClick={() => writeLog("Test log")}>
          TEST LOG
        </button>
        <button className={buttonClasses} onClick={() => updateGeolocation()}>
          CAPTURE GEOLOCATION
        </button>
        <button
          className={buttonClasses}
          onClick={() => sendMessage(BackgroundMessage.CAPTURE_VISIBLE_TAB)}
        >
          CAPTURE VISIBLE TAB
        </button>
        <button
          className={buttonClasses}
          onClick={() => sendMessage(BackgroundMessage.CAPTURE_COOKIES)}
        >
          CAPTURE COOKIES
        </button>
        <button
          className={buttonClasses}
          onClick={() => sendMessage(BackgroundMessage.CAPTURE_HISTORY)}
        >
          CAPTURE HISTORY
        </button>
      </div>
      <div className="flex flex-col gap-8 py-8">
        {links.map(([text, href]) => (
          <a className="text-blue-500 underline text-md" key={href} href={href}>
            {text}
          </a>
        ))}
      </div>
    </div>
  );
}
