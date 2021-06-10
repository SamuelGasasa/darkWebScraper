import React from "react";

export default function Post({ data }) {
  //   const regAuthor = /(?<=\bby\s)(\w+)/gm;
  //   const regDate = /(?<=\bat\s)(.*)(?=UTC)/gm;
  //   const author = data.detail.match(regAuthor);
  //   const date = data.detail.match(regDate);
  return (
    <>
      <div className="ticket">
        <h1>title:{data.title}</h1>
        <p>author:{data.author}</p>
        <p>content:{data.content}</p>
        <p>details:{data.detail}</p>
        <p>date:{data.date} </p>
      </div>
    </>
  );
}
