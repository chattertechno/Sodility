import React from "react";
import { AudioArticle, ImageArticle, TextArticle, VideoArticle } from "../pages/creator";
import { Pagination } from "../shared";

export default function ContentCard ({list}:any){
    return (
      <div className="flex-1 justify-items-center py-2 px-10 space-y-8">
        {
          list.length > 0 ? 
          list.map((item: any, index: number) => {
            if(item.articleType.content === 'video') {
              return <VideoArticle content={item} key={index} />
            } else if(item.articleType.content === 'audio') {
              return <AudioArticle content={item} key={index} />
            } else if(item.articleType.content === 'text') {
              return <TextArticle content={item} key={index} />
            } else if(item.articleType.content === 'image') {
              return <ImageArticle content={item} key={index} />
            }
          })
          : <div className="flex justify-center items-center h-96"><>No Data Found</></div>
        }
        <div className="">
          {list.length>0&&<Pagination title="Posts" />}
        </div>
      </div>
    );
  };
  