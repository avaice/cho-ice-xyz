// SDK利用準備
import type { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

// microCMS画像の最適化パラメータを付与
export const optimizeImage = (
  url: string,
  options: { width?: number; format?: "webp" | "jpg" | "png"; quality?: number } = {}
) => {
  const { width = 800, format = "webp", quality = 85 } = options;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}fm=${format}&w=${width}&q=${quality}`;
};

// コンテンツ内の画像URLを最適化
export const optimizeContentImages = (html: string, width = 800) => {
  return html.replace(
    /<img([^>]*?)src="(https:\/\/images\.microcms-assets\.io[^"]+)"([^>]*?)>/g,
    (_, before, url, after) => {
      const optimizedUrl = optimizeImage(url, { width });
      return `<img${before}src="${optimizedUrl}"${after}>`;
    }
  );
};

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
export type Blog = {
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
} & MicroCMSListContent;

// APIの呼び出し
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.getList<Blog>({ endpoint: "blogs", queries });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};
