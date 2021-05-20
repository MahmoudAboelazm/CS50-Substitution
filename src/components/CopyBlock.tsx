import React, { memo, useState } from "react";
import Clipboard from "../icons/Clipboard";
import ClipboardCheck from "../icons/ClipboardCheck";

interface CopyBlockProps {
  Name: string;
  value?: string;
}

const CopyBlock: React.FC<CopyBlockProps> = memo(({ Name, value }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const copyToClipBoard = async (copy: any, name: string) => {
    try {
      await navigator.clipboard.writeText(copy);
      setCopySuccess(name);
      setTimeout(() => {
        setCopySuccess("");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={"copy-block"}>
      <p
        className={Name}
        onClick={(e: any) => copyToClipBoard(e.target.innerText, Name)}
      >
        {value}
      </p>
      {copySuccess === Name ? (
        <ClipboardCheck />
      ) : (
        <span
          className="layer"
          onClick={(e: any) =>
            copyToClipBoard(
              e.target.parentNode.parentNode.parentNode.childNodes[0].innerText,
              Name,
            )
          }
        >
          <Clipboard />
        </span>
      )}
    </div>
  );
});

export default CopyBlock;
